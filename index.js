const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.get('/api/courses',(req,res)=>{
    res.send([1,2,3]);
});
 // Port changing Port

app.listen(port,() => console.log(`Listening On Port ${port}...`));