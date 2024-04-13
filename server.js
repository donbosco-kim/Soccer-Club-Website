const express = require("express");
const app = express();
const port = 3000;
const expressLayouts = require("express-ejs-layouts");
const expressStatic = require("express-static");
const player = require("./models/players_db");
const coach = require("./models/coach_db");
const user = require("./models/users");

app.use(expressLayouts);
app.set("layout", "./layouts/layout");
app.set("view engine", "ejs");

//middleware to parse form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.get("", (req, res) => {
  res.render("home", { title: "Home Page", layout: "./layouts/layout" });
});

app.get("/login-signup", (req, res) => {
  res.render("login-signup", { title: "Login/Signup Page", layout: false });
});

app.post("/login-signup", (req, res) => {
  //fields from login-signup.ejs
  const {email, password} = req.body;
  //check if these input matches the ones in the database
  //if match then redirect to homepage
  //otherwise stay in the same page
});

app.post("/login-signup", (req, res) => {
  const { username, email, password, role } = req.body;
  //validate data input
  //sanitize them
  //check if role is valid
  if (role !== 'user' && role !== 'admin') {
      return res.status(400).send("Invalid role");
  }

  //save user data to database
  user.createUser(username, email, password, role, (err) => {
      if (err) {
          console.error(err);
          return res.status(500).send("Error creating user");
      }
      res.redirect("/login-signup");
  });
});

app.get("/player", (req, res) => {
  // Fetch team player data from the database
  player.getAllPlayers((err, result) => {
    if (err) {
      console.error("Error retrieving players:", err);
    } else {
      //console.log(players);
      res.render("player", {
        title: "Team Page",
        layout: "./layouts/layout",
        players: result,
      });
    }
  });
});

app.get("/coach", (req, res) => {
  // Fetch team player data from the database
  coach.getAllCoach((err, result) => {
    if (err) {
      console.error("Error retrieving coach:", err);
    } else {
      //console.log(players);
      res.render("coach", {
        title: "Coach Page",
        layout: "./layouts/layout",
        coaches: result,
      });
    }
  });
});

app.get("/news", (req, res) => {
  res.render("news", { title: "News Page", layout: "./layouts/layout" });
});

app.get("/prospectiveplayer", (req, res) => {
  res.render("prospectiveplayer", { title: "Prospective Player Page", layout: "./layouts/layout" });
});

//static files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "../public/CSS/style.css"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
