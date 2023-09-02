import {
    faListCheck,
    faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Competition } from '../../../index'

type Props = {
    competition: Competition
    onMsg: (msg: Msg) => void
}

type Msg = { type: 'on_sign_out' }

export const Settings = ({ competition, onMsg }: Props) => (
    <div className="flex flex-col p-4 h-full justify-between">
        <h1 className="text-3xl">Settings</h1>
        <img className="h-56 mt-8" src={competition.heroImage} alt="logo" />
        <div className="flex flex-col">
            <button className="btn text-accent bg-white" onClick={() => {}}>
                <FontAwesomeIcon icon={faListCheck} /> View rules
            </button>

            <button
                className="btn bg-accent text-white border-accent mt-2"
                onClick={() => onMsg({ type: 'on_sign_out' })}
            >
                <FontAwesomeIcon icon={faRightFromBracket} /> Sign out
            </button>
        </div>
    </div>
)
