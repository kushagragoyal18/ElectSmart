import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './pages/App.jsx';
import { VoterProfileProvider } from './context/VoterProfileContext.jsx';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <VoterProfileProvider>
      <App />
    </VoterProfileProvider>
  </React.StrictMode>,
);
