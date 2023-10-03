import { Competition } from '../../../../index'
import { notReachable } from '../../../../../../toolkit/notReachable'

type Props = {
    competition: Competition
    onMsg: (msg: Msg) => void
}

type Msg = { type: 'on_continue' }

export const Intro = ({ onMsg, competition }: Props) => {
    return (
        <div className="flex flex-col items-center p-4 h-full justify-between">
            <div className="flex flex-col items center">
                <img
                    className="h-56 mt-8"
                    src={competition.heroImage}
                    alt="logo"
                />
                <h1 className="text-4xl mt-8 mb-4 text-center">
                    Make your picks
                </h1>
                <Content competition={competition} />
            </div>
            <button
                className="btn w-full bg-white text-accent"
                onClick={() => onMsg({ type: 'on_continue' })}
            >
                Continue
            </button>
        </div>
    )
}

const Content = ({ competition }: { competition: Competition }) => {
    switch (competition.type) {
        case 'rugbyWorldCup2023':
            return (
                <p className="text-center">
                    The teams playing in the World Cup have been divided into
                    three tiers based on their world rankings. You must choose
                    two teams from each tier. <br />
                    <br />
                    <strong>Note:</strong> All picks must be made before the
                    first game kicks off on Friday 08 September.
                </p>
            )
        case 'cricketWorldCup2023':
            return (
                <p className="text-center">
                    The teams playing in the World Cup have been given handicaps
                    based on their world ranking. You must choose two teams to
                    enter the competition. <br />
                    <br />
                    <strong>Note:</strong> All picks must be made before the
                    first match starts on Thursday 05 October.
                </p>
            )
        /* istanbul ignore next */
        default:
            return notReachable(competition.type)
    }
}
