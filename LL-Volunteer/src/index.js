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
// TODO: Use passport to set login status at a get route





// const db = new pg.Client({
//   user: process.env.PG_USER,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DATABASE,
//   password: process.env.PG_PASSWORD,
//   port: process.env.PG_PORT,
// });

// db.connect(err => {
//   if (err) {
//     console.error('Database connection error', err.stack);
//   } else {
//     console.log('Connected to the database');
//   }
// });

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password)
  return res.json({ Status: "Login successful" });

  // Fetch the user from the database
  // const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);

  // if (!user) {
  //   return res.status(404).json({ Status: "User not found" });
  // }

  // const validPassword = await bcrypt.compare(password, user.password);

  // if (validPassword) {
  //   req.session.userId = user.id;  // Store user id in session
  //   return res.json({ Status: "Login successful" });
  // } else {
  //   return res.status(401).json({ Status: "Invalid password" });
  // }
});

// TODO: Sign in route
app.post("/register", async (req, res) => {
  const { email, password, fName, lName } = req.body;
  console.log(email, password, fName, lName)
  return res.json({ Status: "Registration successful" });

});



// TODO: Message Board Route


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
