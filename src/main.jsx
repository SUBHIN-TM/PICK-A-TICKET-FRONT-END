import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import HomePage from './components/HomePage.jsx'
import appStore from './redux/appStore.js'
import Layout from './components/Layout.jsx'
import TicketGenerator from './components/TicketGenerator.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Booking from './components/Booking.jsx'
import './App.css'


ReactDOM.createRoot(document.getElementById('root')).render(

    <Provider store={appStore}>
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/booking" element={<Booking />} />
                <Route path='/ticketGenerator' element={<Layout />}>
                    <Route path="" element={<TicketGenerator />} />
                </Route>
            </Routes>
        </Router>
    </Provider>
)
