const q = require('q'),
	mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/accounts', {
	useMongoClient: true
});

let db = mongoose.connection,
	Account;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('mongo connected');

	Account = mongoose.model('account', {
		"$schema": "http://json-schema.org/draft-04/schema#",
		"title": "Account",
		"type": "object",
		"properties": {
			"name": {
				"type": "string"
			},
			"startingAmount": {
				"type": "number"
			},
			"amountPaid": {
				"type": "number"
			},
			"amountPending": {
				"type": "number"
			},
			"amountRemaining": {
				"type": "number"
			}
		}
	});
});

module.exports = {
	getAccounts: () => {
		let def = q.defer();

		Account.find((err, accounts) => {
			if (err) {
				console.error(err);
				def.reject(err);
				return;
			}

			def.resolve(accounts);
		});

		return def.promise;
	}
}