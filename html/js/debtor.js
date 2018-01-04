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
		$.ajax({
			url: '/api/transactions',
			success: function(data) {
				for (var i = 0; i < data.length; i++) {
					var transaction = data[i];

					// create the html
					var dom = $('#transaction-example').clone();

					dom.removeAttr('id');

					dom.find('.amount').text(transaction.amount.toFixed(2));
					dom.find('.status').addClass(transaction.status.toLowerCase()).text(transaction.status);

					$('#transactions').append(dom);
				}
			}
		});
	}

	updateSummary();
	getTransactions();
});