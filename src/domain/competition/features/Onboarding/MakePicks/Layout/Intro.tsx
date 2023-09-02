import { Competition } from '../../../../index'

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
                <h1 className="text-4xl mt-8 mb-4 text-center">Make your picks</h1>
                <p className="text-center">
                    Explain some stuff here about how picks work, the different
                    tiers etc.
                </p>
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
