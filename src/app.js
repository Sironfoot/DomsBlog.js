
/**
 * Module dependencies.
 */

var express = require('express');
var mongoose = require('mongoose');

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

mongoose.connect('mongodb://localhost/domsblog');

// Data Model

var Schema = mongoose.Schema;
var ObjectId = mongoose.ObjectId;

var BlogPostSchema = new Schema({
	title: { type: String },
	text: { type : String },
	publishDate: { type : Date, default: Date.now },
	isLive: { type : Boolean }
}, {
	collection: 'BlogPosts'
});

mongoose.model('BlogPost', BlogPostSchema)


var BlogPost = mongoose.model('BlogPost');

var blogPost = new BlogPost();
blogPost.title = 'Hello world 2';
blogPost.text = 'This is a test blog post';
blogPost.isLive = true;

blogPost.save(function(err) {
	console.log(err);
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
