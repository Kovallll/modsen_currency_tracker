import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import ErrorBoundary from './components/ErrorBoundary'
import { AssetsProvider } from './providers/AssetsProvider'
import ThemeProvider from './providers/ThemeProvider'
import { router } from './routes'

import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <>
        <ErrorBoundary>
            <ThemeProvider>
                <AssetsProvider>
                    <RouterProvider router={router} />
                </AssetsProvider>
            </ThemeProvider>
        </ErrorBoundary>
    </>
)
