import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import App from './App';

// Wait for DOM — createRoot needs the #root element to already exist in the HTML.
// react-scripts places this script at the bottom of <body> so #root is always ready,
// but this guard prevents the "Target container is not a DOM element" error entirely.
const container = document.getElementById('root');

if (!container) {
  throw new Error(
    'Could not find #root in index.html. ' +
    'Make sure public/index.html contains <div id="root"></div>.'
  );
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);