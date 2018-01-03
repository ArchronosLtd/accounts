const q = require('q'),
	mongoSvc = require('./mongo');

module.exports = {
	save: (transaction) => {
		return mongoSvc.storeTransaction(transaction);
	},
	patch: (id, status) => {
		let def = q.defer();

		mongoSvc.patchTransaction(id, status).then((transaction) => {
			if (status === 'APPROVED') {
				// update the account here
			}

			def.resolve(transaction);
		});

		return def.promise;
	}
}