$(document).ready(function() {
	function updateSummary() {
		$.ajax({
			url: '/api/account/5a4bffa33a126f430073a1fd',
			success: function(data) {
				console.log(data);
				$('#remaining').text(data.amountRemaining.toFixed(2));
				$('#pending').text(data.amountPending.toFixed(2));
				$('#paid').text(data.amountPaid.toFixed(2));
			}
		});
	}

	function getTransactions() {
		$('#overlay').fadeIn();

		$.ajax({
			url: '/api/transactions/5a4bffa33a126f430073a1fd',
			success: function(data) {
				$('#transactions .transaction').remove();

				for (var i = 0; i < data.length; i++) {
					var transaction = data[i];

					// create the html
					var dom = $('#transaction-example').clone();

					dom.removeAttr('id');

					dom.find('.amount').text(transaction.amount.toFixed(2));
					dom.find('.description').text(transaction.description);
					dom.find('.status').addClass(transaction.status.toLowerCase()).text(transaction.status);

					$('#transactions').append(dom);
				}

				$('#overlay').fadeOut();
			}
		});
	}

	updateSummary();
	getTransactions();

	$('#logout').click(function(e) {
		$.ajax({
			url: 'logout'
		});
	});

	$('#submit').click(function(e) {
		var formData = new FormData(),
			file = document.getElementById('transaction-file').files[0],
			xhr = new XMLHttpRequest();

		formData.append('account', '5a4bffa33a126f430073a1fd');
		formData.append('date', new Date($('#transaction-date').val()));
		formData.append('amount', $('#transaction-amount').val());
		formData.append('status', 'PENDING');
		formData.append('receipt', file, file.name);
		formData.append('description', $('#transaction-description').val());

		xhr.open('POST', '/api/transaction/', true);

		xhr.onload = function() {
			$('#transaction-date').val('');
			$('#transaction-amount').val('');
			$('#transaction-description').val('');
			$('#transaction-file').val('');

			updateSummary();
			getTransactions();
		};

		xhr.send(formData);
	});
});