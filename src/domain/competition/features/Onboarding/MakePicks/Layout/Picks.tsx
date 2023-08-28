import { Competition } from '../../../../index'
import { CompetitionTeam } from '../../../../../competition-team'

type Props = {
    competition: Competition
    onMsg: (msg: Msg) => void
}

type Msg = { type: 'on_continue'; picks: CompetitionTeam[] }

export const Picks = ({ competition, onMsg }: Props) => {
    return (
        <div>
            <span>Some layout stuff for picks screen</span>
            <button
                className="btn btn-primary"
                onClick={() =>
                    onMsg({
                        type: 'on_continue',
                        picks: [competition.teams[0], competition.teams[1]],
                    })
                }
            >
                Save picks
            </button>
        </div>
    )
}
