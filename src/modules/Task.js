export default class Task {
  constructor(
    title,
    description,
    dueDate,
    priority,
    notes,
    checkList,
    project,
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checkList = checkList;
    this.project = project;
  }
  
}
