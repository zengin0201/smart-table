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

const {data, ...indexes} = initData(sourceData);


const memoryState = { page: 1, sort: null, order: null };

function collectState() {
    const state = processFormData(new FormData(sampleTable.container));
    return { ...state };
}

function render(action) {
    let state = { ...memoryState, ...collectState() }; 
    let result = [...data]; 
    result = runSearch(result, state, action);
    result = runFilter(result, state, action);
    result = runSort(result, state, action);
    result = runPages(result, state, action);
    memoryState.page = state.page;
    memoryState.sort = state.sort;
    memoryState.order = state.order;

    sampleTable.render(result);
}


const sampleTable = initTable({
    tableTemplate: 'table',
    rowTemplate: 'row',
    before: ["search", "header", "filter"],
    after: ["pagination"]
}, render);


const runSearch = initSearching();
const runFilter = initFiltering(sampleTable.filter.elements, indexes);
const runSort = initSorting(sampleTable.header.elements);
const runPages = initPagination(sampleTable.pagination.elements);

const appRoot = document.querySelector('#app');
appRoot.appendChild(sampleTable.container);


render();
