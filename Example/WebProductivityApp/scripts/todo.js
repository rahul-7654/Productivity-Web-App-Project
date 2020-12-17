$(document).ready(function() {
    var emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
    var phonePattern = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
    
    var todoItemsList = document.querySelector('.todo-items');
    var contactsList = document.querySelector(".contacts");

    var nocontacttext = 'No contact is added yet.';
    var norecordtext = 'No item is added yet. Click on Add New button to get started.';

    $('#today').text(new Date().toDateString());
    var todos = localStorage.getItem('todos');    
    if (todos && todos.length > 0) {
        todos = JSON.parse(todos);
        renderTodos(todos);
    } 
    else {
        $('.norecord').text(norecordtext);
        todos = [];
    } 

    var contacts = localStorage.getItem('contacts');
    if (contacts && contacts.length > 0) {
      contacts = JSON.parse(contacts);
      renderContactsList(contacts);
    } 
    else {
        $('.norecord').text(norecordtext);
        contacts = [];
    } 

    $("#calDate").change(function(e,d) {
      var filtered = todos.filter(todo => todo.on === e.target.value);
      renderTodos(filtered);
    });

    $("#btnAdd").click(function(){
        $("#container").show(1000);
    });

    $("#btnCancel").click(function(){
        $("#tDate").val('');
        $("#title").val('');
        $("#container").hide(1000);
    });

    $("#contact-btn-Cancel").click(function(){
      $("#tDate").val('');
      $("#title").val('');
    });


    $("#taskForm").submit(function(event) {
        event.preventDefault();
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

        if (isValid) {
            const todo = {
                id: parseInt(Math.random() * 100000),
                on: taskDate,
                name: title,
                completed: false
            };
            todos.push(todo);
            $("#tDate").val('');
            $("#title").val('');
            // save list in local storage and render todo items
            addToLocalStorage('todos', todos);
        }
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
          addToLocalStorage('contacts', contacts);
      }
    });

    if(todoItemsList != null) {
      todoItemsList.addEventListener('click', function(event) {
        // check if the event is on checkbox
        if (event.target.type === 'checkbox') {
          // toggle the state
          toggle(event.target.parentElement.getAttribute('data-key'));
        }
      
        // check if that is a delete-button
        if (event.target.classList.contains('delete-button')) {
          // get id from data-key attribute's value of parent <li> where the delete-button is present
          deleteTodo(event.target.parentElement.getAttribute('data-key'));
        }
      });
    }
    
    if(contactsList != null) {
      contactsList.addEventListener('click', function(event) {
        // check if that is a delete-button
        if (event.target.classList.contains('delete-button')) {
            deleteContact(event.target.parentElement.getAttribute('data-key'));
        }
      });
    }
  
    function deleteContact(id) {
      contacts = contacts.filter((item) => item.id != id);
      
      // update the localStorage
      addToLocalStorage('contacts', contacts);
    }

    function toggle(id) {
        todos.forEach(function(item) {
          // use == not ===, because here types are different. One is number and other is string
          if (item.id == id) {
            // toggle the value
            item.completed = !item.completed;
          }
        });
      
         addToLocalStorage('todos', todos);
    }

    function deleteTodo(id) {
        todos = todos.filter(function(item) {
          return item.id != id;
        });
      
        // update the localStorage
        addToLocalStorage('todos', todos);
      }

    function addToLocalStorage(key, list) {
        localStorage.setItem(key, list && list.length > 0 ? JSON.stringify(list) : '');
        switch(key) {
          case 'contacts' :
            renderContactsList(list);
            break;
          case 'todos' :
            renderTodos(list);
            break;
        }
    }

    function renderTodos(todos) {
        $('.norecord').text(todos && todos.length > 0 ? '' : norecordtext);
        if(todoItemsList != null) {
          todoItemsList.innerHTML = '';
      
          // loop through each todo item
          todos.forEach(function(item) {
            const checked = item.completed ? 'checked': null; // check if already completed
        
            // Create new li element
            const li = document.createElement('li');
  
            // Set its data-key and class attribute
            li.setAttribute('class', 'item');
            li.setAttribute('data-key', item.id);
  
            if (item.completed === true) {
              li.classList.add('checked');
            }
        
            li.innerHTML = `<input type="checkbox" class="checkbox" ${checked}>
                              ${item.name}<br>
                              <span class="ml31">${item.on}</span>
                              <button class="delete-button vertical-center">Remove</button>`;
                              
            todoItemsList.append(li);
          });
        }
    }

    function renderContactsList(list) {
      $('.norecord').text(list && list.length > 0 ? '' : nocontacttext);
      if(contactsList != null) {
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
    }
});