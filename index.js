const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const courses =[
    {id: 1, name:'course1'},
    {id: 2, name:'course1'},
    {id: 3, name:'course1'},
];

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.get('/api/courses',(req,res)=>{
    res.send(courses);
});
///Routes
app.get('/api/courses/:id',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) // 404 Object Not Found
        res.status(404).send('The course with the given ID not found');
    res.send(course) 
});

/*  Query Parameter if we can make http://localhost:3000/api/posts/25/45%20?%20sortBy=name
    app.get('/api/posts/:year/:month',(req,res)=>{
         res.send(req.query);
    });
 */

app.listen(port,() => console.log(`Listening On Port ${port}...`));