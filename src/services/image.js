const mongoSvc = require('./mongo');

module.exports = {
	get: (transactionId) => {
		return mongoSvc.getImage(transactionId);
	}
}