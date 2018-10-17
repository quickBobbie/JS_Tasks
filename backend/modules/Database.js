const mongoose = require('mongoose');

class Database {
	constructor(params) {
		this.params = params;
		this.uri = `mongodb://${ params.host }:${ params.port }/${ params.database }`;
	}

	connect() {
		mongoose.connect(this.uri, this.params.options);

		return mongoose.connection;
	}

	open() {
		console.log(`Connect [${ this.name }] database`);
	}

	error() {
		console.log(`[${ this.name }] database connection error`);
	}
}

module.exports = Database;