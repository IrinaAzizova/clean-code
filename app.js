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
        checkBox.classList.add('task-item__checkbox');
        label.classList.add('task-item__name');
        editInput.type = "text";
        editInput.classList.add("task-input");
        editButton.textContent = "Edit"; //innerText encodes special characters, HTML does not.
        editButton.classList.add("btn", "btn-edit");
        deleteButton.classList.add("btn", "btn-delete");
        deleteButtonImg.src='./remove.svg';
        deleteButtonImg.classList.add('btn-delete__img');
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



    const addTask = function() {
        console.log("Add Task...");
        //Create a new list item with the text from the #new-task:
        if (!taskInput.value) return;
        const listItem = createNewTaskElement(taskInput.value);

        //Append listItem to incompleteTaskHolder
        incompleteTaskHolder.append(listItem);
        bindTaskEvents(listItem, taskCompleted);

        taskInput.value="";
    }

    //Edit an existing task.

    const editTask = function() {
        console.log("Edit Task...");
        console.log("Change 'edit' to 'save'");

        const listItem = this.parentNode,
              editInput = listItem.querySelector('.task-input'),
              label = listItem.querySelector(".task-item__name"),
              editBtn = listItem.querySelector(".btn-edit"),
              containsClass = listItem.classList.contains("task-item__wrapper_edit");

        //If class of the parent is .task-item__wrapper_edit
        if(containsClass){
            console.log(containsClass);
            //switch to .task-item__wrapper_edit
            //label becomes the inputs value.
            label.textContent = editInput.value;
            editBtn.textContent = "Edit";
        } else {
            editInput.value = label.textContent;
            editBtn.textContent = "Save";
        }

        //toggle .task-item__wrapper_edit on the parent.
        listItem.classList.toggle("task-item__wrapper_edit");
    };


    //Delete task.
    const deleteTask = function(){
        console.log("Delete Task...");

        const itemWrapper = this.parentElement,
              taskItem = itemWrapper.parentElement;
        console.log(taskItem);
        //Remove the parent list item from the ul.
        taskItem.remove();
    }


    //Mark task completed
    const taskCompleted = function() {
        console.log("Complete Task...");

        //Append the task list item to the #completed-tasks
        const itemWrapper = this.parentElement,
              listItem = itemWrapper.parentElement;
        completedTasksHolder.append(listItem);
        bindTaskEvents(listItem, taskIncomplete);
    }


    const taskIncomplete = function() {
        console.log("Incomplete Task...");
        //Mark task as incomplete.
        //When the checkbox is unchecked
        //Append the task list item to the #incompleteTasks.    
        const itemWrapper = this.parentElement,
              listItem = itemWrapper.parentElement;
        incompleteTaskHolder.append(listItem);
        bindTaskEvents(listItem,taskCompleted);
    }



    const ajaxRequest = function() {
        console.log("AJAX Request");
    }

    //The glue to hold it all together.


    //Set the click handler to the addTask function.
    addButton.addEventListener("click",addTask);
    /* addButton.addEventListener("click",ajaxRequest); */


    const bindTaskEvents = function(taskListItem,checkBoxEventHandler) {
        console.log("bind list item events");
        //select ListItems children
        const checkBox = taskListItem.querySelector(".task-item__checkbox"),
              editButton=taskListItem.querySelector(".btn-edit"),
              deleteButton=taskListItem.querySelector(".btn-delete");

        //Bind editTask to edit button.
        editButton.addEventListener("click", editTask);
        //Bind deleteTask to delete button.
        deleteButton.addEventListener("click", deleteTask);
        //Bind taskCompleted to checkBoxEventHandler.
        checkBox.addEventListener('change', checkBoxEventHandler);
    }

    //cycle over incompleteTaskHolder ul list items
    //for each list item
    for (let i=0; i < incompleteTaskHolder.children.length; i++){
        //bind events to list items chldren(tasksCompleted)
        bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
    }




    //cycle over completedTasksHolder ul list items
    for (let i=0; i < completedTasksHolder.children.length; i++){
        //bind events to list items chldren(tasksIncompleted)
        bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
    }
});


// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.