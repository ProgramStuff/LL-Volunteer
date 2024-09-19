import express, { response } from "express";
import bodyParser from "body-parser";
import pg from "pg";
import session from "express-session";
import bcrypt from "bcrypt";
import env from "dotenv";
import cors from "cors";


const app = express();
const port = 3000;
const saltRounds = 10;
env.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
  })
);


app.use(cors( {
  origin: ["http://localhost:5173"],
  methods: ["POST, GET"],
  credentials: true
}))


// TODO: Review passport documentation/implement cookies
// TODO: Use passport to persist use login


const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect(err => {
  if (err) {
    console.error('Database connection error', err.stack);
  } else {
    console.log('Connected to the database');
  }
});


// ***** Login End Point *****

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try{
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  // Fetch the user from the database

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedHashedPassword = user.password;
      const userId = user.userid;
      const userFName = user.fname;
      const role = user.role;;
      // Compare user login password to stored hashed password
      bcrypt.compare(password, storedHashedPassword, (err, result) => {
        if (err){
          console.log(err);
        }else {
          if (result){
            console.log("successful Login")
            res.json({status:200, id: userId, userName: userFName, role: role});
          }else{
            console.log("Incorrect Login")
          }
        }
      });
    }else{
      console.log("User not found")
      }
    } catch(err) {
      console.log(err);
    }
});


// ***** Register End Point *****
// TODO: Send user role to database
app.post("/register", async (req, res) => {
  const { email, password, fName, lName } = req.body;
  try {
    const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (user.rows.length > 0){
      res.send("Email already exists. Try logging in");
    }else {
      // If email does not exist hash  password and add 10 salt rounds before storing
      bcrypt.hash(password, saltRounds, async (err, hash) =>{
        if (err){
          console.log("Error hashing password", err);
        }else {
          const result = await db.query(
            // Insert user data and hashed password
            "INSERT INTO users (fname, lname, email, password) VALUES ($1, $2, $3, $4)",
            [fName, lName, email, hash]
          )
        res.json({ Status: 200 });
      }})
    }
  }catch (err) {
    console.log(err);
  }

});

// ***** Add Message End Point *****
app.post("/message/add", async (req, res) => {
  const { title, content} = req.body;
  try {
    const result = await db.query(
      // Insert message data into database
      "INSERT INTO messageboard (title, content) VALUES ($1, $2)",
      [title, content]
    )
    res.json({ Status: 200 });
  }catch (err) {
    console.log(err);
  }
})

// ***** Delete Message End Point *****
// TODO: Modify to expect id
app.post("/message/delete", async (req, res) => {
  const title = req.body.title;
  try {
    const result = await db.query(
      // Delete message from database
      "DELETE FROM messageboard WHERE title = $1",
      [title]
    )
    res.json({ Status: 200 });
  }catch (err) {
    console.log(err);
  }
})


// ***** Retrieve Message End Point *****

app.post("/message/all", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM messageboard");
    if (result.rows.length > 0) {
      const allMessages = result.rows;
      res.json({ Status: 200, data: allMessages });
    }else{
      res.json({ Status: 201, data: "No messages"});
    }
  }catch (err) {
    console.log(err);
  }
})

// ***** Add/Update Role End Point *****

app.post("/role/add", async (req, res) => {
  const { userid, role1, role2} = req.body;

  try {
    const result = await db.query(
      // Check if user row already exist
      "SELECT * FROM uservolunteer where userid = $1", [userid])
      if (result.rows.length > 0){
        const result = await db.query(
          // Update user row
          "UPDATE uservolunteer SET role1 = $2, role2 = $3 WHERE userid = $1", 
          [userid, role1, role2])
          res.json({ Status: 200, role1: role1, role2: role2 });
      } else{
        try {
          const result = await db.query(
            // Insert volunteer roles
            "INSERT INTO uservolunteer (userid, role1, role2) VALUES ($1, $2, $3)",
            [userid, role1, role2]
          )
          res.json({ Status: 200, role1: role1, role2: role2 });
        }catch (err) {
          console.log(err);
        }
      }
  }catch (err) {
    console.log(err);
  }
})

// TODO: Pass user fname and lname to front end
app.post("/role/all", async (req, res) => {
  const {role} = req.body;
  try {
    const result = await db.query(
      // I
      "SELECT users.userid, fname, lname, role1, role2 FROM users RIGHT JOIN uservolunteer ON users.userid = uservolunteer.userid WHERE uservolunteer.role1 = $1 or uservolunteer.role2 = $1",
      [role]
    )
    const data = result.rows;
    console.log(data)
    res.json({ Status: 200, data: data});
  }catch (err) {
    console.log(err);
  }
})

// TODO: Update user roles in database


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
