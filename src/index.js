import "./styles.css";
import addTaskSvg from "./images/plus-circle-svgrepo-com.svg";
import allTasksSvg from "./images/tasks-all-svgrepo-com.svg";
import todayTasksSvg from "./images/today-svgrepo-com.svg";
import addProjectSvg from "./images/plus-large-svgrepo-com.svg";

function createElementAndText(name, tag) {
  const element = document.createElement(tag);
  element.innerText = name;
  return element;
}

const body = document.querySelector("body");
body.innerHTML = `
	<div class="sidebar">
		<div class="user-container">
			<div id="pfp"></div>
			<div id="user">Archae</div>
		</div>
		<div class="add-task-button" role="button">
			<img src=${addTaskSvg}>
			<div>Add task</div>
		</div>
		<nav>
			<ul role="list" class="nav-list">
				<li role="button">
					<img src=${allTasksSvg}>
					<div>All Tasks</div>
				</li>
				<li role="button">
					<img src=${todayTasksSvg}>
					<div>Today</div>
				</li>
			</ul>
		</nav>
		<div class="projects-header">
			<h2>My Projects</h2>
			<img src=${addProjectSvg} role="button" class="add-project-button">
		</div>
		<ul role="list" class="project-list">
		</ul>
	</div>
	<main>
	</main>
	<dialog class="add-task-dialog">
		<div class="dialog-container">
			<form>
				<label for="title">Title: </label>
				<input id="title" type="text">
				<label for="description">Description: </label>
				<input id="description" type="text">
				<label for="dueDate">Due Date: </label>
				<input id="dueDate" type="date">
				<label for="priority">Priority</label>
				<select name="priority" id="priority">
					<option value="low">Low Priority</option>
					<option value="medium">Medium Priority</option>
					<option value="high">High Priority</option>
				</select>
				<label for="project-select">Project</label>
				<select id="project-select" name="project-select"></select>
			</form>
			<button class="cancel-dialog">Cancel</button>
		</div>
	</dialog>
	<dialog class="add-project-dialog">
		<div class="dialog-container">
			<form>
				<label>Project Name</label>
				<input type="text">
			</form>
			<button class="cancel-dialog">Cancel</button>
		</div>
	</dialog>
`;
const sidebar = document.querySelector(".sidebar");

const projectList = sidebar.querySelector(".project-list");
const projects = [];
function addProject(name) {
  projects.push(createProject(name));
  projectList.appendChild(createElementAndText(name, "li"));
	const projectSelect = body.querySelector("#project-select");
	projectSelect.innerHTML = "";
		for (let project of projects) {
  	projectSelect.appendChild(createElementAndText(project.name, "option"));
	}
}
function createProject(name) {
  const project = {
    name,
    tasks: [],
  };
  return project;
}


function bindDialogOpenClose(dialogClass, openButtonClass) {
  const dialog = body.querySelector(dialogClass);
  const openButton = body.querySelector(openButtonClass);
  openButton.addEventListener("click", () => {
    console.log("here");
    dialog.showModal();
  });
  const cancelDialog = dialog.querySelector(".cancel-dialog");
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog || e.target === cancelDialog) {
      dialog.close();
    }
  });
}

const addProjectButton = sidebar.querySelector(".add-project-button");
addProjectButton.addEventListener("click", () => {});

addProject("Default");
bindDialogOpenClose(".add-task-dialog", ".add-task-button");
bindDialogOpenClose(".add-project-dialog", ".add-project-button");
