
var users = require('./users');

/* โหลด Express มาใช้งาน */
var app = require('express')();
 var bodyParser = require('body-parser');

 var mongojs = require('db');
 var db = mongojs.connect;
/* ใช้ port 7777 หรือจะส่งเข้ามาตอนรัน app ก็ได้ */
var port = process.env.PORT || 7777;
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});
/* Routing */
app.get('/', function (req, res) {
    res.send('<h1>Hello Node.js</h1>');
});
app.get('/index', function (req, res) {
    res.send('<h1>This is index page</h1>');
});


app.get('/user', function (req, res) {
    db.users.find(function(err,docs){
    	res.json(docs);
    });
});
 
app.get('/user/:id', function (req, res) {
    var id = req.params.id;
    res.json(users.findById(id));
    
});



app.get('/newuser', function (req, res,next) {
	// // res.contentType('application/json');
	// var json = req.body;
 //    res.send(json);
 // //    // res.send('Add new ' + json.name + ' Completed!');
 //    console.log("body : "+json.position);
 // //    res.send(json);
 //  // next();
 	db.users.insert([{name:"newUser",age:55},{name:"newUser2",age:60}],function(err,docs){
 		if (!err) {
 			db.users.find(function(err,docs){
 				res.json(docs);
 			});
 		};
 	});
    
}); 



