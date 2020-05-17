const express = require('express');
const logger = require('./middleware/logger');
const home = require('./routes/home');
const courses = require('./routes/courses');

const app = express();

app.use(express.json()); // Enabling JSON Parasing
// Creating Custom MiddleWare
app.use(logger);

app.use(function(req, res, next) {
  console.log('Authenticating');
  next(); ////--> if we didn't use Next Function it Didn't Exceture Other Middlewares
});

app.use('/api/courses', courses); // Use Courses Router For Every /api/courses
app.use('/', home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening On Port ${port}...`));
