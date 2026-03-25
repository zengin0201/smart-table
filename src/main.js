import './fonts/ys-display/fonts.css'
import './style.css'
import { initData } from "./data.js";
import { processFormData } from "./lib/utils.js";
import { initTable } from "./components/table.js";
import { initSearching } from "./components/searching.js";
import { initSorting } from "./components/sorting.js";
import { initFiltering } from "./components/filtering.js";
import { initPagination } from "./components/pagination.js";

const api = initData();

const memoryState = { page: 1, sort: null, order: null };

function collectState() {
    const state = processFormData(new FormData(sampleTable.container));
    return { ...state };
}

async function render(action) {
    let state = { ...memoryState, ...collectState() };
    let query = {};

    query = applySearching(query, state, action);
    query = applyFiltering(query, state, action);
    query = applySorting(query, state, action);
    query = applyPagination(query, state, action);

    memoryState.page = state.page;
    memoryState.sort = state.sort;
    memoryState.order = state.order;

    const { total, items } = await api.getRecords(query);

    updatePagination(total, query);
    sampleTable.render(items);
}

const sampleTable = initTable({
    tableTemplate: 'table',
    rowTemplate: 'row',
    before: ["search", "header", "filter"],
    after: ["pagination"]
}, render);

const applySearching = initSearching();
const { applyFiltering, updateIndexes } = initFiltering(sampleTable.filter.elements);
const applySorting = initSorting(sampleTable.header.elements);
const { applyPagination, updatePagination } = initPagination(sampleTable.pagination.elements);

const appRoot = document.querySelector('#app');
appRoot.appendChild(sampleTable.container);

async function init() {
    const indexes = await api.getIndexes();
    updateIndexes(sampleTable.filter.elements, {
        searchBySeller: indexes.sellers
    });
}

init().then(render);
