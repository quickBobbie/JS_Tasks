const { promisify } = require('util');

const Database = require('../Actions/Database');

class AuthController {
	authLocal(login, password, callback) {
		promisify(Database.getUser)({ login })
			.then(user => {
				if (!user) return callback(null, false);

				if (password !== user.password) return callback(null, false);

				return callback(null, user);
			})
			.catch(err => callback(err, null));
	}

	authToken(payload, callback) {
		promisify(Database.getUserById)(payload.id)
			.then(user => {
				if (!user) return callback(null, false);

				return callback(null, user);
			})
			.catch(err => callback(err, null));
	}
}

module.exports = new AuthController();