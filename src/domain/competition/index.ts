import { Participant } from '../participant'
import { CompetitionTeam } from '../competition-team'

export type Tier = {
    tier: number
    numPicks: number
}

export type Competition = {
    id: string
    name: string
    logo: string
    heroImage: string
    participants: Participant[]
    teams: CompetitionTeam[]
    theme: string
    tiers: Tier[]
}
