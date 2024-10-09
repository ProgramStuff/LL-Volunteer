import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import session from "express-session";
import bcrypt from "bcrypt";
import env from "dotenv";
import cors from "cors";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import path from 'path';
import { createPool } from '@vercel/postgres';

const app = express();
const saltRounds = 10;
env.config();
const secret = process.env.SESSION_SECRET
const port = process.env.PORT || 3000;

const isProduction = process.env.NODE_ENV === 'production';

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ll-volunteer-ihjcxz9a1-jordan-kelseys-projects.vercel.app",
      "https://ll-volunteer.vercel.app",
      "https://ll-volunteer.vercel.app/resgister",
      "https://ll-volunteer.vercel.app/login",
      "https://ll-volunteer-ihjcxz9a1-jordan-kelseys-projects.vercel.app/resgister",
      "https://ll-volunteer-ihjcxz9a1-jordan-kelseys-projects.vercel.app/login",
    ],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
  });
}

// Express Session
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: isProduction },
  })
);

// Initialize Passport.js and sessions
app.use(passport.initialize());
app.use(passport.session());

const pool = createPool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false },
});

// const pool = new pg.Pool({
//   user: process.env.PG_USER,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DATABASE,
//   password: process.env.PG_PASSWORD,
//   port: process.env.PG_PORT,
// });

// Helper function to handle database queries
const queryDB = async (text, params) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release(); // Release the client back to the pool
  }
};

// ***** Passport Local Strategy *****
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const result = await queryDB("SELECT * FROM users WHERE email = $1", [email]);
        if (result.rows.length === 0) {
          return done(null, false, { message: "Incorrect email" });
        }
        const user = result.rows[0];
        const storedHashedPassword = user.password;

        // Compare password
        bcrypt.compare(password, storedHashedPassword, (err, res) => {
          if (err) return done(err);
          if (res) {
            return done(null, user); // Successful login
          } else {
            return done(null, false, { message: "Incorrect password" });
          }
        });
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Passport serializeUser and deserializeUser
passport.serializeUser((user, done) => {
  done(null, user.userid);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await queryDB("SELECT * FROM users WHERE userid = $1", [id]);
    done(null, result.rows[0]);
  } catch (err) {
    done(err);
  }
});

// ***** Login End Point with Passport *****
app.post("/api/login", passport.authenticate("local"), (req, res) => {
  const user = req.user;
  res.json({
    status: 200,
    id: user.userid,
    userName: user.fname,
    role: user.role,
  });
});

// ***** Register End Point *****
app.post("/api/register", async (req, res) => {
  const { email, password, fName, lName } = req.body;
  try {
    // Check if the user already exists
    const user = await queryDB("SELECT * FROM users WHERE email = $1", [email]);

    if (user.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists. Try logging in." });
    } else {
      // Hash the password
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.log("Error hashing password", err);
          return res.status(500).json({ message: "Error during registration." });
        } else {
          // Insert the new user into the users table and return the userid
          const insertUserResult = await queryDB(
            "INSERT INTO users (fname, lname, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING userid",
            [fName, lName, email, hash, "user"]
          );

          const newUserId = insertUserResult.rows[0].userid;

          // Insert a new row in the uservolunteer table for the new user with role1 and role2 set to null
          await queryDB(
            "INSERT INTO uservolunteer (userid, role1, role2) VALUES ($1, $2, $3)",
            [newUserId, null, null]
          );

          // Respond with success message
          res.status(200).json({ message: "User registered successfully!" });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error." });
  }
});

// ***** Check if user is authenticated *****
app.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ status: 200, user: req.user });
  } else {
    res.json({ status: 401, message: "User not logged in" });
  }
});

// ***** Logout End Point *****
app.post("/api/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.json({ status: 200, message: "Logged out successfully" });
  });
});

// ***** Add Message End Point *****
app.post("/api/message/add", async (req, res) => {
  const { title, content } = req.body;
  try {
    await queryDB("INSERT INTO messageboard (title, content) VALUES ($1, $2)", [title, content]);
    res.json({ Status: 200 });
  } catch (err) {
    console.log(err);
  }
});

// ***** Delete Message End Point *****
app.post("/api/message/delete", async (req, res) => {
  const { title } = req.body;
  try {
    await queryDB("DELETE FROM messageboard WHERE title = $1", [title]);
    res.json({ Status: 200 });
  } catch (err) {
    console.log(err);
  }
});

// ***** Retrieve All Messages End Point *****
app.post("/api/message/all", async (req, res) => {
  try {
    const result = await queryDB("SELECT * FROM messageboard");
    if (result.rows.length > 0) {
      res.json({ Status: 200, data: result.rows });
    } else {
      res.json({ Status: 201, data: "No messages" });
    }
  } catch (err) {
    console.log(err);
  }
});

// ***** Add/Update Role End Point *****
app.post("/api/role/add", async (req, res) => {
  const { userid, role1, role2 } = req.body;

  try {
    const result = await queryDB("SELECT * FROM uservolunteer WHERE userid = $1", [userid]);

    if (result.rows.length > 0) {
      await queryDB("UPDATE uservolunteer SET role1 = $2, role2 = $3 WHERE userid = $1", [userid, role1, role2]);
      res.json({ Status: 200, role1, role2 });
    } else {
      await queryDB("INSERT INTO uservolunteer (userid, role1, role2) VALUES ($1, $2, $3)", [userid, role1, role2]);
      res.json({ Status: 200, role1, role2 });
    }
  } catch (err) {
    console.log(err);
  }
});

// ***** Retrieve All Roles End Point *****
app.post("/api/role/all", async (req, res) => {
  const { role } = req.body;
  try {
    const result = await queryDB(
      "SELECT users.userid, fname, lname, role1, role2 FROM users RIGHT JOIN uservolunteer ON users.userid = uservolunteer.userid WHERE uservolunteer.role1 = $1 OR uservolunteer.role2 = $1",
      [role]
    );
    res.json({ Status: 200, data: result.rows });
  } catch (err) {
    console.log(err);
  }
});

// ***** Update User Role End Point *****
app.post("/api/role/update", async (req, res) => {
  const { userid, role } = req.body;
  try {
    await queryDB("UPDATE uservolunteer SET role1 = $2, role2 = NULL WHERE userid = $1", [userid, role]);
    res.json({ Status: 200 });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/role", async (req, res) => {
  const {userid} = req.body;
  try {
    const result = await queryDB(
      // I
      "SELECT * from uservolunteer WHERE userid = $1",
      [userid]
    )
    const data = result.rows;
    res.json({ Status: 200, data: data});
  }catch (err) {
    console.log(err);
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
