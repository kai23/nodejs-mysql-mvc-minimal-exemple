exports.index = function(req, res) {
	var user = false;
	if(req.session.user) 
		user = req.session.user;
	res.render('home/index', {
		user:user
	})
}