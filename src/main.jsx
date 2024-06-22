// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import CryptoContext from './CryptoContext';
import {Provider} from "react-redux"
import { store } from './state/store';


ReactDOM.createRoot(document.getElementById('root')).render(

  <CryptoContext>
      <Provider store={store}>
    <App />
    </Provider>
  </CryptoContext>
 
);
