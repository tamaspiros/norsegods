'use strict';

var express    = require('express');
var app        = express();
var router     = express.Router();

var marklogic  = require('marklogic');

var connection = {
	host: 'localhost',
	port: 5060,
	user: 'admin',
	password: 'admin'
};

var db         = marklogic.createDatabaseClient(connection);
var qb         = marklogic.queryBuilder;

app.set('port', 8080);
app.set('view engine', 'jade');

app.use('/components', express.static(__dirname + '/components'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/views', express.static(__dirname + '/views'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

/**
 * Route configuration
 */
var index = function(req, res) {
	res.render('index');
};

var listAll = function(req, res) {
	db.documents.query(qb.where(qb.collection('bio')).slice(1,20))
	.result()
	.then(function(documents) {
		res.json(documents);
	});
};

var listOne = function(req, res) {
	var name = req.params.name;
	var uri = '/norsegods/' + name + '.json';
	db.documents.read(uri)
	.result()
	.then(function(document) {
		res.json(document);
	});
};

var displayImage = function(req, res) {
	var name = req.params.name;
	var uri = '/norsegods/' + name + '.jpg';
	db.documents.read(uri)
	.result()
	.then(function(document) {
		//new Buffer(document[0].content, 'binary').toString('base64');
		//res.json(document);
		res.json(new Buffer(document[0].content, 'binary').toString('base64'));
	});
};

router.route('/').get(index);
router.route('/api').get(listAll);
router.route('/api/:name').get(listOne);
router.route('/api/image/:name').get(displayImage);

//route declaration for the partials
var partials = function partials(req, res) {
	var name = req.params.name;
	res.render(name);
}

router.route('/views/:name').get(partials);

//apply routes
app.use('/', router);

app.listen(app.get('port'));
console.log('Magic happens on port ' + app.get('port'));
