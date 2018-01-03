const mongoSvc = require('./mongo');

module.exports = {
	save: (transaction) => {
		return mongoSvc.storeTransaction(transaction);
	},
	patch: (id, status) => {
		mongoSvc.patchTransaction(id, status);
	}
}