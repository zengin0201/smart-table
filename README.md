# 📊 SmartTable — Vanilla JS Data Management System

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Glossary/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

A high-performance, modular data table application built with **Pure JavaScript**. This project focuses on efficient DOM manipulation using HTML Templates and a robust state-driven rendering engine.

---

## 📸 Preview
<img width="1663" height="1245" alt="image" src="https://github.com/user-attachments/assets/e3756059-532a-4225-8809-7ce667634658" />



## 🚀 Key Features

* **⚡ Reactive Rendering**: Data-driven UI updates using a custom `render` loop.
* **🔍 Multi-layer Filtering**: Combined searching, dropdown filtering, and sorting that syncs perfectly with the API.
* **📑 Advanced Pagination**: Dynamic page calculation with "First/Last" navigation and configurable rows-per-page.
* **🏗 Modular Architecture**: Separate logic for sorting, searching, and filtering, making the codebase easy to scale.
* **💾 Template System**: High-performance row rendering using `<template>` tags to avoid unnecessary DOM thrashing.
* **🌐 REST API Integration**: Asynchronous data fetching with `Promise.all` for index synchronization (Sellers/Customers).

---

## 🛠 Tech Stack & Patterns

* **Architecture**: Functional Modular Pattern (init-based components).
* **Data Handling**: `async/await` with `URLSearchParams` for complex query building.
* **DOM API**: Extensive use of `cloneTemplate`, `FormData`, and Event Delegation.
* **State Management**: Centralized `memoryState` object to track UI changes across different components.

---

## 📁 Project Structure Deep Dive

* **`main.js`**: The Orchestrator. Manages the lifecycle of the app and coordinates between the API and UI components.
* **`data.js`**: Data Layer. Handles API requests, record mapping, and caching of indexes (Sellers/Customers).
* **`table.js`**: The UI Engine. Responsibly clones templates and manages "before/after" component slots.
* **`filtering.js` / `sorting.js` / `pagination.js`**: Independent logic modules that transform the state into API-ready queries.

---

## ⚙️ How It Works

The app uses a **"Pipeline Pattern"** for data fetching:
1.  **Collect**: Grabs raw data from the `FormData`.
2.  **Transform**: Passes the state through "Apply" functions (`applySearching`, `applyFiltering`, etc.).
3.  **Fetch**: Requests data from the server using the generated query string.
4.  **Render**: Updates the DOM efficiently using predefined HTML templates.

---

## 🔧 Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/zengin0201/smart-table.git](https://github.com/zengin0201/smart-table.git)
    ```
2.  **npm install**
3.  **npm audit fix**
4.  **npm run dev**

---

## 👨‍💻 Technical Skills Demonstrated
* Working with complex asynchronous flows.
* Deep understanding of the DOM and browser events.
* Writing clean, reusable, and decoupled JavaScript modules.
* Implementing UX patterns (pagination, sorting) from scratch without libraries.

---
*Created with focus on performance and architectural clarity.*
