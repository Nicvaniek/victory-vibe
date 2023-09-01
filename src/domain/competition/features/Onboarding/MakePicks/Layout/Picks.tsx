import { Competition } from '../../../../index'
import { CompetitionTeam } from '../../../../../competition-team'
import { useCallback, useState } from 'react'
import { ListItem } from '../../../../../competition-team/components/ListItem'

type Props = {
    competition: Competition
    onMsg: (msg: Msg) => void
}

type Msg = { type: 'on_continue'; picks: CompetitionTeam[] }

export const Picks = ({ competition, onMsg }: Props) => {
    const [currentTierIndex, setCurrentTierIndex] = useState<number>(0)
    const [selectedTeams, setSelectedTeams] = useState<CompetitionTeam[]>([])

    const currentTier = competition.tiers[currentTierIndex]

    const teams = competition.teams.filter((t) => t.tier === currentTier.tier)

    const handleSelect = useCallback(
        (team: CompetitionTeam) => {
            if (selectedTeams.includes(team)) {
                setSelectedTeams((prev) => prev.filter((t) => t !== team))
            } else {
                setSelectedTeams((prev) => [...prev, team])
            }
        },
        [selectedTeams]
    )

    return (
        <div className="flex flex-col items-center p-4 h-full justify-between">
            <div className="flex flex-col items center w-full">
                <div className="flex flex-row items-center mt-8 mb-4 justify-center">
                    <img
                        className="h-12"
                        src="https://www.rugbyworldcup.com/rwc2023-resources/prod/rwc2023_v4.1.0/i/svg-files/elements/symbols/rwc2023-logo-white.svg"
                        alt="logo"
                    />
                    <h1 className="text-4xl ms-3">
                        Tier {currentTier.tier} teams
                    </h1>
                </div>
                <p className="text-center">
                    Select your {currentTier.numPicks} picks for this tier.
                    <br />
                    <strong>Tip:</strong> To de-select a chosen team, just tap
                    it again.
                </p>
            </div>
            <div className="flex flex-col w-full flex-1 mt-8">
                {teams.map((team, idx) => (
                    <ListItem
                        key={idx}
                        onClick={handleSelect}
                        competitionTeam={team}
                        selected={selectedTeams.includes(team)}
                    />
                ))}
            </div>
            <div className="flex flex-row w-full">
                <button
                    className="btn bg-white text-accent flex-1 mr-1"
                    disabled={currentTierIndex === 0}
                    onClick={() => setCurrentTierIndex((prev) => prev - 1)}
                >
                    Back
                </button>
                <button
                    className="btn bg-white text-accent flex-1 ms-1"
                    disabled={selectedTeams.length !== currentTier.numPicks}
                    onClick={() => setCurrentTierIndex((prev) => prev + 1)}
                >
                    Continue
                </button>
            </div>
        </div>
    )

    // return (
    //     <div>
    //         <span>Some layout stuff for picks screen</span>
    //         <button
    //             className="btn btn-primary"
    //             onClick={() =>
    //                 onMsg({
    //                     type: 'on_continue',
    //                     picks: [competition.teams[0], competition.teams[1]],
    //                 })
    //             }
    //         >
    //             Save picks
    //         </button>
    //     </div>
    // )
}
