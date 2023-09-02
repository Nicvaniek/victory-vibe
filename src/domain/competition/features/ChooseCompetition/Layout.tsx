import { Competition } from '../../index'

type Props = {
    competitions: Competition[]
    onMsg: (msg: Msg) => void
}

type Msg = { type: 'on_competition_select'; competition: Competition }

const colours: Record<string, string> = {
    rugbyWorldCup2023: '#2d3cff',
}

export const Layout = ({ competitions, onMsg }: Props) => {
    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-4xl text-secondary mb-8 mt-4">
                Choose competition
            </h1>
            {competitions.map((competition) => (
                <div
                    onClick={() =>
                        onMsg({ type: 'on_competition_select', competition })
                    }
                    style={{
                        backgroundColor: colours[competition.theme],
                        cursor: 'pointer',
                    }}
                    className="p-8 rounded-xl w-full flex items-center justify-center drop-shadow-xl h-36 mb-4"
                >
                    <img
                        className="h-28"
                        src={competition.heroImage}
                        alt="logo"
                    />
                </div>
            ))}
            <div className="p-8 rounded-xl w-full flex items-center justify-center drop-shadow-xl h-36 bg-gray-400">
                <h2>Coming Soon</h2>
            </div>
        </div>
    )
}
