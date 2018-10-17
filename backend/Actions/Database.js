const User = require('../Models/User');

class Database {
	setUser(userObj, callback) {
		User.findOne({ login : userObj.login })
			.then(user => {
				if (user) return callback(null, false);

				let newUser = new User(userObj);

				newUser.save()
					.then(user => callback(null, user))
					.catch(err => callback(err, null));
			})
			.catch(err => callback(err, null));
	}

	getUser(params, callback) {
		User.findOne(params)
			.then(user => {
				if (!user) return callback(null, false);

				callback(null, user);
			})
			.catch(err => callback(err, null));
	}

	getUserById(id, callback) {
		User.findById(id)
			.then(user => {
				if (!user) return callback(null, false);

				callback(null, user);
			})
			.catch(err => callback(err, null));
	}

	updateUser(id, params, callback) {
		User.findById(id)
			.then(user => {
				if (!user) return callback(null, false);

				for (let key in params) 
					user[key] = params[key];

				user.save()
					.then(user => callback(null, user))
					.catch(err => callback(err, null));
			})
			.catch(err => callback(err, null));
	}

	removeUser(id, callback) {
		User.remove({ _id : id }, err => callback(err));
	}
}

module.exports = new Database();