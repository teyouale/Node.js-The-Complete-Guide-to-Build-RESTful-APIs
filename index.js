const express = require('express');
const Joi = require('joi');
const logger = require('./logger');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json()); // Enabling JSON Parasing

// Creating Custom MiddleWare
app.use(logger);

app.use(function(req, res, next) {
  console.log('Authenticating');
  next(); ////--> if we didn't use Next Function it Didn't Exceture Other Middlewares
});

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' }
];

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});
///Routes
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    // 404 Object Not Found
    return res.status(404).send('The course with the given ID not found');
  res.send(course);
});

app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course); // Pushing course object into courses
  res.send(course);
});
app.put('/api/courses/:id', (req, res) => {
  //Look Up the Course
  // if not existing ,return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    // 404 Object Not Found
    return res.status(404).send('The course with the given ID not found');

  // Validate
  //If inValid,return 400 - Bad request
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
    // same with --->>> return res.status(400).send(error.details[0].message);
  }
  //Update Course
  //Return the Update Course
  course.name = req.body.name;
  res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  // Look up the Course
  //Not Existing , return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    // 404 Object Not Found
    return res.status(404).send('The course with the given ID not found');

  //Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);

  //Return the same Course
});

/*  Query Parameter if we can make http://localhost:3000/api/posts/25/45%20?%20sortBy=name
    app.get('/api/posts/:year/:month',(req,res)=>{
         res.send(req.query);
    });
 */

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
}

app.listen(port, () => console.log(`Listening On Port ${port}...`));
