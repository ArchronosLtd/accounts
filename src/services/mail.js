const q = require('q'),
	mailer = require('nodemailer'),
	_ = require('lodash'),
	transporter = mailer.createTransport({
		host: 'smtp.office365.com', // Office 365 server
		port: 587, // secure SMTP
		secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
		auth: {
			user: 'steve@archronos.com',
			pass: process.env.emailPassword
		},
		tls: {
			ciphers: 'SSLv3'
		}
	});

module.exports = {
	sendResult: (result, amount) => {
		let def = q.defer();

		console.log('sending');

		transporter.sendMail({
			from: '"Archronos account management" <debt-control@archronos.com>',
			to: 'steve.colemanwilliams@gmail.com,frances@colemanwilliams.co.uk',
			subject: 'Kevin and Chris have updated the account',
			text: `Hi Steve and Frances,\r\nKevin and Chris have ${result.toLowerCase()} a payment for £${amount.toFixed(2)}.\r\nPaste the following into you browser to view.\r\nhttp://account.archronos.com/debtor.html`,
			html: `<p>Hi Steve and Frances,</p>
						<p>Kevin and Chris have ${result.toLowerCase()} a payment for £${amount.toFixed(2)}</p>
						<p><a href="http://account.archronos.com/debtor.html">Click here</a> to view the transaction.`
		}, (err) => {
			if (err) {
				console.error(err);
				def.reject(err);
			}

			console.log('sent');

			def.resolve();
		});

		return def.promise;
	},
	sendNewTransaction: () => {
		let def = q.defer(),
			err = false,
			emails = [
				'kevin305wright@btinternet.com',
				'chris176wright@btinternet.com',
				'steve.colemanwilliams@gmail.com'
			];

		_.forEach(emails, (email) => {
			transporter.sendMail({
				from: '"Archronos account management" <debt-control@archronos.com>',
				to: email,
				subject: 'Steve and Frances have updated the account',
				text: 'Hi Kevin and Chris,\r\nSteve and Frances have added another payment or reciept for you to approve.\r\nPaste the following into you browser to view.\r\nhttp://account.archronos.com/creditor.html',
				html: `<p>Hi Kevin and Chris,</p>
						<p>Steve and Frances have added another payment or reciept for you to approve.</p>
						<p><a href="http://account.archronos.com/creditor.html">Click here</a> to view the transaction.`
			}, (error) => {
				if (error) {
					err = error;
				}
			});
		});

		def.resolve(true);

		return def.promise;
	}
};