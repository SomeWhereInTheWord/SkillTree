var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

module.exports = function(){
	console.log('init express...');
	var app = express();
	//middlewire
	app.use(bodyParser.json());
	app.use(express.static(path.join(__dirname, '../public')));
	//route
	require('../app/routes/skillTree.server.route')(app);
	require('../app/routes/skillTreeData.server.route')(app);
	
	/*
	app.use(function (req, res, next){
		res.status(404);
		try{
			return res.json('Not Found');
		}catch(e){
			console.error('404 set header after sent');
		}
	});

	app.use(function (err, req, res, next){
		if(!err){
			return next();
		}
		res.status(500);
		try{
			return res.json('Not Found');
		}catch(e){
			console.error('500 set header after sent');
		}
	});
	*/
	return app;
}