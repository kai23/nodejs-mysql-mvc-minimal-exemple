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

// permet d'être sûr que l'utilisateur est connecté
function isLoggedIn(req, res, next) {
	if (req.session && req.session.user)
		return next();
	res.redirect('/');
}

// permet d'être sûr que l'utilisateur n'est PAS logué
function isNotLoggedIn(req, res, next) {
	if (req.session && req.session.user)
		res.redirect('/user');
	else 
		return next();
}