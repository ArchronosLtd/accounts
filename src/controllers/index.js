'use strict';

const accounts = require('./accounts'),
	transactions = require('./transaction');

module.exports = {
	init: (app) => {
		app.get('/', (req, res) => {
			res.send('Accounts sytstem').status(200).end();
		});

		app.get('/accounts', accounts.GET);

		app.post('/transaction', transactions.POST);
		app.patch('/transaction/:id', transactions.PATCH);
	}
}