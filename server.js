const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (error)=>{
        if(error){
            console.log('Unable to append to server log');
        }
    });
   next();
});

/*app.use((req,res,next)=>{
    res.render('Oops.hbs', {
        pageTitle: 'Oops page',
        message: 'Oops something went wrong we will be back in sometime!!'
    });
});*/

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (message)=>{
    return message.toUpperCase();
});
app.get('/about',(req, res)=>{
  res.render('about.hbs',{
      pageTitle: 'About Page'
  });
});
app.get('/',(req, res)=>{
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the Site !!!'
    });
  });

app.listen(3000,()=>{
    console.log('Server started on port 3000')
});