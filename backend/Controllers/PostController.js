const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const { config } = require('../modules/auth');

const Database = require('../Actions/Database');
const Response = require('../Actions/Response');

class PostController {
	signUp(req, res, next) {
		for (let key in req.body) {
			req.body[key] = req.body[key].replace(/<[^>]+>/g,'').trim();

			if (req.body[key] === 'undefined') delete req.body[key];
		}

		let requiredFields = [req.body.login, req.body.password, req.body.email];

		for(let field of requiredFields)
			if (!field) {
				res.json(new Response(2));

				return next();
			}

		const setUser = promisify(Database.setUser);

		setUser(req.body)
			.then(user => {
				if (!user) {
					res.json(new Response(2));

					return next();
				}

				const token = jwt.sign({ id : user._id }, config.secret);

				res.json(new Response(1, { user, token }));
			})
			.catch(err => {
				console.log(err);
				res.json(new Response(0));

				return next();
			});
	}

	signIn(req, res, next) {
		if (!req.user) {
			res.json(new Response(2));
			next()
		}
		const token = jwt.sign({ id : req.user._id }, config.secret);

		res.json(new Response(1, { user : req.user, token }));
	}
}

module.exports = new PostController();