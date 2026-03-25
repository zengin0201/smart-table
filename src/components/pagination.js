import { getPages } from "../lib/utils.js";

export function initPagination(elements) {
    const applyPagination = (state, action) => {
        if (!state.page) state.page = 1;
        const limit = Number(state.rowsPerPage) || 10;

        if (action && action.name) {
            if (action.name === 'first') state.page = 1;
            if (action.name === 'prev' && state.page > 1) state.page -= 1;
            if (action.name === 'next' && state.page < state.maxPage) state.page += 1;
            if (action.name === 'last') state.page = state.maxPage;
            if (action.name === 'page') state.page = Number(action.value);
        }

        return {
            page: state.page,
            limit: limit
        };
    };

    const updatePagination = (total, state) => {
        const limit = Number(state.rowsPerPage) || 10;
        const maxPage = Math.ceil(total / limit) || 1;
        state.maxPage = maxPage;

        if (state.page > maxPage) state.page = maxPage;

        const from = (state.page - 1) * limit + 1;
        const to = Math.min(state.page * limit, total);

        if (elements.fromRow) elements.fromRow.textContent = total === 0 ? 0 : from;
        if (elements.toRow) elements.toRow.textContent = to;
        if (elements.totalRows) elements.totalRows.textContent = total;

        if (elements.pages) {
            const container = elements.pages;
            container.innerHTML = ''; 
            const pagesArray = getPages(state.page, maxPage, 5); 
            
            pagesArray.forEach(pageNum => {
                const label = document.createElement('label');
                label.className = 'pagination-button';
                if (pageNum === state.page) label.classList.add('active'); 
                
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = 'page';
                input.value = pageNum;
                input.style.display = 'none'; 
                if (pageNum === state.page) input.checked = true;
                
                const span = document.createElement('span');
                span.textContent = pageNum;
                
                label.appendChild(input);
                label.appendChild(span);
                container.appendChild(label);
            });
        }
    };

    return { applyPagination, updatePagination };
}
