exports.index = function(req, res) {
	res.render('user/index', {
		user: req.session.user
	});
}