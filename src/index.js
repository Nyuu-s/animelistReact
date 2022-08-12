import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css'
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';
import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion license key
registerLicense('ORg4AjUWIQA/Gnt2VVhiQlFadVlJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRdkJiXH5ZdXJUQ2JUV0U=');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  
  <ContextProvider>
    <React.StrictMode>


      <App />
    </React.StrictMode>
  </ContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

