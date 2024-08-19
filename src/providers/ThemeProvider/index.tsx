import { createContext, useEffect, useState } from 'react'

interface ThemeContext {
    theme: Theme
    toggleTheme: () => void
}

type Theme = 'dark' | 'light'

export const ThemeContext = createContext<ThemeContext>({
    theme: 'dark',
    toggleTheme: () => {},
})

interface ThemeProviderProps {
    children: React.ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const initialTheme = () => {
        return (localStorage.getItem('theme') as Theme) || 'dark'
    }
    const [theme, setTheme] = useState<Theme>(initialTheme)

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
