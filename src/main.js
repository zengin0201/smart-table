import './style.css';
import { initData } from "./data.js";
import { processFormData } from "./lib/utils.js";
import { initTable } from "./components/table.js";
import { initSearching } from "./components/searching.js";
import { initSorting } from "./components/sorting.js";
import { initFiltering } from "./components/filtering.js";
import { initPagination } from "./components/pagination.js";

const api = initData();

const sampleTable = initTable({
    tableTemplate: 'table',
    rowTemplate: 'row',
    before: ["search", "header", "filter"],
    after: ["pagination"]
}, render);

const applySearching = initSearching('search');
const applySorting = initSorting(sampleTable.header.elements);
const { applyFiltering, updateIndexes } = initFiltering(sampleTable.filter.elements);
const { applyPagination, updatePagination } = initPagination(sampleTable.pagination.elements);

document.querySelector('#app').appendChild(sampleTable.container);

function collectState() {
    return processFormData(new FormData(sampleTable.container));
}

async function render(action) {
    const state = collectState();
    let query = {};

    query = applySearching(query, state, action);
    query = applyFiltering(query, state, action);
    query = applySorting(query, state, action);
    query = applyPagination(query, state, action);

    const { total, items } = await api.getRecords(query);

    updatePagination(total, query);
    sampleTable.render(items);
}

async function init() {
    const indexes = await api.getIndexes();
    
    updateIndexes(sampleTable.filter.elements, {
        searchBySeller: indexes.sellers
    });
    
    await render();
}

init();
