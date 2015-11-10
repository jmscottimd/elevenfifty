var express = require('express');
var app = express();

app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/notes', function(req, res){
res.json([
  {
    title: 'hardcoded note',
    body_html: 'this is the body of my hardcocded notes'
  },
  {
    title: 'another note',
    body_html: 'woo hoo noob'
  }
]);
});

app.listen(3000, function(){
  console.log('Listening on http://localhost:3000');
});
