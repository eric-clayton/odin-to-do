import HtmlTool from "../utility/HtmlTool";
import addTaskSvg from "../images/plus-circle-svgrepo-com.svg";
import allTasksSvg from "../images/tasks-all-svgrepo-com.svg";
import todayTasksSvg from "../images/today-svgrepo-com.svg";
import addProjectSvg from "../images/plus-large-svgrepo-com.svg";
import createTaskDialog from "./AddTaskDialog";

export default function createSidebar() {
  const html = `
    <div class="sidebar">
    </div>
  `;
  const sidebar = HtmlTool.createElementFromHtml(html);
  const elements = {
    taskDialog: createTaskDialog(),
    userContainer: createUserContainer(),
    addTask: createAddTask(),
    sidebarNav: createSidebarNav(),
    myProjects: createMyProjects(),
  };
  for (const element of Object.values(elements)) {
    sidebar.appendChild(element);
  }
  bindAddTask();
  return sidebar;
  function bindAddTask() {
    elements.addTask.addEventListener('click', (e) => {
      e.stopPropagation();
      elements.taskDialog.showModal();
    })
  }
}
function createUserContainer() {
  const html = `
    <div class="user-container">
      <div id="pfp"></div>
      <div id="user">Archae</div>
    </div>
  `;
  return HtmlTool.createElementFromHtml(html);
}
function createAddTask() {
  const html = `
    <div class="add-task" role="button">
      <img src=${addTaskSvg}>
      <div>Add task</div>
    </div>
  `;
  return HtmlTool.createElementFromHtml(html);
}
function createSidebarNav() {
  const html = `<nav>
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
  </nav>`;
  const sidebarNav = HtmlTool.createElementFromHtml(html);
  return sidebarNav;
}
function createMyProjects() {
  const html = `
      <div class="projects-header">
        <h2>My Projects</h2>
        <img src=${addProjectSvg} role="button">
      </div>
  `;
  const myProjects = HtmlTool.createElementFromHtml(html);
  return myProjects;
}