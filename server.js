const express = require('express');
const app = express();
const port = 3000;
const expressLayouts = require("express-ejs-layouts");
const expressStatic = require('express-static');
const db = require('./models/db'); 

app.use(expressLayouts);
app.set('layout', './layouts/layout');
app.set("view engine", "ejs");

//routes
app.get('', (req, res) => {
    res.render('home', {title: 'Home Page', layout: './layouts/layout'})
})

// app.get('/player', (req, res) => {
//     // Fetch team player data from the database
//     const sql = 'SELECT * FROM players'; 
//     db.query(sql, (err, results) => {
//       if (err) {
//         console.error('Error fetching team players:', err);
//         res.status(500).send('Internal Server Error');
//       } else {
//         res.render('player', { title: 'Team Page', layout: './layouts/layout', players: results });
//       }
//     });
//   });

app.get('/news', (req, res) => {
    res.render('news', {title: 'News Page', layout: './layouts/layout'})
})

app.get('/signup', (req, res) => {
  res.render('signup', {title: 'Signup Page', layout: './layouts/layout'})
})

//static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '../public/CSS'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))