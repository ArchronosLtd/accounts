const mongoSvc = require('./mongo');

module.exports = {
	get: () => {
		return mongoSvc.getAccounts();
	}
}