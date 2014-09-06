/**
 * Contrôleur pour la page d'accueil
 */
exports.index = function(req, res) {
	var user = false;

	// Si j'ai un utilisateur en session (que je suis connecté)
	// je le transfère à ma vue
	if(req.session.user) 
		user = req.session.user;
	res.render('home/index', {
		user:user
	})
}