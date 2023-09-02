import { useContext, useState } from 'react'
import { AuthContext } from './index'
import { useNavigate } from 'react-router-dom'
import { HashLoader } from 'react-spinners'

export const Login = () => {
    const [loginCode, setLoginCode] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const auth = useContext(AuthContext)
    const navigate = useNavigate()

    if (!auth) {
        return null
    }

    if (auth.session) {
        navigate('/play')
        return null
    }

    const handleLogin = async () => {
        const { loginWithCode } = auth
        setLoading(true)
        setError(null)

        try {
            await loginWithCode(loginCode)
            setLoading(false)
            navigate('/play')
        } catch (error) {
            console.error(error)
            setLoading(false)
            setError((error as any).message)
        }
    }

    return loading ? (
        <div className="flex flex-col justify-center items-center h-full w-full bg-primary">
            <HashLoader loading={loading} color="white" />
        </div>
    ) : (
        <div
            className="flex flex-col h-full p-4"
            style={{ fontFamily: 'GlutenRegular' }}
        >
            <h1 className="text-4xl w-full text-center mt-8 mb-4 text-secondary">
                Victory Vibe
            </h1>
            <h2>Enter login code:</h2>

            <div className="flex flex-row items-center w-full">
                <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLoginCode(e.target.value)}
                />

                <button className="btn btn-primary ml-2" onClick={handleLogin}>
                    Login
                </button>
            </div>
            {error && <span className="mt-4">{error}</span>}
        </div>
    )
}
