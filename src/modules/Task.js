export default class Task {
  constructor(title, description, dueDate, priority, project) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate;
    this.project = project;
    this.completed = false;
    this.element = this.createTaskElement();
  }
  createTaskElement() {
    const taskElement = document.createElement("div");
    taskElement.className = "task-container";
    taskElement.innerHTML = `
                <input type="checkbox" id="${this.title}>
                <label for="${this.title}">${this.title}</label>
        `;
    return taskElement;
  }
}
