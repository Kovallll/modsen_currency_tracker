import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './components/App'
import ThemeProvider from './providers/ThemeProvider/ThemeProvier'

import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </React.StrictMode>
)
