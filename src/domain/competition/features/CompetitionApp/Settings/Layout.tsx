import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faListCheck,
    faPencil,
    faPeopleGroup,
    faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import { Competition } from '../../../index'
import { User } from '../../../../../auth'

type Props = {
    competition: Competition
    user: User
    onMsg: (msg: Msg) => void
}

type Msg =
    | { type: 'on_sign_out' }
    | { type: 'on_rules_click' }
    | { type: 'on_add_results_click' }
    | { type: 'on_teams_click' }

export const Layout = ({ competition, onMsg, user }: Props) => {
    return (
        <div className="flex flex-col p-4 h-full justify-between">
            <h1 className="text-3xl">Settings</h1>
            <img className="h-56 mt-8 mb-2" src={competition.heroImage} alt="logo" />
            <div className="flex flex-col">
                {user.isAdmin && (
                    <button
                        className="btn text-accent bg-white mb-2"
                        onClick={() => onMsg({ type: 'on_add_results_click' })}
                    >
                        <FontAwesomeIcon icon={faPencil} /> Add results
                    </button>
                )}
                <button
                    className="btn text-accent bg-white mb-2"
                    onClick={() => onMsg({ type: 'on_teams_click' })}
                >
                    <FontAwesomeIcon icon={faPeopleGroup} /> View teams
                </button>
                <button
                    className="btn text-accent bg-white"
                    onClick={() => onMsg({ type: 'on_rules_click' })}
                >
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
}
