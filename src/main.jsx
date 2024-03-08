import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
      <Provider store={store}>
      <App />
      </Provider>
        
      </BrowserRouter>
      <ToastContainer />
  </React.StrictMode>,
  document.getElementById('root')
);
