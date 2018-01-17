const q = require('q'),
	mailer = require('./mail'),
	mongoSvc = require('./mongo');

module.exports = {
	fetch: (id) => {
		return mongoSvc.fetchTransactions({
			account: id
		});
	},
	save: (transaction, file) => {
		let def = q.defer();

		mongoSvc.storeTransaction(transaction, file).then((transaction) => {
			mongoSvc.getAccounts({
				_id: transaction.account
			}).then((accounts) => {
				let account = accounts[0];

				account.amountPending += transaction.amount;

				account.save((err, account) => {
					if (err) {
						console.error(err);
					}

					def.resolve(transaction);
				});
			}).then(() => {
				mailer.sendNewTransaction();
			});
		});

		return def.promise;
	},
	patch: (id, status, comments) => {
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

			mailer.sendResult(status, transaction.amount);
		});

		return def.promise;
	}
}