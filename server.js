const express = require("express");
const app = express();
const port = 3000;
const expressLayouts = require("express-ejs-layouts");
const expressStatic = require("express-static");
const logger = require("morgan");
const passport = require("passport");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const player = require("./models/players_db");
const coach = require("./models/coach_db");
const user = require("./models/users");

const dotenv = require('dotenv');
const result = dotenv.config();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

app.use(expressLayouts);
app.set("layout", "./layouts/layout");
app.set("view engine", "ejs");

//middleware to parse form data
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: "cigaratte",
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: "sessions.db", dir: "./var/db" })
}));
app.use(passport.authenticate("session"));

//routes
app.get("", (req, res) => {
  res.render("home", { title: "Home Page", layout: "./layouts/layout" });
});
app.get("/home", (req, res) => {
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
    } else if (!user) {
      // Authentication failed
      return res.status(401).send("Incorrect username or password");
    } else {
      // Authentication successful, render the admin page with user data
      res.render("admin", { user: user, layout: false });
    }
  });
});

app.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
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

//mailScript
const auth = {
  auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN
  }
};

const transporter = nodemailer.createTransport(mg(auth));

app.get('/', (req, res) => {
  res.render('contact');
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit_form', (req, res) => {
  const { Contact_First_Name, Contact_Last_Name, Contact_Email, Contact_Message } = req.body;

  const mailOptions = {
      from: 'postmaster@sandboxc49d23903a8c419e98c55383f173155c.mailgun.org',
      to: 'testmensmusoccer@gmail.com',
      subject: 'Contact Form Submission',
      text: `First Name: ${Contact_First_Name}\nLast Name: ${Contact_Last_Name}\nEmail: ${Contact_Email}\nMessage: ${Contact_Message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
          res.send('Error: Something went wrong.');
      } else {
          console.log('Email sent: ' + info.response);
          res.send('Message sent successfully!');
      }
  });
});

app.get("/news", (req, res) => {
  res.render("news", { title: "News Page", layout: "./layouts/layout" });
});

app.get("/calendar", (req, res) => {
  res.render("calendar", { title: "Calendar Page", layout: "./layouts/layout" });
});

app.get('/contact', (req, res) => {
  res.render('contact', {title: 'Contact Page', layout: './layouts/layout'})
})

app.get("/prospectiveplayer", (req, res) => {
  res.render("prospectiveplayer", {
    title: "Prospective Player Page",
    layout: "./layouts/layout",
  });
});

//static files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "../public/CSS"));
//app.use("/css", express.static(__dirname + "../public/CSS/contact.css"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
