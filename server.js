const express=require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();


app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'));


app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method}, ${req.url}`
    
    console.log(log)
    fs.appendFile('server.log', log + '\n', (err)=>{
        if (err) {
            console.log('error warning');
        }
    })
    next();
}); //how you call midleware, next exists so you can tell express when you middleware function is done
//only when we call next(); would the aplication continue to run.

 app.get('/', (req,res)=>{
    res.send('Hello Express!');
 });

app.get('/bad', (req,res)=>{
    res.send('Bad request');
})

 app.listen(3000);