import { User } from '../user'
import React, { createContext, ReactNode } from 'react'
import { login } from './api/login'
import { useLocalStorage } from '../storage/useLocalStorage'

export type Session = {
    user: User
    sessionId: string
}

type Auth = {
    session: Session | null
    loginWithCode: (code: string) => Promise<void>
    logout: () => void
}

export const AuthContext = createContext<Auth | null>(null)

type Props = {
    children: ReactNode
}
export const AuthProvider = ({ children }: Props) => {
    const [session, setSession, removeSession] = useLocalStorage(
        'session',
        null
    )

    const loginWithCode = async (code: string): Promise<void> => {
        const loggedInSession = await login(code)
        setSession(loggedInSession)
    }

    const logout = () => {
        removeSession()
    }

    return (
        <AuthContext.Provider value={{ session, loginWithCode, logout }}>
            {children}
        </AuthContext.Provider>
    )
}