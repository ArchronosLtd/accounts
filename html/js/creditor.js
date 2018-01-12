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
					dom.find('.status').addClass(transaction.status.toLowerCase()).children('span').text(transaction.status);
					dom.find('input').val(transaction._id);

					dom.find('.btn-success').click(function(e) {
						var id = $(this).parent().parent().parent().find('input').val(),
							formData = new FormData(),
							xhr = new XMLHttpRequest();;

						formData.append('status', 'APPROVED');
						formData.append('comments', '');

						xhr.open('PATCH', '/api/transaction/' + id, true);
						xhr.onload = function() {
							updateSummary();
							getTransactions();
						};

						xhr.send(formData);
					});

					dom.find('.btn-primary').click(function(e) {
						var id = $(this).parent().parent().find('input').val();

						window.open('/api/image/' + id);
					});

					$('#transactions').append(dom);
				}
			}
		});
	}

	updateSummary();
	getTransactions();

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