import { Competition } from '../../index'
import { noop } from '../../../../toolkit/noop'

type Props = {
    competitions: Competition[]
    onMsg: (msg: Msg) => void
}

type Msg = {
    type: 'on_competition_select'
    competition: Competition
    competitions: Competition[]
}

const colours: Record<string, string> = {
    rugbyWorldCup2023: '#2d3cff',
    cricketWorldCup2023: '#310173',
}

export const Layout = ({ competitions, onMsg }: Props) => {
    const temp = competitions.map((c) => ({ ...c, enabled: true }))

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-4xl text-secondary mb-8 mt-4">
                Choose competition
            </h1>
            {temp.map((competition) => (
                <div
                    onClick={() =>
                        competition.enabled
                            ? onMsg({
                                  type: 'on_competition_select',
                                  competition,
                                  competitions,
                              })
                            : noop()
                    }
                    style={{
                        backgroundColor: colours[competition.theme],
                        cursor: competition.enabled ? 'pointer' : 'default',
                    }}
                    className={`p-8 rounded-xl w-full flex items-center justify-center drop-shadow-xl h-36 mb-4 ${
                        !competition.enabled ? 'opacity-40' : ''
                    }`}
                >
                    <img
                        className="h-28"
                        src={competition.heroImage}
                        alt="logo"
                    />
                </div>
            ))}
        </div>
    )
}
