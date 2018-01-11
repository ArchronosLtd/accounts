const q = require('q'),
	mongoSvc = require('./mongo');

module.exports = {
	save: (transaction, files) => {
		return mongoSvc.storeTransaction(transaction, files).then((transaction) => {
			mongoSvc.getAccounts({
				_id: transaction.account
			}).then((accounts) => {
				let account = accounts[0];

				account.amountPending += transaction.amount;

				account.save((err, account) => {
					if (err) {
						console.error(err);
					}

					console.log(account);
				});
			});

			return transaction;
		});
	},
	patch: (id, status) => {
		let def = q.defer();

		mongoSvc.patchTransaction(id, status, comments).then((transaction) => {
			if (status === 'APPROVED') {
				// update the account here
				mongoSvc.getAccounts({
					_id: transaction.account
				}).then((accounts) => {
					let account = accounts[0];

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
				mongoSvc.getAccounts({
					_id: transaction.account
				}).then((accounts) => {
					let account = accounts[0];

					account.amountPending -= transaction.amount;

					account.save((err, account) => {
						if (err) {
							console.error(err);
							def.reject(err);
						}

						def.resolve(transaction);
					});
				});
			}
		});

		return def.promise;
	}
}