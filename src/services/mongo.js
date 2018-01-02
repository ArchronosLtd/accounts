const q = require('q'),
	mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/accounts', {
	useMongoClient: true
});

let db = mongoose.connection,
	Account;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('mongo connected');

	Account = mongoose.model('account', mongoose.Schema({
		name: String,
		startingAmount: Number,
		amountPaid: Number,
		amountPending: Number,
		amountRemaining: Number
	}));
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