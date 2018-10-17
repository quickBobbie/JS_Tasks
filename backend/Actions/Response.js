class Response {
	constructor(code, data) {
		if (typeof code === 'object') {
			this.code = 1;
			this.data = code;
		}

		if (typeof code === 'number') this.code = code;

		if (data || typeof data === 'object') {
			this.code = code === 1?code:1;
			this.data = data;
		}

		return this._createResponse();
	}

	_createResponse() {
		if (this.code === 0) return this._error();
		if (this.code === 1) return this._success();
		if (this.code === 2) return this._warning();
	}

	_error() {
		return {
			code : this.code,
			status : "Error"
		}
	}

	_success() {
		return {
			code : this.code,
			status : "Success",
			data : this.data
		}
	}

	_warning() {
		return {
			code : this.code,
			status : "Warning"
		}
	}
}

module.exports = Response;