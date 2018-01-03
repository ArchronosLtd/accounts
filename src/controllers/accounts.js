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
	GET_ONE: (req, res) => {
		accountsSvc.get({
			_id: req.params.id
		}).then((accounts) => {
			console.log(accounts);

			res.send(accounts[0]).end();
		}).catch((err) => {
			res.send(err).status(500).end();
		});
	},
	PATCH: (req, res) => {
		transactionSvc.save()
	}
}