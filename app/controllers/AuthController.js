var UserModel = require('../models/User');


exports.signin = function(req, res) {
	// GET sur /signin
	var datas = '';
	if(req.session && req.session.flash) {
		datas = req.session.flash;
		req.session.flash = null;
	}
	res.render('auth/signin', datas);
}


exports.perform_signin = function(req, res) {
	// POST sur /signin
	UserModel.findByEmailAndPassword(req.body, function(err, row) {
		var message = '';
		if (err) {
			var datas = {};
			datas.email = req.body.email;
			datas.password = req.body.password;
			datas.message = err;
			req.session.flash = datas;
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
