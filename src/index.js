import "./styles.css";
import Task from "./modules/Task";
import Project from "./modules/Project";
import addTaskSvg from "./images/plus-circle-svgrepo-com.svg";
import allTasksSvg from "./images/tasks-all-svgrepo-com.svg";
import todayTasksSvg from "./images/today-svgrepo-com.svg";
import addProjectSvg from "./images/plus-large-svgrepo-com.svg";
const Projects = {
  projects: [],
};
const CachedElements = {
  body: document.querySelector("body"),
};
function initializeDOM() {
  CachedElements.body.innerHTML = `
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
		<div class='tasks-container'>
		</div>
	</main>
	<dialog class="add-task-dialog">
		<div class="dialog-container">
			<form>
				<label for="title">Title: </label>
				<input id="title" type="text" name="title">
				<label for="description">Description: </label>
				<input id="description" type="text" name="description">
				<label for="due-date">Due Date: </label>
				<input id="due-date" type="date" name="dueDate">
				<label for="priority">Priority</label>
				<select name="priority" id="priority">
					<option value="low">Low Priority</option>
					<option value="medium">Medium Priority</option>
					<option value="high">High Priority</option>
				</select>
				<label for="project-select">Project</label>
				<select id="project-select" name="project-select"></select>
				<button type="submit">Add Task</button>
			</form>
			<button class="cancel-dialog">Cancel</button>
		</div>
	</dialog>
	<dialog class="add-project-dialog">
		<div class="dialog-container">
			<form>
				<label>Project Name</label>
				<input type="text" name="projectName">
				<button type="submit">Create New Project</button>
			</form>
			<button class="cancel-dialog">Cancel</button>
		</div>
	</dialog>
	<dialog class="task-dialog">
		<div class="dialog-container">
			<div class="task-header">
				<p class="task-project"></p>
				<button class="cancel-dialog">X</button>
			</div>
			<div class="task-main">
				<input type="checkbox" class="task-title">
				<p class="task-description"></p>
			</div>
			<div class="task-sidebar">
				<h2 class="task-project">Project</h2>
				<select id="task-project-select" name="project-select">
				</select>
				<h2 class="task-due-date">Due Date</h2>
				<input id="task-due-date" type="date" name="dueDate">
				<h2 class="task-priority">Priority</h2>
				<select name="priority" id="task-priority">
					<option value="low">Low Priority</option>
					<option value="medium">Medium Priority</option>
					<option value="high">High Priority</option>
				</select>
			</div>
		</div>
	</dialog>
`;
}
function cacheElements() {
  CachedElements.sidebar = CachedElements.body.querySelector(".sidebar");
  CachedElements.main = CachedElements.body.querySelector("main");
  CachedElements.projectList =
    CachedElements.sidebar.querySelector(".project-list");
  CachedElements.tasksContainer =
    CachedElements.main.querySelector(".tasks-container");
  CachedElements.projectSelect =
    CachedElements.body.querySelector("#project-select");
  CachedElements.taskProjectSelect = CachedElements.body.querySelector(
    "#task-project-select",
  );
}
function bindEvents() {
  bindDialog(".add-task-dialog", ".add-task-button", addTaskSubmit);
  bindDialog(".add-project-dialog", ".add-project-button", addProjectSubmit);
}

export function bindDialog(dialogClass, openButtonClass, submitFunction) {
  const dialog = CachedElements.body.querySelector(dialogClass);
  const openButton = CachedElements.body.querySelector(openButtonClass);
  openButton.addEventListener("click", () => {
    dialog.showModal();
  });
  const cancelDialog = dialog.querySelector(".cancel-dialog");
  dialog.addEventListener("click", (e) => {
    console.log(e.target);
    if (e.target === dialog || e.target === cancelDialog) {
      dialog.close();
    }
  });
  const nameElements = dialog.querySelectorAll("[name]");

  const submitButton = dialog.querySelector('[type="submit"]');
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    submitFunction(nameElements);
    dialog.close();
  });
}
function renderTasks() {
  const tasksContainer = CachedElements.tasksContainer;
  tasksContainer.innerHTML = "";
  for (let task of Projects.activeProject.getTasks()) {
    tasksContainer.appendChild(task.element);
  }
}
function renderProjects() {
  const dependentElements = [
    CachedElements.taskProjectSelect,
    CachedElements.projectSelect,
    CachedElements.projectList,
  ];
  for (let element of dependentElements) {
    element.innerHTML = "";
    for (let project of Projects.projects) {
      let child;
      if (element.tagName == "SELECT") {
        child = document.createElement("option");
      } else if (element.tagName == "UL") {
        child = document.createElement("li");
      }
      child.innerText = project.getName();
      element.appendChild(child);
    }
  }
}
function addProjectSubmit(nameElements) {
  const args = Array.from(nameElements)
    .map((e) => e.value)
    .filter((e) => e.name != "project-select");
  Projects.projects.push(new Project(...args));
  renderProjects();
}
function addTaskSubmit(nameElements) {
  const args = Array.from(nameElements)
    .map((e) => e.value)
    .filter((e) => e.name != "project-select");
  Projects.activeProject.addTask(new Task(...args, Projects.activeProject));
  renderTasks();
}
initializeDOM();
cacheElements();
bindEvents();
Projects.projects.push(new Project("Default"));
Projects.activeProject = Projects.projects[0];
renderProjects();
