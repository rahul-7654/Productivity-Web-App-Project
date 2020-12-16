$(document).ready(function() {
    var emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
	var phonePattern = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
    var contactsList = document.querySelector(".contacts");
    var norecordtext = 'No contact is added yet.';
    var contacts = localStorage.getItem('contacts');
    
    if (contacts && contacts.length > 0) {
        contacts = JSON.parse(contacts);
        renderContactsList(contacts);
    } 
    else {
        $('.norecord').text(norecordtext);
        contacts = [];
    } 

    $("#btnCancel").click(function(){
        $("#tDate").val('');
        $("#title").val('');
        $("#container").hide(1000);
    });

    $("#contactForm").submit(function(event) {
        event.preventDefault();
        var isValid = true;

        var fname = $("#fName").val().trim();
        var lname = $("#lName").val().trim();
        var email = $("#email").val().trim();
        var mNumber = $("#mNumber").val().trim();

        if(fname == "") {
            $("#fName").next().text("This field is required");
            isValid = false;
        } else {
		    $("#fName").next().text("");
        }
        
        if(lname == "") {
          $("#lName").next().text("This field is required");
          isValid = false;
        } else {
			$("#lName").next().text("");
        }

        if(email == "") {
			$("#email").next().text("This field is required");
			isValid = false;
		} else if(!emailPattern.test(email)) {
			$("#email").next().text("Must be a valid email address.");
			isValid = false;
		} else {
			$("#email").next().text("");
        }
        
		if(mNumber == "") {
			$("#mNumber").next().text("This field is required");
			isValid = false;
		} else if (!phonePattern.test(mNumber)){
			$("#mNumber").next().text("Use 999-999-9999 format");
			isValid = false;
		} else {
			$("#mNumber").next().text("");
		}

        if (isValid) {
            const contact = {
                id: parseInt(Math.random() * 10000),
                firstName: fname,
                lastName: lname,
                email: email,
                phone: mNumber
            };
            contacts.push(contact);

            // clear form
            $("#fName").val('');
            $("#lName").val('');
            $("#email").val('');
            $("#mNumber").val('');

            // save list in local storage and render contacts
            addToLocalStorage(contacts);
        }
    });

    contactsList.addEventListener('click', function(event) {
        // check if that is a delete-button
        if (event.target.classList.contains('delete-button')) {
            console.log(event.target.parentElement);
            remove(event.target.parentElement.getAttribute('data-key'));
        }
    });

    function remove(id) {
        console.log(id);
        contacts = contacts.filter((item) => item.id != id);
        
        console.log(contacts);
        // update the localStorage
        addToLocalStorage(contacts);
      }

    function addToLocalStorage(list) {
        localStorage.setItem('contacts', list && list.length > 0 ? JSON.stringify(list) : '');
        renderContactsList(list);
    }

    function renderContactsList(list) {
        $('.norecord').text(list && list.length > 0 ? '' : norecordtext);
        contactsList.innerHTML = '';

        // loop through each contact
        list.forEach(function(item) {
            // Create new li element
            const li = document.createElement('li');

            // Set its data-key and class attribute
            li.setAttribute('class', 'item');
            li.setAttribute('data-key', item.id);

            li.innerHTML =`
            <div class="rows">
            <div class="leftCol-75">
                ${item.firstName} ${item.lastName}<br>
                <span><b>${item.phone} : </b>${item.email}</span>
            </div>
            <div class="rightCol-25" data-key=${item.id}>
            <button class="delete-button mt18 vertical-center">Remove</button>
            </div>
            </div>
            `
                                
            contactsList.append(li);
        }); 
    }
});