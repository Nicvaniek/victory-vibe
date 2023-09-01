type Props = {
    onMsg: (msg: Msg) => void
}

type Msg = { type: 'on_continue' }

export const Intro = ({ onMsg }: Props) => {
    return (
        <div className="flex flex-col items-center p-4 h-full justify-between">
            <div className="flex flex-col items center">
                <img
                    className="h-56 mt-8"
                    src="https://www.rugbyworldcup.com/rwc2023-resources/prod/rwc2023_v4.1.0/i/svg-files/elements/symbols/rwc2023-logo-white.svg"
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
