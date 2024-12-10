import "./styles.css";
import Task from "./modules/Task";
import Project from "./modules/Project";
import addTaskSvg from "./images/plus-circle-svgrepo-com.svg";
import allTasksSvg from "./images/tasks-all-svgrepo-com.svg";
import todayTasksSvg from "./images/today-svgrepo-com.svg";
import addProjectSvg from "./images/plus-large-svgrepo-com.svg";
const Projects = {
  projects: [new Project("Default")],
};
Projects.activeProject = Projects.projects[0];

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
			<h1></h1>
		</div>
	</main>
	<dialog class="add-task-dialog">
		<div class="dialog-container">
			<form>
				<div>
					<label for="title">Title: </label>
					<input id="title" type="text" name="title">
				</div>
				<div>
					<label for="description">Description: </label>
					<input id="description" type="text" name="description">
				</div>
				<div>
					<label for="due-date">Due Date: </label>
					<input id="due-date" type="date" name="dueDate">
				</div>
				<div>
					<label for="priority">Priority</label>
					<select name="priority" id="priority">
						<option value="low">Low Priority</option>
						<option value="medium">Medium Priority</option>
						<option value="high">High Priority</option>
					</select>
				</div>
				<div>
					<label for="project-select">Project</label>
					<select id="project-select" name="project-select"></select>
				</div>
				<div class="dialog-bottom">
					<button type="submit">Add Task</button>
					<button class="cancel-dialog">Cancel</button>
				</div>
			</form>
		</div>
	</dialog>
	<dialog class="add-project-dialog">
		<div class="dialog-container">
			<form>
				<label>Project Name</label>
				<input type="text" name="projectName">
				<div class="dialog-bottom">
					<button type="submit">Create New Project</button>
					<button class="cancel-dialog">Cancel</button>
				</div>
			</form>
		</div>
	</dialog>
	<dialog class="task-dialog">
		<div class="dialog-container">
			<form>
				<div class="task-header">
					<p class="task-project"></p>
					<button class="cancel-dialog">X</button>
				</div>
				<div class="task-main">
					<input type="checkbox" name="completed" class="task-title" name="description">
					<input type="textbox" name="title" class="task-description"></input>
				</div>
				<div class="task-main">
					<h2 class="task-project">Description</h2>
					<input type="textarea" name="description" class="task-description" ></input>
				</div>
				<div class="task-sidebar">
					<h2 class="task-project">Project</h2>
					<select id="task-project-select" name="project">
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
				<div class="dialog-bottom">
					<button type="submit">Save</button>
					<button class="cancel-dialog">Cancel</button>
				</div>
			<form>
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
  CachedElements.projectHeader =
    CachedElements.tasksContainer.querySelector("h1");
  CachedElements.projectSelect =
    CachedElements.body.querySelector("#project-select");
  CachedElements.taskProjectSelect = CachedElements.body.querySelector(
    "#task-project-select",
  );
}
function bindEvents() {
  bindDialog(".add-task-dialog", ".add-task-button", addTaskSubmit);
  bindDialog(".add-project-dialog", ".add-project-button", addProjectSubmit);
  bindDialog(
    ".task-dialog",
    ".tasks-container",
    saveTaskSubmit,
    openTaskDialog,
  );
  CachedElements.projectList.addEventListener("click", (e) => {
    if (e.target.tagName == "LI") {
      Projects.activeProject = Projects.projects.find(
        (x) => x.getName() == e.target.innerText,
      );
      renderTasks();
    }
  });
}
function openTaskDialog(e, nameElements) {
  if (e.target.className == "task-container") {
    for (let element of nameElements) {
      element.value =
        Projects.activeProject.getTasks()[e.target.dataset.index][element.name];
    }
    return true;
  }
	return false;
}
export function bindDialog(
  dialogClass,
  openButtonClass,
  submitFunction,
  openFunction = () => true,
) {
  const dialog = CachedElements.body.querySelector(dialogClass);
  const openButton = CachedElements.body.querySelector(openButtonClass);

  const nameElements = dialog.querySelectorAll("[name]");
  openButton.addEventListener("click", (e) => {
    if (openFunction(e, nameElements)) {
      dialog.showModal();
    }
  });

  const cancelDialog = dialog.querySelector(".cancel-dialog");
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog || e.target === cancelDialog) {
      dialog.close();
    }
  });

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
  CachedElements.projectHeader.innerText = Projects.activeProject.getName();
  tasksContainer.appendChild(CachedElements.projectHeader);
  for (const [index, task] of Projects.activeProject.getTasks().entries()) {
    task.element.dataset.index = index;
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
        child.value = project.getName();
      } else if (element.tagName == "UL") {
        child = document.createElement("li");
      }
      child.innerText = project.getName();
      element.appendChild(child);
    }
  }
}
function addProjectSubmit(nameElements) {
  const args = Array.from(nameElements).map((e) => e.value);
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
function saveTaskSubmit() {}
initializeDOM();
cacheElements();
bindEvents();
renderTasks();
renderProjects();
