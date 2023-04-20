//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.
window.addEventListener("DOMContentLoaded", () => {

    const taskInput = document.querySelector("#new-task"),//Add a new task.
          addButton = document.querySelector("#addBtn"),//Add button
          incompleteTaskHolder = document.querySelector("#incompleteTasks"),//ul of #incompleteTasks
          completedTasksHolder = document.querySelector("#completed-tasks");//completed-tasks


    //New task list item
    const createNewTaskElement=function(taskString){

        const listItem = document.createElement("li"),
            taskItemWrapper = document.createElement("article"),
            checkBox = document.createElement("input"), //checkbox
            label = document.createElement("h4"), //label
            editInput = document.createElement("input"), //input (text)
            editButton = document.createElement("button"), //edit button
            deleteButton = document.createElement("button"), //delete button
            deleteButtonImg = document.createElement("img");//delete button image

        label.textContent = taskString;

        //Each elements, needs appending
        listItem.classList.add('task-item');
        taskItemWrapper.classList.add('task-item__wrapper');
        checkBox.type = "checkbox";
        checkBox.classList.add('task-checkbox');
        label.classList.add('task-name');
        editInput.type = "text";
        editInput.classList.add("task-input");
        editButton.textContent = "Edit"; //innerText encodes special characters, HTML does not.
        editButton.classList.add("btn", "edit");
        deleteButton.classList.add("btn", "delete");
        deleteButtonImg.src='./remove.svg';
        deleteButtonImg.classList.add('delete-img');
        deleteButtonImg.alt = "delete img";
        deleteButton.append(deleteButtonImg);

        //and appending.
        taskItemWrapper.append(checkBox);
        taskItemWrapper.append(label);
        taskItemWrapper.append(editInput);
        taskItemWrapper.append(editButton);
        taskItemWrapper.append(deleteButton);
        listItem.append(taskItemWrapper);

        return listItem;
    }



    var addTask=function(){
        console.log("Add Task...");
        //Create a new list item with the text from the #new-task:
        if (!taskInput.value) return;
        var listItem=createNewTaskElement(taskInput.value);

        //Append listItem to incompleteTaskHolder
        incompleteTaskHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);

        taskInput.value="";

    }

    //Edit an existing task.

    var editTask=function(){
        console.log("Edit Task...");
        console.log("Change 'edit' to 'save'");


        var listItem = this.parentNode;

        var editInput=listItem.querySelector('input[type=text]');
        const label = listItem.querySelector(".task-name");
        var editBtn=listItem.querySelector(".edit");
        var containsClass=listItem.classList.contains("editMode");
        //If class of the parent is .editmode
        if(containsClass){

            //switch to .editmode
            //label becomes the inputs value.
            label.textContent = editInput.value;
            editBtn.textContent = "Edit";
        } else {
            editInput.value = label.textContent;
            editBtn.textContent = "Save";
        }

        //toggle .editmode on the parent.
        listItem.classList.toggle("editMode");
    };


    //Delete task.
    var deleteTask=function(){
        console.log("Delete Task...");

        const itemWrapper = this.parentElement;
        const taskItem = itemWrapper.parentElement;
        console.log(taskItem);
        //Remove the parent list item from the ul.
        taskItem.remove();

    }


    //Mark task completed
    const taskCompleted = function() {
        console.log("Complete Task...");

        //Append the task list item to the #completed-tasks
        const itemWrapper = this.parentElement;
        const listItem = itemWrapper.parentElement;
        completedTasksHolder.append(listItem);
        bindTaskEvents(listItem, taskIncomplete);

    }


    const taskIncomplete = function() {
        console.log("Incomplete Task...");
    //Mark task as incomplete.
        //When the checkbox is unchecked
        //Append the task list item to the #incompleteTasks.    
        const itemWrapper = this.parentElement;
        const listItem = itemWrapper.parentElement;
        incompleteTaskHolder.append(listItem);
        bindTaskEvents(listItem,taskCompleted);
    }



    var ajaxRequest=function(){
        console.log("AJAX Request");
    }

    //The glue to hold it all together.


    //Set the click handler to the addTask function.
    addButton.addEventListener("click",addTask);
    addButton.addEventListener("click",ajaxRequest);


    var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
        console.log("bind list item events");
    //select ListItems children
        var checkBox=taskListItem.querySelector("input[type=checkbox]");
        var editButton=taskListItem.querySelector("button.edit");
        var deleteButton=taskListItem.querySelector("button.delete");


        //Bind editTask to edit button.
        editButton.onclick=editTask;
        //Bind deleteTask to delete button.
        deleteButton.onclick=deleteTask;
        //Bind taskCompleted to checkBoxEventHandler.
        checkBox.onchange=checkBoxEventHandler;
    }

    //cycle over incompleteTaskHolder ul list items
    //for each list item
    for (var i=0; i<incompleteTaskHolder.children.length;i++){

        //bind events to list items chldren(tasksCompleted)
        bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
    }




    //cycle over completedTasksHolder ul list items
    for (var i=0; i<completedTasksHolder.children.length;i++){
        //bind events to list items chldren(tasksIncompleted)
        bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
    }

});


// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.