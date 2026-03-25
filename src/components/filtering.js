export function initFiltering(elements) {
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            if (elements[elementName]) {
                elements[elementName].innerHTML = '<option value="">—</option>';
                elements[elementName].append(...Object.entries(indexes[elementName]).map(([id, name]) => {
                    const el = document.createElement('option');
                    el.textContent = name;
                    el.value = id;
                    return el;
                }));
            }
        });
    };

    const applyFiltering = (query, state, action) => {
        if (action && action.name === 'clear') {
            const fieldName = action.dataset.field;
            const inputNames = {
                'date': 'searchByDate',
                'customer': 'searchByCustomer'
            };
            const targetName = inputNames[fieldName];
            if (elements[targetName]) {
                elements[targetName].value = '';
                state[targetName] = '';
            }
        }

        const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                const element = elements[key];
                if ((element.tagName === 'INPUT' || element.tagName === 'SELECT') && element.value) {
                    filter[`filter[${element.name}]`] = element.value;
                }
            }
        });

        return Object.keys(filter).length ? Object.assign({}, query, filter) : query;
    };

    return {
        updateIndexes,
        applyFiltering
    };
}
