import { CompetitionTeam } from '../competition-team'

export type Stage =
    | 'GROUP'
    | 'QUARTER_FINAL'
    | 'SEMI_FINAL'
    | 'BRONZE_FINAL'
    | 'FINAL'

export type Result =
    | { type: 'draw' }
    | { type: 'victory'; winner: CompetitionTeam }

export type Match = {
    id: string
    homeTeam: CompetitionTeam | null
    awayTeam: CompetitionTeam | null
    stage: Stage
    date: string
    result: Result | null
}
