const transactionSvc = require('../services/transaction');

module.exports = {
	GET: (req, res) => {
		transactionSvc.fetch(req.params.id).then((transactions) => {
			res.send(transactions.reverse()).end();
		});
	},
	POST: (req, res) => {
		transactionSvc.save(req.body, req.file).then((transaction) => {
			res.send(transaction).status(200).end();
		}).catch((err) => {
			res.send(err).status(500).end();
		});
	},
	PATCH: (req, res) => {
		transactionSvc.patch(req.params.id, req.body.status, req.body.comments || '').then((transaction) => {
			res.send(transaction).status(200).end();
		}).catch((err) => {
			res.send(err).status(500).end();
		});
	}
}