const express = require('express');
const expHbr = require('express-handlebars');
const path = require('path');
const users = require('./users');

const app = express();
const PORT = process.env.PORT || 5500;
app.use(express.static('public'));

// //1.
// //************************************************************************************ */
// app.engine(
//   'handlebars',
//   expHbr({
//     //by default handlebar looking for main.handlebars file, to make a diff name we can use next =>
//     defaultLayout: 'layout',
//     layoutsDir: path.join(__dirname, 'views/mainLayouts'), //or this will be comparable with windows as well
//     // layoutsDir: 'views/mainLayouts', //or
//     //  when we are using layouts by default handlebar will be looking for layout in the view folder. To make it different name we use this method layoutsDir and provide location of that file
//     //the same apply for when we are using partials, by default hbs looking for that name. To change it we use partialsDir: '<-- provide folder path -->'.
//   })
// );

app.set('view engine', 'handlebars');

//2.Use helpers
//************************************************************************************ */
const hbs = expHbr.create({
  defaultLayout: 'layout',
  layoutsDir: path.join(__dirname, 'views/mainLayouts'), //or this will be comparable with windows as well
  // layoutsDir: 'views/mainLayouts', //or

  //Create custom helper(helpers - it's a method)
  //lets make calc
  //we can access our helpers function from any our hbs files
  helpers: {
    calc: val => val * 2, //one helper(check on index page)
    list: (param, options) => '<h2>' + options.fn({ test: param }) + '</h2>', //lets check it on index page
    usersList: function(val, options) {
      let out = '<ul>';
      for (let i = 0; i < val.length; i++) {
        out += `<li> ${options.fn(val[i])} </li>`;
      }
      return out + '</ul>';
    },
  },
});

app.engine('handlebars', hbs.engine);

// //routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home',
    greeting: 'Hello and Welcome to Home page',
    users,
    myStyle: 'css/home.css',
  });
});
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    greeting: 'This is About me',
    description: 'This is learning course about partials in handlebars',
    myStyle: 'css/about.css',
  });
});
app.get('/contacts', (req, res) => {
  res.render('contacts', {
    title: 'Contacts',
    greeting: 'Hello World and How can I help you?',
    myStyle: 'css/contacts.css',
  });
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
