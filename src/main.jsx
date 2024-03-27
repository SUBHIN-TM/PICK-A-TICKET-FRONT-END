import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import HomePage from './components/HomePage.jsx'
import appStore from './redux/appStore.js'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={appStore}>
    <HomePage />
    </Provider>
  </React.StrictMode>,
)
