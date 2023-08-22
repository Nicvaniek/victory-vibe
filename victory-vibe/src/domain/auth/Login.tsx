import { useContext, useEffect, useState } from 'react'
import { AuthContext } from './index'
import { useNavigate } from 'react-router-dom'
import { routes } from '../navigation'

export const Login = () => {
    const [loginCode, setLoginCode] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState('')

    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    if (!auth) {
        return null
    }

    if (auth.session) {
        navigate(routes.COMPETITIONS)
        return null
    }

    const handleLogin = async () => {
        const { loginWithCode } = auth

        try {
            await loginWithCode(loginCode)
            navigate(routes.COMPETITIONS)
        } catch (error) {
            console.error(error)
            setErrorMessage((error as any).message)
        }
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Enter Login Code"
                value={loginCode}
                onChange={(e) => setLoginCode(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    )
}
