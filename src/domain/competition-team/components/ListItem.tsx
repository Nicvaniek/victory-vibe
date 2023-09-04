import { CompetitionTeam } from '../index'

type Props = {
    competitionTeam: CompetitionTeam
    selected: boolean | null
    showPoints: boolean
    onClick?: (team: CompetitionTeam) => void
}

export const ListItem = ({
    competitionTeam,
    selected,
    onClick,
    showPoints,
}: Props) => (
    <div
        className="flex flex-row flex-1 bg-white text-secondary mb-2 py-2 px-3 justify-between items-center rounded-xl max-h-16"
        style={{ cursor: onClick ? 'pointer' : 'default' }}
        onClick={() => onClick?.(competitionTeam)}
    >
        <div className="avatar">
            <div className="w-9 rounded-full">
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
                    World ranking: {competitionTeam.team.ranking}
                </span>
                <span className="text-xs ms-5">
                    Handicap: {competitionTeam.rankingMultiplier}
                </span>
            </div>
        </div>
        {selected !== null && (
            <input
                type="checkbox"
                checked={selected}
                className="checkbox checkbox-secondary"
            />
        )}
        {showPoints && (
            <span className="p-2 bg-accent text-white rounded-lg mr-0.5 mw-3 text-center">
                {competitionTeam.points || 0}
            </span>
        )}
    </div>
)
