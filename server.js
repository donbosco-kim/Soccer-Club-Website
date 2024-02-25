const express = require('express')
const app = express()
const port = 3000
const expressLayouts = require("express-ejs-layouts");
const expressStatic = require('express-static')

app.use(expressLayouts);
app.set('layout', './layouts/layout')
app.set("view engine", "ejs");

//routes
app.get('', (req, res) => {
    res.render('home', {title: 'Home Page', layout: './layouts/layout'})
})

app.get('/team', (req, res) => {
    res.render('team', {title: 'Team Page', layout: './layouts/layout'})
})

app.get('/news', (req, res) => {
    res.render('news', {title: 'News Page', layout: './layouts/layout'})
})

//static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '../public/CSS'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))