const mongoSvc = require('./mongo');

module.exports = {
	get: (query) => {
		return mongoSvc.getAccounts(query);
	}
}