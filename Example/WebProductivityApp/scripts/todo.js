$(document).ready(function() {
    var todoItemsList = document.querySelector('.todo-items');
    $('#today').text(new Date().toDateString());
    var norecordtext = 'No item is added yet. Click on Add New button to get started.';
    var todos = localStorage.getItem('todos');
    
    if (todos && todos.length > 0) {
        todos = JSON.parse(todos);
        renderTodos(todos);
    } 
    else {
        $('.norecord').text(norecordtext);
        todos = [];
    } 

    $("#btnAdd").click(function(){
        $("#container").show(1000);
    });

    $("#btnCancel").click(function(){
        $("#tDate").val('');
        $("#title").val('');
        $("#container").hide(1000);
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
            addToLocalStorage(todos);
        }
    });

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
    
    function toggle(id) {
        todos.forEach(function(item) {
          // use == not ===, because here types are different. One is number and other is string
          if (item.id == id) {
              console.log('ITEMS', item);
            // toggle the value
            item.completed = !item.completed;
          }
        });
      
         addToLocalStorage(todos);
    }

    function deleteTodo(id) {
        todos = todos.filter(function(item) {
          return item.id != id;
        });
      
        // update the localStorage
        addToLocalStorage(todos);
      }

    function addToLocalStorage(todos) {
        localStorage.setItem('todos', todos && todos.length > 0 ? JSON.stringify(todos) : '');
        renderTodos(todos);
    }

    function renderTodos(todos) {
        $('.norecord').text(todos && todos.length > 0 ? '' : norecordtext);
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
});