import { cloneTemplate } from "../lib/utils.js";

export function initTable(settings, onAction) {
    const { tableTemplate, rowTemplate, before, after } = settings;
    const root = cloneTemplate(tableTemplate);
    
    [...before].reverse().forEach(key => {
        root[key] = cloneTemplate(key);
        root.container.prepend(root[key].container);
    });

    after.forEach(key => {
        root[key] = cloneTemplate(key);
        root.container.append(root[key].container);
    });

    root.container.addEventListener("submit", (e) => {
        e.preventDefault();
        onAction(e.submitter);
    });

    root.container.addEventListener("reset", (e) => {
        e.preventDefault();
        const form = e.target.closest('form');
        form.reset();
        onAction(null);
    });

    root.container.addEventListener("change", (e) => {
        if (e.target.name === 'rowsPerPage' || e.target.name === 'page' || e.target.name === 'seller') {
            onAction(e.target);
        }
    });

    const render = (data) => {
        if (root.elements.rows) {
            root.elements.rows.innerHTML = '';
            const rows = data.map(item => {
                const row = cloneTemplate(rowTemplate);
                Object.keys(item).forEach(key => {
                    if (row.elements[key]) row.elements[key].textContent = item[key];
                });
                return row.container;
            });
            root.elements.rows.append(...rows);
        }
    };

    return { ...root, render };
}
