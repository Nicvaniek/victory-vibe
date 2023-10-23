import { Participant } from '../participant'
import { CompetitionTeam } from '../competition-team'
import { Match } from '../match'

export type Tier = {
    tier: number
    numPicks: number
}

export type Competition = {
    type: 'rugbyWorldCup2023' | 'cricketWorldCup2023'
    id: string
    name: string
    logo: string
    heroImage: string
    lightLogo: string
    enabled: boolean
    participants: Participant[]
    teams: CompetitionTeam[]
    matches: Match[]
    theme: string
    tiers: Tier[]
    points: {
        draw: number
        win: number
    }
    stageModifiers: {
        quarter: number
        semi: number
        bronze: number
        final: number
    }
}
