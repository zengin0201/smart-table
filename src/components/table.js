import {cloneTemplate} from "../lib/utils.js";

export function initTable(settings, onAction) {
    const {tableTemplate, rowTemplate, before, after} = settings;
    const root = cloneTemplate(tableTemplate);
    
    [...before].reverse().forEach(key => {
        root[key] = cloneTemplate(key);
        root.container.prepend(root[key].container);
    });

    after.forEach(key => {
        root[key] = cloneTemplate(key);
        root.container.append(root[key].container);
    });

    root.container.addEventListener("change", () => onAction());
    root.container.addEventListener("reset", () => {
        setTimeout(() => onAction(), 0);
    });
    root.container.addEventListener("submit", (e) => {
        e.preventDefault();
        onAction(e.submitter);
    });

    const render = (data) => {
        const nextRows = data.map(item => {
            const row = cloneTemplate(rowTemplate);
            Object.keys(item).forEach(key => {
                if (row.elements[key]) {
                    row.elements[key].textContent = item[key];
                }
            });
            return row.container;
        });
        
        root.elements.body.innerHTML = '';
        root.elements.body.append(...nextRows);
    };

    return { ...root, render };
}
