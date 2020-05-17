const express = require('express');
const router = express.Router();
const Joi = require('joi');

// const router = express(); Don;t Works We When Seprate the routes with Module

const courses = [
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' }
];

router.get('/', (req, res) => {
  res.send(courses);
});
///Routes
router.get('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    // 404 Object Not Found
    return res.status(404).send('The course with the given ID not found');
  res.send(course);
});

router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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
      router.get('/api/posts/:year/:month',(req,res)=>{
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

module.exports = router;
