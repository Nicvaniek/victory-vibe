import { Competition } from '../../../../index'
import { noop } from '../../../../../../toolkit/noop'

type Props = {
    competitions: Competition[]
    currentCompetition: Competition
    onMsg: (msg: Msg) => void
}

type Msg = { type: 'on_competition_switch_select'; competition: Competition }

export const SwitchCompetition = ({
    competitions,
    currentCompetition,
    onMsg,
}: Props) => {
    const temp = competitions.map((c) => ({ ...c, enabled: true }))
    return temp
        .filter((c) => c.id !== currentCompetition.id)
        .map((competition) => (
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
}
