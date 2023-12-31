import { Competition } from '../../../../index'
import { noop } from '../../../../../../toolkit/noop'
import { User } from '../../../../../../auth'

type Props = {
    competitions: Competition[]
    user: User
    currentCompetition: Competition
    onMsg: (msg: Msg) => void
}

type Msg = { type: 'on_competition_switch_select'; competition: Competition }

export const SwitchCompetition = ({
    competitions,
    user,
    currentCompetition,
    onMsg,
}: Props) => {
    const otherCompetitions = competitions
        .filter((c) => c.id !== currentCompetition.id)
        .filter((c) => c.participants.map((p) => p.user.id).includes(user.id))

    return otherCompetitions.length ? (
        otherCompetitions.map((competition) => (
            <div
                onClick={() =>
                    competition.enabled
                        ? onMsg({
                              type: 'on_competition_switch_select',
                              competition,
                          })
                        : noop()
                }
                style={{
                    cursor: competition.enabled ? 'pointer' : 'default',
                }}
                className={`p-8 rounded-xl bg-secondary w-full flex items-center justify-center drop-shadow-xl h-36 mb-4 mt-4 ${
                    !competition.enabled ? 'opacity-40' : ''
                }`}
            >
                <img className="h-28" src={competition.heroImage} alt="logo" />
            </div>
        ))
    ) : (
        <h1 className="w-full text-center">
            You have not entered any other competitions
        </h1>
    )
}
