const { promisify } = require('util');

const Database = require('../Actions/Database');
const Response = require('../Actions/Response');

class PutController {
	updateUser(req, res, next) {
		for (let key in req.body) {
			req.body[key] = req.body[key].replace(/<[^>]+>/g,'').trim();

			if (req.body[key] === 'undefined') delete req.body[key];
		}

		promisify(Database.updateUser)(req.user._id, req.body)
			.then(user => {
				if (!user) {
					res.json(new Response(2));
					next();
				}

				res.json(new Response(1, { user }));
			})
			.catch(err => {
				res.json(new Response(0));
				next();
			})

	}
}

module.exports = new PutController();