const q = require('q'),
	mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/accounts', { useMongoClient: true });

let Account = mongoose.model('Account', {
	name: String,
	startingAmount: Number,
	amountPaid: Number,
	amountPending: Number,
	amountRemaining: Number
});

module.exports = {
	getAccounts: () => {
		let def = q.defer();

		Account.find((err, accounts) => {
			if(err) {
				console.error(err);
				def.reject(err);
				return;
			}

			def.resolve(accounts);
		});

		return def.promise;
	}
}