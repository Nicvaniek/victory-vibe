import React from 'react'
import './App.css'
import { AuthProvider } from './domain/auth'
import { Router } from './domain/navigation'

function App() {
    return (
        <AuthProvider>
            <Router />
        </AuthProvider>
    )
}

export default App
