
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function() {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
	
	app.register('.html', require('ejs'));
});

app.configure('development', function() {
  	app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function() {
  	app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  	res.render('index.html', {
    	title: 'Blogs'
  	});
});

app.get('/blog/:id/:title', function(req, res) {
	res.render('blogPost.html', {
		title: req.params.title
	});
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
