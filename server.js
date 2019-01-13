const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
//----------------------------------------------------------------------------------
var app = express();
//----------------------------------------------------------------------------------
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
//----------------------------------------------------------------------------------
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append file maruju')
    }
  });
  next();
});
//----------------------------------------------------------------------------------
app.use(express.static(__dirname + '/public'));
//----------------------------------------------------------------------------------
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
return text.toUpperCase();
});
//----------------------------------------------------------------------------------
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome to página da família Maruju',
    currentYear: new Date().getFullYear()
  });
});
app.get('/about', (req, res) =>{
  res.render('about.hbs', {
    pageTitle: 'About page injection',
    currentYear: new Date().getFullYear()
  });
});
app.get('/projects', (req, res) =>{
  res.render('projects.hbs', {
    pageTitle: 'projects page',
    currentYear: new Date().getFullYear()
  });
});
app.get('/bad', (req, res) => {
  res.send('não encontramos a url solicitada');
});
//----------------------------------------------------------------------------------
app.listen(port, () => {
  console.log(`Server is up on port ${port} - maruju`);
});
