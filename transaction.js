const transactionSvc = require('../services/transaction');

module.exports = {
	POST: (req, res) => {
		transactionSvc.save(req.body).then((transaction) => {
			req.send(transaction).status(200).end();
		}).catch((err) => {
			req.send(err).status(500).end();
		});
	}
}