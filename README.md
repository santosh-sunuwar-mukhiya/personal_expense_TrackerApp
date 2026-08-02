# Personal Expense App

A simple React expense tracker app built with Vite, React Router, Tailwind CSS, and icon libraries.

## What is used in this project

- React 19
- Vite for development and build tooling
- React Router DOM for page routing
- Tailwind CSS for styling
- Lucide React and React Icons for icon components
- ESLint for linting

## Project structure

- `src/App.jsx` - application routes
- `src/pages/Login.jsx` - login page
- `src/pages/Dashboard.jsx` - main dashboard page
- `src/components/ExpenseForm.jsx` - expense entry form
- `src/components/ExpenseTable.jsx` - expense listing table
- `src/components/Cards.jsx` - summary cards
- `src/index.css` - global styles
- `src/main.jsx` - app bootstrap

## Setup and run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

## Available scripts

- `npm run dev` - start Vite development server
- `npm run build` - build production files
- `npm run lint` - run ESLint checks
- `npm run preview` - preview the production build

## Notes

This app includes a login route and a dashboard route, with client-side navigation implemented using React Router.
