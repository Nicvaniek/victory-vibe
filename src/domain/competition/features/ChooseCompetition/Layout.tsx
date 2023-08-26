import { Competition } from '../../index'

type Props = {
    competitions: Competition[]
    onMsg: (msg: Msg) => void
}

type Msg = { type: 'on_competition_select'; competition: Competition }

export const Layout = ({ competitions, onMsg }: Props) => {
    return (
        <div>
            <span>Some title etc</span>
            {competitions.map((competition) => (
                <button
                    onClick={() =>
                        onMsg({ type: 'on_competition_select', competition })
                    }
                >
                    {competition.name}
                </button>
            ))}
        </div>
    )
}
