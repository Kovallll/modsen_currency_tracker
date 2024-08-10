import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom'

import { Paths } from './constants'
import BankCard from './pages/BankCard'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Root from './pages/Root'
import Timeline from './pages/Timeline'

const routes = [
    { path: Paths.Home, element: <Home /> },
    { path: Paths.Timeline, element: <Timeline /> },
    { path: Paths.BankCard, element: <BankCard /> },
    { path: Paths.NotFound, element: <NotFound /> },
]

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path={Paths.Home} element={<Root />}>
            {routes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
            ))}
        </Route>
    )
)
