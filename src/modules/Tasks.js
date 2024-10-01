import Task from "./Task";
export default class Tasks {
  static #allTasks = [];
  static addTask(
    title,
    description,
    dueDate,
    priority,
    notes,
    checkList,
    project,
  ) {
    this.#allTasks.push(
      new Task(
        title,
        description,
        dueDate,
        priority,
        notes,
        checkList,
        project,
      ),
    );
  }

}
