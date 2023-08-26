import React from 'react'
import './App.css'
import { AuthProvider } from './auth'
import { Router } from './navigation'

function App() {
    return (
        <AuthProvider>
            <Router />
        </AuthProvider>
    )
}

export default App
