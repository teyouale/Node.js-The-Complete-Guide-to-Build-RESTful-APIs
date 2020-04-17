const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.get('/api/courses',(req,res)=>{
    res.send([1,2,3]);
});
///Routes
app.get('/api/courses/:id',(req,res)=>{
    res.send(req.params.id);
});
app.get('/api/posts/:year/:month',(req,res)=>{
    res.send(req.params);
});
/*  Query Parameter if we can make http://localhost:3000/api/posts/25/45%20?%20sortBy=name
    app.get('/api/posts/:year/:month',(req,res)=>{
         res.send(req.query);
    });
 */

app.listen(port,() => console.log(`Listening On Port ${port}...`));