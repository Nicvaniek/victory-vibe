import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const setRootHeight = () => {
    const rootElement = document.getElementById('root')

    if (rootElement) {
        rootElement.style.height = `${window.innerHeight}px`
    }
}

// Call setRootHeight when the app starts and when the window is resized
setRootHeight()
window.addEventListener('resize', setRootHeight)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
