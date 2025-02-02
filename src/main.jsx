import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Redux
import { Provider } from 'react-redux'
import { store } from './store.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="mainContainer">
        <App />
      </div>
    </Provider>
  </React.StrictMode>,
)


