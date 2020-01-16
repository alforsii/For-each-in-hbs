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
    layoutsDir: path.join(__dirname, 'views/mainLayouts'),
  })
);

app.set('view engine', 'handlebars');

// //routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Home', users });
});
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
