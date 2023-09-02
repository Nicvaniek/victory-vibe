import React, { useContext } from 'react'
import { Auth, AuthContext } from '../auth'
import { Navigate } from 'react-router-dom'

type Props = {
    element: React.ComponentType<{ auth: Auth }>
}

export const ProtectedRoute = ({ element: Element }: Props) => {
    const auth = useContext(AuthContext)

    if (!auth?.session) {
        return <Navigate to="/login" replace />
    }

    return <Element auth={auth} />
}
