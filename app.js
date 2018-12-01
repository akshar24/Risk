var express = require('express');
var app = express();
app.use(express.static(__dirname + '/View'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/Script'));
//Store all JS and CSS in Scripts folder.

app.get('/',function(req,res){
  res.sendFile('index.html');
  //It will find and locate index.html from View or Scripts
});

app.get('/login',function(req,res){
  res.sendFile('/login.html');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});