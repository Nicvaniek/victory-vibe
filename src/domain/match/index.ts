import { CompetitionTeam } from '../competition-team'

export type Match = {
    id: string
    homeTeam: CompetitionTeam | null
    awayTeam: CompetitionTeam | null
    stage: 'GROUP' | 'QUARTER_FINAL' | 'SEMI_FINAL' | 'BRONZE_FINAL' | 'FINAL'
    date: string
    winner: CompetitionTeam | null
}