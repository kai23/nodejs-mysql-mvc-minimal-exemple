var UserController = require('../app/controllers/UserController');
var HomeController = require('../app/controllers/HomeController');
var AuthController = require('../app/controllers/AuthController');

module.exports = function(router) {

	// =====================================
	// HOME      ===========================
	// =====================================
	router.get('/', function(req, res) {
		HomeController.index(req, res);
	});

	// =====================================
	// AUTH  ===============================
	// =====================================
	router.get('/signin', isNotLoggedIn, function(req, res) {
		AuthController.signin(req, res);
	});

	router.post('/signin', isNotLoggedIn, function(req, res) {
		AuthController.perform_signin(req, res);
	});

	router.get('/user', isLoggedIn, function(req, res){
		UserController.index(req, res)
	})

	router.get('/logout', isLoggedIn, function(req, res) {
		AuthController.logout(req, res);
	});
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on
	if (req.session && req.session.user)
		return next();
	// if they aren't redirect them to the home page
	res.redirect('/');
}

// route middleware to make sure a user is logged in
function isNotLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on
	if (req.session && req.session.user)
		res.redirect('/user');
	else 
		return next();
	// if they aren't redirect them to the home page
}