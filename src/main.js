import './fonts/ys-display/fonts.css'
import './style.css'
import {data as sourceData} from "./data/dataset_1.js";
import {initData} from "./data.js";
import {processFormData} from "./lib/utils.js";
import {initTable} from "./components/table.js";
import {initSearching} from "./components/searching.js";
import {initSorting} from "./components/sorting.js";
import {initFiltering} from "./components/filtering.js";
import {initPagination} from "./components/pagination.js";

const api = initData(sourceData);
const memoryState = { page: 1, sort: null, order: null };
let runFilter;

function collectState() {
    return processFormData(new FormData(sampleTable.container));
}

async function render(action) {
    let state = { ...memoryState, ...collectState() }; 
    
    const pg = runPages.applyPagination(state, action);
    
    let query = {
        page: pg.page,
        limit: state.rowsPerPage || 10,
        search: state.search,
        sort: state.sort,
        order: state.order,
        seller: state.seller,
        customer: state.customer,
        date: state.date,
        totalFrom: state.totalFrom,
        totalTo: state.totalTo
    };

    const { total, items } = await api.getRecords(query);
    
    runPages.updatePagination(total, state);
    runSort(state, action);

    memoryState.page = state.page;
    memoryState.sort = state.sort;
    memoryState.order = state.order;

    sampleTable.render(items);
}

const sampleTable = initTable({
    tableTemplate: 'table',
    rowTemplate: 'row',
    before: ["search", "header", "filter"],
    after: ["pagination"]
}, render);

const runSearch = initSearching();
const runSort = initSorting(sampleTable.header.elements);
const runPages = initPagination(sampleTable.pagination.elements);

const appRoot = document.querySelector('#app');
appRoot.appendChild(sampleTable.container);

async function init() {
    const indexes = await api.getIndexes();
    runFilter = initFiltering(sampleTable.filter.elements, indexes);
    await render();
}

init();
