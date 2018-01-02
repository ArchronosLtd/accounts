const q = require('q'),
	mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/accounts', {
	useMongoClient: true
});

let db = mongoose.connection,
	Account = db.model('account', mongoose.Schema({
		"name": {
			"type": "String"
		},
		"startingAmount": {
			"type": "Number"
		},
		"amountPaid": {
			"type": "Number"
		},
		"amountPending": {
			"type": "Number"
		},
		"amountRemaining": {
			"type": "Number"
		}
	}));

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('mongo connected');
});

module.exports = {
	getAccounts: () => {
		let def = q.defer();

		Account.find({}, (err, accounts) => {
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