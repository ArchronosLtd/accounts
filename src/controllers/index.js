'use strict';

const accounts = require('./accounts'),
	transactions = require('./transaction'),
	image = require('./image');

module.exports = {
	init: (app) => {
		app.get('/', (req, res) => {
			res.send('Accounts sytstem').status(200).end();
		});

		app.get('/accounts', accounts.GET);
		app.get('/account/:id', accounts.GET_ONE);

		app.get('/transactions/:id', transactions.GET);
		app.post('/transaction', transactions.POST);
		app.patch('/transaction/:id', transactions.PATCH);

		app.get('/image/:transactionId', image.GET);
	}
}