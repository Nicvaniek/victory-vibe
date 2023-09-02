import { User } from '../../auth'
import { CompetitionTeam } from '../competition-team'

export type Participant = {
    user: User
    picks: CompetitionTeam[]
    points: number // calculated
    matchesPlayed: number // calculated
}
