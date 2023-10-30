import Providers from 'Providers';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'styles/index.scss';
import 'tailwindcss/tailwind.css';

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
  document.getElementById('root'),
);
