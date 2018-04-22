var express = require('express');
var app = express();
app.listen(8000);

app.get('/',function (req,res) {

});
app.use(express.static('public'));
app.use(express.static('node_modules'))