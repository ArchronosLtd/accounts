const q = require('q'),
	fs = require('fs'),
	mongoose = require('mongoose');

mongoose.connect('mongodb://debts:27017/accounts', {
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
		},
		"description": {
			"type": "String"
		},
		"img": {
			data: Buffer,
			contentType: String
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

	fetchTransactions: (query) => {
		let def = q.defer();

		Transaction.find(query, (err, transactions) => {
			if (err) {
				console.error(err);
				def.reject(err);
				return;
			}

			def.resolve(transactions);
		});

		return def.promise;
	},
	storeTransaction: (transaction, file) => {
		let def = q.defer(),
			dbTransaction = new Transaction({
				account: transaction.account,
				date: new Date(transaction.date),
				amount: transaction.amount,
				status: transaction.status || 'PENDING',
				description: transaction.description
			});

		dbTransaction.img.data = fs.readFileSync(file.path);
		dbTransaction.img.contentType = `image/png`;

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
	patchTransaction: (id, status, comments) => {
		let def = q.defer();

		Transaction.findById(id, (err, transaction) => {
			if (err) {
				console.error(err);
				def.reject(err);
				return;
			}

			console.log('transaction: ', transaction);

			transaction.status = status;

			console.log('transaction: ', transaction);

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
	},

	getImage: (transactionId) => {
		let def = q.defer();

		Transaction.findById(transactionId, (err, transaction) => {
			if (err) {
				console.error(err);
				def.reject(err);
				return;
			}

			def.resolve(transaction.img);
		})

		return def.promise;
	}
}