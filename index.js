const express = require("express");
const Joi = require("joi");
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json()); // Enabling JSON Parasing

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});
///Routes
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    // 404 Object Not Found
    res.status(404).send("The course with the given ID not found");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course); // Pushing course object into courses
  res.send(course);
});

/*  Query Parameter if we can make http://localhost:3000/api/posts/25/45%20?%20sortBy=name
    app.get('/api/posts/:year/:month',(req,res)=>{
         res.send(req.query);
    });
 */

app.listen(port, () => console.log(`Listening On Port ${port}...`));
