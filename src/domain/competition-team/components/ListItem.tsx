import { CompetitionTeam } from '../index'

type Props = {
    competitionTeam: CompetitionTeam
    selected: boolean
    onClick?: (team: CompetitionTeam) => void
}

export const ListItem = ({ competitionTeam, selected, onClick }: Props) => (
    <div
        className="flex flex-row bg-white text-secondary mb-2 py-2 px-3 justify-between items-center rounded-xl"
        style={{ cursor: onClick ? 'pointer' : 'default' }}
        onClick={() => onClick?.(competitionTeam)}
    >
        <div className="avatar">
            <div className="w-12 h-12 rounded-full">
                <img
                    src={competitionTeam.team.logo}
                    alt={competitionTeam.name}
                />
            </div>
        </div>
        <div className="flex-1 ml-3">
            <span>{competitionTeam.name}</span>
            <div className="flex flex-row">
                <span className="text-xs">
                    Rank: {competitionTeam.team.ranking}
                </span>
                <span className="text-xs ms-5">
                    Ranking points: {competitionTeam.team.rankingPoints}
                </span>
            </div>
        </div>
        <input
            type="checkbox"
            checked={selected}
            className="checkbox checkbox-secondary"
        />
    </div>
)
