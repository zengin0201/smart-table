export function initSorting(headers) {
    return (query, state, action) => {
        let field = state.sort;
        let order = state.order || 'none';

        if (action && action.name === 'sort') {
            field = action.dataset.field;
            order = (state.sort === field && state.order === 'asc') ? 'desc' : 'asc';
        }

        Object.values(headers).forEach(btn => {
            if (btn.dataset && btn.dataset.field) {
                btn.dataset.value = (btn.dataset.field === field) ? order : 'none';
            }
        });

        const sort = (field && order !== 'none') ? `${field}:${order}` : null;

        return sort ? Object.assign({}, query, { sort }) : query;
    };
}
