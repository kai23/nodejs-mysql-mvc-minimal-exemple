var UserModel = require('../models/User');


exports.signin = function(req, res) {
	// GET sur /signin
	var datas = '';

	// Si j'ai des trucs dans ma session flash, je les mets dans 
	// datas, que je transfère à ma vue par la suite (views/auth/signin.ejs)
	if(req.session && req.session.flash) {
		datas = req.session.flash;
		req.session.flash = null;
	}

	// Affichage de la vue signin
	res.render('auth/signin', datas);
}


exports.perform_signin = function(req, res) {
	// POST sur /signin
	// ICI je préfère faire une redirection, pour
	// éviter qu'en faisant « F5 », ça renvoie le formulaire
	UserModel.findByEmailAndPassword(req.body, function(err, row) {
		var message = '';
		if (err) {
			// Je garde ici les datas du formulaire
			var datas = {};
			datas.email = req.body.email;
			datas.password = req.body.password;
			datas.message = err;

			// Que je stock en session
			req.session.flash = datas;

			// Et je redirige sur /signin, en GET
			res.redirect('/signin')
		} else {
			req.session.user = row[0];
			res.redirect('/user');
		}
	});
}

exports.logout = function(req, res) {
	// GET sur /logout
	req.session.user = null;
	res.redirect('/');
}
