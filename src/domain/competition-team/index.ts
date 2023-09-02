export type CompetitionTeam = {
    name: string // e.g. Springboks
    tier: number
    rankingMultiplier: number
    team: {
        name: string // e.g. South Africa Rugby First Team Male
        logo: string
        ranking: number
        rankingPoints: number
    }
}
