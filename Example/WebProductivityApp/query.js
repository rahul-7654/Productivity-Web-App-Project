$(document).ready(function() {
    var todos = [];

    $("#btnAdd").click(function(){
        $("#container").show(1000);
    });

    $("#btnCancel").click(function(){
        $("#container").hide(1000);
    });

    $("#taskForm").submit(function(event) {
        var isValid = true;

        var taskDate = $("#tDate").val().trim();
        var title = $("#title").val().trim();
        
        if(taskDate == "") {
			$("#tDate").next().text("This field is required");
			isValid = false;
		} else {
			$("#tDate").next().text("");
        }
        
        if(title == "") {
			$("#title").next().text("This field is required");
			isValid = false;
		} else {
			$("#title").next().text("");
        }
        
        if (isValid == false) {event.preventDefault(); }
     });
});