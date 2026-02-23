import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function getTimeBasedTheme(): Theme {
  const hour = new Date().getHours()
  // Light theme from 6am to 6pm
  return hour >= 6 && hour < 18 ? 'light' : 'dark'
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  const savedTheme = localStorage.getItem('pluview-theme') as Theme | null
  const savedManual = localStorage.getItem('pluview-manual-theme')
  if (savedManual === 'true' && savedTheme) {
    return savedTheme
  }
  return getTimeBasedTheme()
}

function getInitialManual(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('pluview-manual-theme') === 'true'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [isManual, setIsManual] = useState(getInitialManual)

  // Update theme based on time when not manual
  useEffect(() => {
    if (isManual) return

    const updateTheme = () => {
      setTheme(getTimeBasedTheme())
    }

    // Check every minute
    const interval = setInterval(updateTheme, 60000)

    return () => clearInterval(interval)
  }, [isManual])

  // Apply theme class to document
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
    localStorage.setItem('pluview-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setIsManual(true)
    localStorage.setItem('pluview-manual-theme', 'true')
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
