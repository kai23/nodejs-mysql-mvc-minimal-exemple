// app/models/user.js
// load the things we need
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var configDB = require('../../config/connection.js');
var connection = mysql.createConnection(configDB);

exports.findByEmailAndPassword = function(datas, cb) {
	var email = datas.email;
	var password = datas.password;

	connection.query('SELECT * FROM users WHERE email = ? AND password = ? ', [email, password], function(err, row) {
		if (err) {
			cb('Erreur avec la base de donnée.', undefined);
		} else {
			// J'ai une ligne, j'en ai qu'une
			if(row && row.length == 1) {
				cb(false, row)	
			} else {
				cb("Erreur d'utilisateur ou de mot de passe", undefined)
			}
		}
	});
}