const mongoSvc = require('./mongo');

module.exports = {
	save: (transaction) => {
		return mongoSvc.storeTransaction(transaction);
	}
}