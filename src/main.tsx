import { createRoot } from 'react-dom/client'
import 'leaflet/dist/leaflet.css';
import './index.css'
import App from './App.tsx'
import './styels/global.css';
import { store } from './app/store.ts';
import { Provider } from 'react-redux';
// import { StrictMode } from 'react';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </StrictMode>,
)
