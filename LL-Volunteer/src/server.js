import express from "express";
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
  console.log(email, password)

  try{
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  // Fetch the user from the database

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedHashedPassword = user.password;
      // Compare user login password to stored hashed password
      bcrypt.compare(password, storedHashedPassword, (err, result) => {
        if (err){
          console.log(err);
        }else {
          if (result){
            console.log("successful Login")
            res.json({ Status: 200 });
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
app.post("/register", async (req, res) => {
  const { email, password, fName, lName } = req.body;
  console.log(email, password, fName, lName)

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
        console.log(result);
        res.json({ Status: 200 });
      }})
    }
  }catch (err) {
    console.log(err);
  }

});



// TODO: Message Board Route


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
