
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Make React available globally for components that might use it
window.React = React;

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

// Using ReactDOM.createRoot for React 18 compatibility
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
