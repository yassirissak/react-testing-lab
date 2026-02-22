# React Testing Lab (Vitest)

A small banking transactions app built with React and tested with Vitest + React Testing Library.

## Features
- Display transactions from the backend on app startup.
- Add new transactions from the form.
- Search transactions by description or category.
- Sort visible transactions by description or category.

## Tech Stack
- React
- Vite
- Vitest
- React Testing Library
- json-server

## Getting Started
1. Install dependencies:
```bash
npm install
```
2. Start the frontend:
```bash
npm run dev
```
3. Start the backend in a separate terminal:
```bash
npm run server
```

Backend runs at `http://localhost:6001`.

## Running Tests
Run all tests once:
```bash
npm test -- --run
```

## Test Suites
- `src/__tests__/test_suites/DisplayTransactions.test.jsx`
  - verifies transactions are rendered on startup.
- `src/__tests__/test_suites/AddTransactions.test.jsx`
  - verifies new transactions are added to UI.
  - verifies POST request is called with expected payload.
- `src/__tests__/test_suites/SearchSort.test.jsx`
  - verifies search input change updates visible rows.
  - verifies sort selection updates displayed order.

## Project Notes
- Search and sort are handled in `src/components/AccountContainer.jsx`.
- Tests mock `fetch` so they run without needing the backend process.
