import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import { store, persistor } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react';
import { createRoot } from 'react-dom/client';
import React from 'react';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
