export default class HtmlTool {
    static createElementFromHtml(html) {
        try {
            const template = document.createElement('template');
            template.innerHTML = html.trim();;
            if(template) {
                return template.content.firstElementChild;
            }
            else {
                throw `element template html is invalid`;
            }
        }
        catch(e) {
            console.error(e);
        }
    }
}