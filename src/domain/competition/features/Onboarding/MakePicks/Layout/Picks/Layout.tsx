import { useCallback, useState } from 'react'
import { CompetitionTeam } from '../../../../../../competition-team'
import { sortByRank } from '../../../../../../competition-team/helpers/sortByRank'
import { ListItem } from '../../../../../../competition-team/components/ListItem'
import { Competition, Tier } from '../../../../../index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import { notReachable } from '../../../../../../../toolkit/notReachable'

type Props = {
    competition: Competition
    onMsg: (msg: Msg) => void
}

type Msg =
    | { type: 'on_continue'; picks: CompetitionTeam[] }
    | { type: 'on_view_rules_click' }

type Form = Record<number, CompetitionTeam[]>

export const Layout = ({ competition, onMsg }: Props) => {
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
            <Header
                competition={competition}
                tier={currentTier}
                onMsg={onMsg}
            />

            <div className="flex flex-col w-full flex-1 mt-4 overflow-auto">
                {teams.map((team, idx) => (
                    <ListItem
                        key={`${idx}-${team.name}`}
                        onClick={handleSelect}
                        competitionTeam={team}
                        showPoints={false}
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

const Header = ({
    competition,
    tier,
    onMsg,
}: {
    competition: Competition
    tier: Tier
    onMsg: (msg: Msg) => void
}) => {
    switch (competition.type) {
        case 'rugbyWorldCup2023':
            return (
                <div className="flex flex-col items center w-full">
                    <div className="flex flex-row items-center mt-4 mb-4 justify-center">
                        <img
                            className="h-28"
                            src={competition.heroImage}
                            alt="logo"
                        />
                        <h1 className="text-4xl ms-3 me-3">
                            Tier {tier.tier} teams
                        </h1>
                        <FontAwesomeIcon
                            icon={faCircleQuestion}
                            onClick={() =>
                                onMsg({ type: 'on_view_rules_click' })
                            }
                        />
                    </div>
                    <p className="text-center text-sm">
                        Select your {tier.numPicks} picks for this tier.
                        <br />
                        <strong>Tip:</strong> To de-select a chosen team, just
                        tap it again.
                    </p>
                </div>
            )
        case 'cricketWorldCup2023':
            return (
                <div className="flex flex-col items center w-full">
                    <div className="flex flex-col items-center mb-4 justify-center">
                        <img
                            className="h-28"
                            src={competition.heroImage}
                            alt="logo"
                        />
                        <div className="flex flex-row items-center justify-center">
                            <h1 className="text-4xl ms-3 me-3">Teams</h1>
                            <FontAwesomeIcon
                                icon={faCircleQuestion}
                                onClick={() =>
                                    onMsg({ type: 'on_view_rules_click' })
                                }
                            />
                        </div>
                    </div>
                    <p className="text-center text-sm">
                        Select your two teams from the list below.
                        <br />
                        <strong>Tip:</strong> To de-select a chosen team, just
                        tap it again.
                    </p>
                </div>
            )
        /* istanbul ignore next */
        default:
            return notReachable(competition.type)
    }
}
