import { CompetitionTeam } from '../index'

export const sortByRank = (a: CompetitionTeam, b: CompetitionTeam): number =>
    a.team.ranking - b.team.ranking
