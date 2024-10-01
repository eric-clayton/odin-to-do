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
        <div class="add-task" role="button">
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
    <dialog>
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
                <select id="project-select" name="project-select">
                </select>
            </form>
            <button class="cancel-add-task">Cancel</button>
        </div>
    </dialog>
`;
const sidebar = document.querySelector('.sidebar');
const dialog = body.querySelector('dialog');

const projectList = sidebar.querySelector('.project-list');
const projects = [];
function addProject(name) {
    projects.push(createProject(name));
    projectList.appendChild(createElementAndText(name, 'li'));
}
function createProject(name) {
    const project = {
        name,
        tasks: [],
    }
    return project;
}
addProject('Default');

const addTaskButton = sidebar.querySelector(".add-task");
addTaskButton.addEventListener("click", () => {
  dialog.showModal();
});
const cancelAddTask = dialog.querySelector(".cancel-add-task");
dialog.addEventListener("click", (e) => {
  if (e.target === dialog || e.target === cancelAddTask) {
    dialog.close();
  }
});

const projectSelect = dialog.querySelector('#project-select');
projectSelect.innerHTML = '';
for (let project of projects) {

    projectSelect.appendChild(createElementAndText(project.name, 'option'));
}

const addProjectButton = sidebar.querySelector('.add-project-button');


