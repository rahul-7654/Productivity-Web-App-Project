$(document).ready(function() { 
	$(function() { 
		//Current date 
		$('#today').text(new Date().toDateString());
		
		//Calendar show
		$( "#my_date_picker" ).datepicker({dateFormat: 'yy-mm-dd'});
		
		//Getting value from local storage
		var arr = JSON.parse(localStorage.getItem('todos'));
  		arr.forEach(function(obj) {
			console.log(obj.on);
  		});
	}); 
})