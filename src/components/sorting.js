export function initSorting(zagolovkiKolonok) {
    return (state, action) => {
        if (action && action.name === 'sort') {
            const field = action.dataset.field;

            if (state.sort === field) {
                state.order = state.order === "asc" ? "desc" : "asc";
            } else {
                state.sort = field;
                state.order = "asc";
            }
        }

        Object.keys(zagolovkiKolonok).forEach(key => {
            const btn = zagolovkiKolonok[key];
            if (btn) {
                btn.dataset.value = (btn.dataset.field === state.sort) ? state.order : "none";
            }
        });
    }
}
