// app/models/User.js
var mysql = require('mysql');
var configDB = require('../../config/connection.js');
var connection = mysql.createConnection(configDB);


// Ici, ce qui peut intriguer, c'est ce « cb », pour « callback ». 
// En fait, c'est juste une fonction, rien d'autres, qui sera utilisée par la suite
// pour faire quelque chose comme « findByEmailAndPassword(datas, function(xx,xx){}) »

exports.findByEmailAndPassword = function(datas, cb) {
	var email = datas.email;
	var password = datas.password;

	// Ici, j'échappe les données que j'envoie pour éviter tout ce qui
	// est injection SQL
	
	connection.query('SELECT * FROM users WHERE email = ? AND password = ? ', [email, password], function(err, row) {
		// J'ai une erreur MySQL
		if (err) {
			console.log(err);
			cb('Erreur avec la base de donnée.', undefined);
		} else {
			// J'ai une ligne, j'en ai qu'une
			if(row && row.length == 1) {
				cb(false, row)	
			} else {
				// Soit j'ai plus d'une ligne, soit j'en ai pas.
				cb("Erreur d'utilisateur ou de mot de passe", undefined)
			}
		}
	});
}