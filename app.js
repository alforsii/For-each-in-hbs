const express = require('express');
const expHbr = require('express-handlebars');
const path = require('path');
const users = require('./users');

const app = express();
const PORT = process.env.PORT || 5500;

app.engine(
  'handlebars',
  expHbr({
    defaultLayout: 'layout',
    layoutsDir: path.join(__dirname, 'views/mainLayouts'), //or this will be comparable with windows as well
    // layoutsDir: 'views/mainLayouts', //or
    //  when we are using layouts by default handlebar will be looking for layout in the view folder. To make it different name we use this method layoutsDir and provide location of that file
    //the same apply for when we are using partials, by default hbs looking for that name. To change it we use partialsDir: '<-- provide folder path -->'.
  })
);

app.set('view engine', 'handlebars');

// //routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home',
    greeting: 'Hello and Welcome to Home page',
    users,
  });
});
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    greeting: 'This is About me',
    description: 'This is learning course about partials in handlebars',
  });
});
app.get('/contacts', (req, res) => {
  res.render('contacts', {
    title: 'Contacts',
    greeting: 'Hello World and How can I help you?',
  });
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
