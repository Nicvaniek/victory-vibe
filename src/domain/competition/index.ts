import { Participant } from '../participant'
import { CompetitionTeam } from '../competition-team'
import { Match } from '../match'

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
    matches: Match[]
    theme: string
    tiers: Tier[]
    points: {
        draw: number
        win: number
    }
}
