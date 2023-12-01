let toDoInput;
let errorInfo; 
let addBtn; 
let UlList; 
let addNewTodos;

let popup; 
let popupInfo;
let toDoToEdit; 
let popupInput;
let popupAddBtn;
let popupCloseBtn; 

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	toDoInput = document.querySelector(".todo-input");
	errorInfo = document.querySelector(".error-info");
	addBtn = document.querySelector(".btn-add");
	UlList = document.querySelector("ul");
	popup = document.querySelector(".popup");
	popupInfo = document.querySelector(".popup-info");
	popupInput = document.querySelector(".popup-input");
	popupAddBtn = document.querySelector(".accept");
	popupCloseBtn = document.querySelector(".cancel");
};
const prepareDOMEvents = () => {
	addBtn.addEventListener("click", addNewTodo);
	UlList.addEventListener("click", checkClick);
	popupCloseBtn.addEventListener("click", closePopup);
	popupAddBtn.addEventListener("click", changeToDoText);
	toDoInput.addEventListener("keyup", checkKeyEnter);
};

const addNewTodo = () => {
	if (toDoInput.value !== "") {
		addNewTodos = document.createElement("li");
		addNewTodos.textContent = toDoInput.value;
		createToolsArea();
		UlList.append(addNewTodos);
		toDoInput.value = "";
		errorInfo.textContent = "";
	} else {
		errorInfo.textContent = "Enter the task!";
	}
};
const createToolsArea = () => {
	const newDiv = document.createElement("div");
	newDiv.classList.add("tools");
	const newButtonComplete = document.createElement("button");
	newButtonComplete.classList.add("complete");
	newButtonComplete.innerHTML = '<i class="fas fa-check"></i>';
	const newButtonEdite = document.createElement("button");
	newButtonEdite.classList.add("edit");
	newButtonEdite.textContent = "EDIT";
	const newButtonDelete = document.createElement("button");
	newButtonDelete.classList.add("delete");
	newButtonDelete.innerHTML = '<i class="fas fa-times"></i>';
	newDiv.append(newButtonComplete, newButtonEdite, newButtonDelete);
	addNewTodos.append(newDiv);
};

const checkClick = e => {
	if (e.target.matches(".complete")) {
		e.target.closest("li").classList.toggle("completed");
		e.target.classList.toggle("completed");
	} else if (e.target.matches(".edit")) {
		editToDo(e);
	} else if (e.target.matches(".delete")) {
		deleteTodo(e);
	}
};
const editToDo = e => {
	toDoToEdit = e.target.closest("li");
	popupInput.value = toDoToEdit.firstChild.textContent;
	popup.style.display = "flex";
};

const closePopup = () => {
	popup.style.display = "none";
	popupInfo.textContent = "";
};
const changeToDoText = () => {
	if (popupInput.value !== "") {
		toDoToEdit.firstChild.textContent = popupInput.value;
		popup.style.display = "none";
		popupInfo.textContent = "";
	} else {
		popupInfo.textContent = "Task content is required!";
	}
};
const deleteTodo = e => {
	e.target.closest("li").remove();
	const allToDo = UlList.querySelectorAll("li");
	if (allToDo.length === 0) {
		errorInfo.textContent = "No tasks on the list";
	}
};
const checkKeyEnter = e => {
	if (e.key === "Enter") {
		addNewTodo();
	}
};

document.addEventListener("DOMContentLoaded", main);
