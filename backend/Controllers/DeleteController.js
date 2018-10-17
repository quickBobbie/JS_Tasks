const { promisify } = require('util');

const Database = require('../Actions/Database');
const Response = require('../Actions/Response');

class DeleteController {
	deleteUser(req, res, next) {
		promisify(Database.removeUser)(req.user.id)
			.then(() => {
				res.json(new Response(1));
			})
			.catch(err => {
				res.json(new Response(0));
				next();
			})
	}
}

module.exports = new DeleteController();