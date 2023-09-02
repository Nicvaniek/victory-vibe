import { Competition } from '../../../../index'
import { CompetitionTeam } from '../../../../../competition-team'
import { useCallback, useState } from 'react'
import { ListItem } from '../../../../../competition-team/components/ListItem'
import { sortByRank } from '../../../../../competition-team/helpers/sortByRank'

type Props = {
    competition: Competition
    onMsg: (msg: Msg) => void
}

type Msg = { type: 'on_continue'; picks: CompetitionTeam[] }

type Form = Record<number, CompetitionTeam[]>

export const Picks = ({ competition, onMsg }: Props) => {
    const [currentTierIndex, setCurrentTierIndex] = useState<number>(0)
    const [selectedTeams, setSelectedTeams] = useState<Form>({
        0: [] as CompetitionTeam[],
    })

    const currentTier = competition.tiers[currentTierIndex]

    const teams = competition.teams
        .filter((t) => t.tier === currentTier.tier)
        .sort(sortByRank)

    const handleSelect = useCallback(
        (team: CompetitionTeam) => {
            if (!selectedTeams[currentTierIndex]) {
                setSelectedTeams((prev) => ({
                    ...prev,
                    [currentTierIndex]: [team],
                }))
            } else if (selectedTeams[currentTierIndex].includes(team)) {
                setSelectedTeams((prev) => ({
                    ...prev,
                    [currentTierIndex]: prev[currentTierIndex].filter(
                        (t) => t !== team
                    ),
                }))
            } else {
                setSelectedTeams((prev) => ({
                    ...prev,
                    [currentTierIndex]: [...prev[currentTierIndex], team],
                }))
            }
        },
        [currentTierIndex, selectedTeams]
    )

    return (
        <div className="flex flex-col items-center p-4 h-full justify-between">
            <div className="flex flex-col items center w-full">
                <div className="flex flex-row items-center mt-4 mb-4 justify-center">
                    <img
                        className="h-12"
                        src="https://www.rugbyworldcup.com/rwc2023-resources/prod/rwc2023_v4.1.0/i/svg-files/elements/symbols/rwc2023-logo-white.svg"
                        alt="logo"
                    />
                    <h1 className="text-4xl ms-3">
                        Tier {currentTier.tier} teams
                    </h1>
                </div>
                <p className="text-center text-xs">
                    Select your {currentTier.numPicks} picks for this tier.
                    <br />
                    <strong>Tip:</strong> To de-select a chosen team, just tap
                    it again.
                </p>
            </div>
            <div className="flex flex-col w-full flex-1 mt-4 overflow-auto">
                {teams.map((team, idx) => (
                    <ListItem
                        key={`${idx}-${team.name}`}
                        onClick={handleSelect}
                        competitionTeam={team}
                        selected={selectedTeams[currentTierIndex]?.includes(
                            team
                        )}
                    />
                ))}
            </div>
            <div className="flex flex-row w-full pt-4">
                <button
                    className="btn bg-white text-accent flex-1 mr-1"
                    disabled={currentTierIndex === 0}
                    onClick={() => setCurrentTierIndex((prev) => prev - 1)}
                >
                    Back
                </button>
                {currentTierIndex < competition.tiers.length - 1 && (
                    <button
                        className="btn bg-white text-accent flex-1 ms-1"
                        disabled={
                            selectedTeams[currentTierIndex]?.length !==
                            currentTier.numPicks
                        }
                        onClick={() => setCurrentTierIndex((prev) => prev + 1)}
                    >
                        Continue
                    </button>
                )}
                {currentTierIndex === competition.tiers.length - 1 && (
                    <button
                        className="btn bg-white text-accent flex-1 ms-1"
                        disabled={
                            selectedTeams[currentTierIndex]?.length !==
                            currentTier.numPicks
                        }
                        onClick={() =>
                            onMsg({
                                type: 'on_continue',
                                picks: Object.values(selectedTeams).flat(),
                            })
                        }
                    >
                        Confirm
                    </button>
                )}
            </div>
        </div>
    )
}
