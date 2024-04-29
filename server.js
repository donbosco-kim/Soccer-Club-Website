const express = require("express");
const app = express();
const port = 3000;
const expressLayouts = require("express-ejs-layouts");
const expressStatic = require("express-static");
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const player = require("./models/players_db");
const coach = require("./models/coach_db");
const user = require("./models/users");

app.use(expressLayouts);
app.set("layout", "./layouts/layout");
app.set("view engine", "ejs");

//middleware to parse form data
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'cigaratte',
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.db', dir: '/Users/leonbosco/Desktop/Sqlite-Mizzou-SoccerDB/' })
}));
app.use(passport.authenticate('session'));

//routes
app.get("", (req, res) => {
  res.render("home", { title: "Home Page", layout: "./layouts/layout" });
});

app.get("/login-signup", (req, res) => {
  res.render("login-signup", { title: "Login/Signup Page", layout: false });
});

app.get("/admin", (req, res) => {
  res.render("admin", {title: "Admin Page", layout: false});
});

app.get('/addplayer', (req, res) => {
  res.render("addplayer", {title: "Add New Player", layout: false}); 
});

app.get('/addcoach', (req, res) => {
  res.render("addcoach", {title: "Add New Coach", layout: false});
});

// Route for user login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Check if the provided credentials are valid
  user.getUser(username, password, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error authenticating user");
    }else if (!user) {
      // Authentication failed
      return res.status(401).send("Incorrect username or password");
    }else {
      // Authentication successful, redirect to the homepage or dashboard
      res.redirect("/admin");
    }
  });
});
// Route for user signup
app.post("/signup", (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).send("Password does not match");
  } else {
    //save user data to database
    user.createUser(username, email, password, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error creating user");
      }
      res.redirect("/login-signup");
    });
  }
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
  res.render("prospectiveplayer", {
    title: "Prospective Player Page",
    layout: "./layouts/layout",
  });
});

//static files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "../public/CSS/style.css"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
