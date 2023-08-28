import { CompetitionTeam } from '../../../../../competition-team'

type Props = {
    picks: CompetitionTeam[]
    onMsg: (msg: Msg) => void
}

type Msg = { type: 'on_choose_again' } | { type: 'on_confirm' }

export const Confirmation = ({ picks, onMsg }: Props) => {
    return (
        <div>
            <span>Confirm picks</span>
            <button onClick={() => onMsg({ type: 'on_choose_again' })}>Back</button>
            <button onClick={() => onMsg({ type: 'on_confirm' })}>
                Confirm
            </button>
        </div>
    )
}
