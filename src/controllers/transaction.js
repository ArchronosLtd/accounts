const transactionSvc = require('../services/transaction');

module.exports = {
	POST: (req, res) => {
		transactionSvc.save(req.body).then((transaction) => {
			res.send(transaction).status(200).end();
		}).catch((err) => {
			res.send(err).status(500).end();
		});
	},
	PATCH: (req, res) => {
		transactionSvc.patch(req.params.id, req.body.status).then((transaction) => {
			res.send(transaction).status(200).end();
		}).catch((err) => {
			res.send(err).status(500).end();
		});
	}
}