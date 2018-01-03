const accountsSvc = require('../services/accounts'),
	transactionSvc = require('../services/transaction');

module.exports = {
	GET: (req, res) => {
		accountsSvc.get().then((accounts) => {
			console.log(accounts);

			res.send(accounts).end();
		}).catch((err) => {
			res.send(err).status(500).end();
		});
	},
	PATCH: (req, res) => {
		transactionSvc.save()
	}
}