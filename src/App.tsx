import React from 'react'
import './App.css'
import { AuthProvider } from './auth'
import { Router } from './navigation'
import { IntlProvider } from 'react-intl'

function App() {
    return (
        <AuthProvider>
            <IntlProvider locale="en">
                <Router />
            </IntlProvider>
        </AuthProvider>
    )
}

export default App
