import { createContext, useState } from 'react'

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
    const [theme, setTheme] = useState('dark')

    const toggleTheme = () =>
        setTheme((theme) => (theme === 'dark' ? 'light' : 'dark'))

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
