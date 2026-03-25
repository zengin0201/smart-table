import { getPages } from "../lib/utils.js";

export function initPagination(elements) {
    let pageCount = 1;

    const applyPagination = (query, state, action) => {
        const limit = Number(state.rowsPerPage) || 10;
        let page = Number(state.page) || 1;

        if (action) {
            if (action.name === 'page') page = Number(action.value);
            if (action.name === 'prev') page = Math.max(1, page - 1);
            if (action.name === 'next') page = Math.min(pageCount, page + 1);
            if (action.name === 'first') page = 1;
            if (action.name === 'last') page = pageCount;
        }

        return Object.assign({}, query, {
            limit,
            page
        });
    };

    const updatePagination = (total, { page, limit }) => {
        pageCount = Math.ceil(total / limit) || 1;
        const currentPage = Math.min(page, pageCount);

        if (elements.totalRows) elements.totalRows.textContent = total;
        if (elements.fromRow) elements.fromRow.textContent = total > 0 ? (currentPage - 1) * limit + 1 : 0;
        if (elements.toRow) elements.toRow.textContent = Math.min(currentPage * limit, total);

        if (elements.pages) {
            elements.pages.innerHTML = '';
            getPages(currentPage, pageCount, 5).forEach(p => {
                const label = document.createElement('label');
                label.className = 'pagination-button';
                if (p === currentPage) label.classList.add('active');
                
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = 'page';
                input.value = p;
                if (p === currentPage) input.checked = true;
                
                const span = document.createElement('span');
                span.textContent = p;
                
                label.append(input, span);
                elements.pages.appendChild(label);
            });
        }

        return { page: currentPage, maxPage: pageCount };
    };

    return {
        updatePagination,
        applyPagination
    };
}
