'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface User {
  email: string
  name: string
  role: 'admin' | 'user'
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo credentials
const DEMO_USERS = [
  { email: 'admin@esencia.cl', password: 'admin123', name: 'Administrador', role: 'admin' as const },
  { email: 'admin@aromatizarte.cl', password: 'admin123', name: 'Administrador', role: 'admin' as const },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('esencia-user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        setUser(null)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    const foundUser = DEMO_USERS.find(
      (u) => u.email === email && u.password === password
    )
    
    if (foundUser) {
      const userData: User = {
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
      }
      setUser(userData)
      localStorage.setItem('esencia-user', JSON.stringify(userData))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('esencia-user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
