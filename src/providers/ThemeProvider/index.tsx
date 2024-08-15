import { createContext, useEffect, useState } from 'react'

interface ThemeContext {
    theme: 'dark' | 'light'
    toggleTheme: () => void
}

export const ThemeContext = createContext({
    theme: 'dark',
    toggleTheme: () => {},
})

interface ThemeProviderProps {
    children: React.ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const initialTheme = () => {
        return localStorage.getItem('theme') || 'dark'
    }
    const [theme, setTheme] = useState(initialTheme)

    useEffect(() => {
        localStorage.setItem('theme', theme)
    }, [theme])

    const toggleTheme = () =>
        setTheme((theme) => (theme === 'dark' ? 'light' : 'dark'))

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
