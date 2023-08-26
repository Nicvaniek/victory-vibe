import { Session } from '../index'
import axios from 'axios'

export const login = async (code: string): Promise<Session> => {
    const response = await axios.post(
        'https://us-central1-victory-vibe.cloudfunctions.net/app/login',
        {
            code,
        }
    )

    return response.data
}
