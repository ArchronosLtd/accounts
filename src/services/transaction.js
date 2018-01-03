const q = require('q'),
	mongoSvc = require('./mongo');

module.exports = {
	save: (transaction) => {
		return mongoSvc.storeTransaction(transaction).then((transaction) => {
			mongoSvc.getAccounts({
				_id: transaction.account
			}).then((account) => {
				account.amountPending += transaction.amount;

				account.save((err, account) => {
					if (err) {
						console.error(err);
						def.reject(err);
					}

					def.resolve(transaction);
				});
			});

			return transaction;
		});
	},
	patch: (id, status) => {
		let def = q.defer();

		mongoSvc.patchTransaction(id, status).then((transaction) => {
			if (status === 'APPROVED') {
				// update the account here
				mongoSvc.getAccounts({
					_id: transaction.account
				}).then((account) => {
					account.amountPaid += transaction.amount;
					account.amountRemaining -= transaction.amount;
					account.amountPending -= transaction.amount;

					account.save((err, account) => {
						if (err) {
							console.error(err);
							def.reject(err);
						}

						def.resolve(transaction);
					});
				});
			} else {
				def.resolve(transaction);
			}
		});

		return def.promise;
	}
}