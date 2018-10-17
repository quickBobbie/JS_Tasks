const http = require('http');

class Server {
	constructor(app, params) {
		this.app = app;
		this.params = params;
	}

	start() {
		http.Server(this.app)
			.listen(
				this.params.port, 
				console.log(`Server run on ${ this.params.port } port`)
			);
	}
}

module.exports = Server;