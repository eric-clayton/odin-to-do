export default class Project {
    constructor(name, tasks = []) {
        this.name = name;
        this.tasks = tasks;
    }
    getTasks() {
        return this.tasks;
    }
    getName() {
        return this.name;
    }
    addTask(task) {
        this.tasks.push(task);
    }
    removeTask(index) {
        this.tasks.splice(index, 1);
    }
    editName(newName) {
        this.name = newName;
    }
    
}