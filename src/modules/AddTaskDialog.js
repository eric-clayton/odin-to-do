import HtmlTool from "../utility/HtmlTool";

export default function createTaskDialog() {
  const html = `
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
                <select name="">
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
            </form>
            <button id="cancel-add-task">Cancel</button>
					</div>
        </dialog>
    `;
  const dialog = HtmlTool.createElementFromHtml(html);
  bindCancelAddTask();
  return dialog;
  function bindCancelAddTask() {
    const cancelButton = dialog.querySelector("#cancel-add-task");
    cancelButton.addEventListener("click", () => {
      dialog.close();
    });
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) {
        dialog.close();
      }
    });
  }
}
