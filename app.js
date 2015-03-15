'use strict';

var express    = require('express');
var app        = express();
var router     = express.Router();

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

router.route('/').get(index);

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
