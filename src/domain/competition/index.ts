import { Participant } from '../participant'
import { CompetitionTeam } from '../competition-team'

export type Competition = {
    id: string
    name: string
    logo: string
    heroImage: string
    participants: Participant[]
    teams: CompetitionTeam[]
}
