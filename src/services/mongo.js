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
	})),
	Transaction = db.model('transaction', mongoose.Schema({
		"account": {
			"type": "ObjectId"
		},
		"date": {
			"type": "Date"
		},
		"amount": {
			"type": "Number"
		},
		"status": {
			"type": "String"
		}
	}));

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('mongo connected');
});

module.exports = {
	getAccounts: (query) => {
		let def = q.defer();

		console.log(query);

		Account.find(query || {}, (err, accounts) => {
			if (err) {
				console.error(err);
				def.reject(err);
				return;
			}

			def.resolve(accounts);
		});

		return def.promise;
	},

	storeTransaction: (transaction) => {
		let def = q.defer(),
			dbTransaction = new Transaction({
				account: transaction.account,
				date: new Date(transaction.date),
				amount: transaction.amount,
				status: transaction.status || 'PENDING'
			});

		dbTransaction.save((err, transaction) => {
			if (err) {
				console.error(err);
				def.reject(err);
				return;
			}

			def.resolve(transaction);
		});

		return def.promise;
	},
	patchTransaction: (id, status) => {
		let def = q.defer();

		console.log(id);

		Transaction.findById(id, (err, transaction) => {
			if (err) {
				console.error(err);
				def.reject(err);
				return;
			}

			transaction.status = status;
			transaction.save((err, transaction) => {
				if (err) {
					console.error(err);
					def.reject(err);
					return;
				}

				def.resolve(transaction);
			});
		});

		return def.promise;
	}
}