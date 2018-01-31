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

		function patch(status, id) {
			$('#overlay').fadeIn();

                        var formData = new FormData(),
                            xhr = new XMLHttpRequest();

                        formData.append('status', status);
                        formData.append('comments', '');

                        xhr.open('PATCH', '/api/transaction/' + id, true);
                        xhr.onload = function() {
                            updateSummary();
                            getTransactions();
                        };

                        xhr.send(formData);
		}

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
						patch('APPROVED', transaction._id);
					});

					dom.find('.btn-danger').click(function(e) {
						patch('REJECTED', transaction._id);
					});

					if(transaction.status.toLowerCase() === 'approved') {
						dom.find('.btn-success').remove();
						dom.find('.btn-danger').remove();
					}

					dom.find('.btn-primary').click(function(e) {
						var id = $(this).parent().parent().find('input').val();

						window.open('/api/image/' + id);
					});

					$('#transactions').append(dom);
					$('#overlay').fadeOut();
				}
			}
		});
	}

	updateSummary();
	getTransactions();

	$('#logout').click(function(e) {
		$.ajax({
				type: "GET",
				url: "/myapp/logout",
				async: false,
				username: "logmeout",
				password: "123456",
				headers: {
					"Authorization": "Basic xxx"
				}
			})
			.done(function() {
				// If we don't get an error, we actually got an error as we expect an 401!
			})
			.fail(function() {
				// We expect to get an 401 Unauthorized error! In this case we are successfully 
				// logged out and we redirect the user.
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
