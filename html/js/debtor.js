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

	updateSummary();
});