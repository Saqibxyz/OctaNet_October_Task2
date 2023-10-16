document.addEventListener("DOMContentLoaded", function () {
        function getDateAndConcatenate(data) {
        var dateInput = document.getElementById("deadline");
        var dateValue = dateInput.value;
        var dateObject = new Date(dateValue);
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        var formattedDate = dateObject.toLocaleDateString('en-US', options);
        var concatenatedString = data +" - "+ formattedDate;
        return concatenatedString;
      }
    var incompleteTaskHolder;
    var taskInput = document.getElementById("new-task");
    var addButton = document.getElementById("add-button");
    var selectElement = document.getElementById("inlineFormCustomSelect");
    var completedTasksHolder = document.getElementById("completed-tasks");
    var errorMessage = document.getElementById("errorMessage");
    addButton.addEventListener("click", addTask);
    function createNewTaskElement(taskString) {
        var listItem = document.createElement("li");
        var checkBox = document.createElement("input");
        var label = document.createElement("label");
        var editInput = document.createElement("input");
        var editButton = document.createElement("button");
        var deleteButton = document.createElement("button");
        label.innerText = taskString;
        checkBox.type = "checkbox";
        editInput.type = "text";
        editButton.innerText = "Edit";
        editButton.className = "edit btn btn-outline-dark";
        editButton.id="edit_btn";
        deleteButton.innerText = "Delete";
        deleteButton.className = "delete btn btn-outline-dark";
        listItem.appendChild(checkBox);
        listItem.appendChild(label);
        listItem.appendChild(editInput);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        return listItem;
    }
    function addTask() {
        var value = taskInput.value.trim();
        if (value === "") {
            errorMessage.innerText = "Please Enter Task to do";
            return false;
        }
        errorMessage.innerText = "";
        var list_value = selectElement.value;
        if (list_value === "high") {
            incompleteTaskHolder = document.getElementById("incomplete-tasks-high");
        } else if (list_value === "medium") {
            incompleteTaskHolder = document.getElementById("incomplete-tasks-medium");
        } else {
            incompleteTaskHolder = document.getElementById("incomplete-tasks-low");
        }
        var listItem = createNewTaskElement(getDateAndConcatenate(value));
        incompleteTaskHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);
        taskInput.value = "";
    }
    function editTask() {
        var listItem = this.parentNode;
        var editInput = listItem.querySelector('input[type=text]');
        var label = listItem.querySelector("label");
        var editButton = listItem.querySelector("#edit_btn");
        var containsClass = listItem.classList.contains("editMode");
        if (containsClass) {
            label.innerText = editInput.value;
            editButton.textContent = "Edit";
        } else {
            editInput.value = label.innerText;
            editButton.textContent = "Save";
        }
        listItem.classList.toggle("editMode");
    }
    function deleteTask() {
        var listItem = this.parentNode;
        var ul = listItem.parentNode;
        ul.removeChild(listItem);
    }
    function taskCompleted() {
        var listItem = this.parentNode;
        completedTasksHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskIncomplete);
    }
    function taskIncomplete() {
        var listItem = this.parentNode;
        incompleteTaskHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);
    }
    function bindTaskEvents(taskListItem, checkBoxEventHandler) {
        var checkBox = taskListItem.querySelector("input[type=checkbox]");
        var editButton = taskListItem.querySelector("button.edit");
        var deleteButton = taskListItem.querySelector("button.delete");
        editButton.addEventListener("click", editTask);
        deleteButton.addEventListener("click", deleteTask);
        checkBox.addEventListener("change", checkBoxEventHandler);
    }
    function init() {
        for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
            bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
        }
        for (var i = 0; i < completedTasksHolder.children.length; i++) {
            bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
        }
    }
    init();
});
