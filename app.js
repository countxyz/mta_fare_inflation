var express = require('express');
var app = express();
app.use(express.logger());
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendfile("index.html");
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});