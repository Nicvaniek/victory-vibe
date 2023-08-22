import { ReactElement, useContext } from 'react'
import { AuthContext } from '../auth'
import { Navigate } from 'react-router-dom'
import { routes } from './Router'

type Props = {
    element: ReactElement
}

export const ProtectedRoute = ({ element }: Props) => {
    //FIXME:: Pull redirectURI from query and navigate to it after login (unless it is first visit to app)
    const auth = useContext(AuthContext)

    if (!auth?.session) {
        return <Navigate to={routes.LOGIN} replace />
    }

    return element
}
