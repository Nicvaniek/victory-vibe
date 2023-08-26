import React, { useContext } from 'react'
import { AuthContext, Session } from '../auth'
import { Navigate } from 'react-router-dom'

type Props = {
    element: React.ComponentType<{ session: Session }>
}

export const ProtectedRoute = ({ element: Element }: Props) => {
    const auth = useContext(AuthContext)

    if (!auth?.session) {
        return <Navigate to="/login" replace />
    }

    return <Element session={auth.session} />
}
