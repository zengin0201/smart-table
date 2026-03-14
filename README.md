# 📊 DataFlow Engine: High-Performance Vanilla JS Data Table

A modular, framework-agnostic data management system designed to handle large-scale datasets with professional-grade features: multi-criteria filtering, dynamic sorting, and optimized pagination.



## 🚀 Key Engineering Features

* **Modular Architecture:** The system is built on a "Plug-and-Play" logic. Sorting (`sort.js`), Comparison (`compare.js`), and UI logic are decoupled, making the codebase highly maintainable and scalable.
* **High-Volume Data Processing:** Optimized to handle thousands of records by implementing efficient filtering and search algorithms that minimize memory overhead.
* **State-Driven Rendering:** Features a centralized `render` cycle that synchronizes the UI with the application state (Search + Filter + Sort + Pagination) in a predictable, unidirectional flow.
* **Declarative Template System:** Uses HTML5 `<template>` tags and a custom `cloneTemplate` utility to dynamically generate the UI, keeping the DOM structure clean and readable.
* **Custom Comparison Engine:** Built a flexible rule-based comparison module (`compare.js`) that uses closures to create reusable validation logic for complex data types.

## 🛠️ Tech Stack & Patterns

* **Language:** Vanilla JavaScript (ES6+).
* **Concepts:** Functional Programming (Immutability), Closures, Higher-Order Functions.
* **Data Handling:** Array methods optimization (`filter`, `reduce`, `toSorted`).
* **UI/UX:** CSS Custom Properties, Responsive Table Layouts, BEM-like styling.

## 🧠 Technical Deep Dive

### 🏗️ Modular State Management
Instead of messy global variables, the app uses a `memoryState` object and a `collectState` function to gather inputs from the UI via `FormData`. This approach mimics modern state-management libraries but with zero dependencies.

### ⚡ Performance-First Sorting
The sorting logic (`sort.js`) utilizes the modern `toSorted()` method to ensure **data immutability**. This prevents side effects and allows for easy "reset to original" functionality.

### 🔍 Scalable Filtering
The filtering system supports:
* Global text search.
* Dynamic range/category filtering.
* Smart pagination that adjusts "Showing X to Y of Z entries" labels in real-time.

## 🚀 How to Run

1. Clone the repo.
2. Open `index.html` via a Local Server (e.g., Live Server in VS Code).
3. The app will automatically initialize with the provided datasets from `data.js`.

---
*Developed as a deep-dive into JavaScript systems architecture and performance optimization.*
