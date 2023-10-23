import { Competition } from '../index'
import { notReachable } from '../../../toolkit/notReachable'

export const Rules = ({ competition }: { competition: Competition }) => {
    console.log(competition)
    switch (competition.type) {
        case 'rugbyWorldCup2023':
            return <RulesRWC23 />
        case 'cricketWorldCup2023':
            return <RulesCWC23 />
        /* istanbul ignore next */
        default:
            return notReachable(competition.type)
    }
}

const RulesRWC23 = () => (
    <>
        <h2 className="text-2xl mb-1">
            <strong>Making picks</strong>
        </h2>
        <p>
            The teams playing in the World Cup have been divided into three
            tiers based on their world rankings. You must choose two teams from
            each tier. <br />
            <br />
            <strong>Note:</strong> All picks must be made before the first game
            kicks off on Friday 08 September.
        </p>
        <h2 className="text-2xl mb-1 mt-6">
            <strong>Earning points</strong>
        </h2>
        <p>
            Teams earn points for winning or drawing matches. Your points total
            is the sum of all the points earned by the teams you picked. <br />
            <br />
            Points are calculated after each match and are assigned based on the
            outcome of the match as well as two modifiers. Winning a match earns
            a team <strong>30</strong> base points, whereas a draw earns
            <strong>10</strong> base points (base points exclude modifiers).
            <br /> <br />
            <strong>The modifiers are:</strong>
            <br />
            1. The team’s “handicap” which is based on their world ranking
            points. For example: Fiji has a higher handicap than Ireland,
            meaning they would earn more points for winning or drawing a match.
            See examples below. <br /> <br />
            2. The stage of the competition that the match forms part of. Teams
            earn more points for winning matches in later stages of the
            competition. Stage modifiers are listed below:
        </p>
        <table className="table table-sm">
            <thead className="text-white">
                <tr>
                    <td>Stage</td>
                    <td>Modifier</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Pool</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>Quarter final</td>
                    <td>1.5</td>
                </tr>
                <tr>
                    <td>Semi final</td>
                    <td>2</td>
                </tr>
                <tr>
                    <td>Bronze final</td>
                    <td>1.75</td>
                </tr>
                <tr>
                    <td>Final</td>
                    <td>2.5</td>
                </tr>
            </tbody>
        </table>
        <p className="mt-4">
            <strong>Points are calculated as follows:</strong>
            <br />
            <i>
                Points earned = base
                points&nbsp;&nbsp;x&nbsp;&nbsp;handicap&nbsp;&nbsp;x&nbsp;&nbsp;stage
                modifier
            </i>
        </p>
        <p className="mt-4">
            <strong>Example 1:</strong> New Zealand has a handicap of 1.06 based
            on their world ranking points. Winning a quarter final would earn
            New Zealand&nbsp;
            <i>
                30 x 1.06 x 1.5 ≈ <strong>48 points </strong>
            </i>
            (rounded to the nearest whole number).
        </p>
        <p className="mt-4">
            <strong>Example 2:</strong> Namibia has a handicap of 1.66 based on
            their world ranking points. Winning a pool game would earn
            Namibia&nbsp;
            <i>
                30 x 1.66 x 1 ≈ <strong>50 points </strong>
            </i>
            (rounded to the nearest whole number).
        </p>
        <h2 className="text-2xl mb-1 mt-6">
            <strong>Winning the competition</strong>
        </h2>
        <p>
            The three participating groups/individuals with the highest
            cumulative point scores at the end of the world cup will split the
            prize money, with the winner getting the most. Prize money will be
            confirmed once all participants have paid their entry fee.
        </p>
        <h2 className="text-lg mb-1 mt-4">
            <strong>In case of a tie</strong>
        </h2>
        <p>
            In the unlikely event that participating groups/individuals have the
            same number of points at the end of the competition, the final
            positions will be awarded based on the outcome of a “tie-break”
            event. <br />
            <br /> Prior to the World Cup final being played, participants with
            the possibility of ending the competition on the same number of
            points will be asked to predict the score for the final match. If,
            after the final, participants have the same number of points, their
            rankings will be determined based on the accuracy of their score
            prediction.
        </p>
        <p className="mt-4 mb-4">
            <strong>
                <i>
                    That's it for the boring stuff! Click on the button below to
                    enter the competition and make your picks!
                </i>
            </strong>
        </p>
    </>
)

const RulesCWC23 = () => (
    <>
        <h2 className="text-2xl mb-1">
            <strong>Making picks</strong>
        </h2>
        <p>
            You must choose two teams from the 10 countries participating in the
            ICC Cricket World Cup 2023.
            <br />
            <br />
            <strong>Note:</strong> All picks must be made before the first match
            starts on Thursday 05 October.
        </p>
        <h2 className="text-2xl mb-1 mt-6">
            <strong>Earning points</strong>
        </h2>
        <p>
            Teams earn points for winning or drawing matches. Your points total
            is the sum of all the points earned by the teams you picked. <br />
            <br />
            Points are calculated after each match and are assigned based on the
            outcome of the match as well as two modifiers. Winning a match earns
            a team <strong>30</strong> base points, whereas a draw earns
            <strong> 10</strong> base points (base points exclude modifiers).
            <br /> <br />
            <strong>The modifiers are:</strong>
            <br />
            1. The team’s “handicap” which is based on their world ranking
            points. For example: Sri Lanka has a higher handicap than India,
            meaning they would earn more points for winning or drawing a match.
            See examples below. <br /> <br />
            2. The stage of the competition that the match forms part of. Teams
            earn more points for winning matches in later stages of the
            competition. Stage modifiers are listed below:
        </p>
        <table className="table table-sm">
            <thead className="text-white">
                <tr>
                    <td>Stage</td>
                    <td>Modifier</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Pool</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>Semi final</td>
                    <td>1.5</td>
                </tr>
                <tr>
                    <td>Final</td>
                    <td>2.5</td>
                </tr>
            </tbody>
        </table>
        <p className="mt-4">
            <strong>Points are calculated as follows:</strong>
            <br />
            <i>
                Points earned = base
                points&nbsp;&nbsp;x&nbsp;&nbsp;handicap&nbsp;&nbsp;x&nbsp;&nbsp;stage
                modifier
            </i>
        </p>
        <p className="mt-4">
            <strong>Example 1:</strong> Pakistan has a handicap of 1.05 based on
            their world ranking points. Winning a semi final would earn
            Pakistan&nbsp;
            <i>
                30 x 1.05 x 1.5 ≈ <strong>47 points </strong>
            </i>
            (rounded to the nearest whole number).
        </p>
        <p className="mt-4">
            <strong>Example 2:</strong> Bangladesh has a handicap of 2.14 based
            on their world ranking points. Winning a pool game would earn
            Bangladesh&nbsp;
            <i>
                30 x 2.14 x 1 ≈ <strong>64 points </strong>
            </i>
            (rounded to the nearest whole number).
        </p>
        <h2 className="text-2xl mb-1 mt-6">
            <strong>Winning the competition</strong>
        </h2>
        <p>
            The three participating groups/individuals with the highest
            cumulative point scores at the end of the world cup will split the
            prize money, with the winner getting the most. Prize money will be
            confirmed once all participants have paid their entry fee.
        </p>
        <h2 className="text-lg mb-1 mt-4">
            <strong>In case of a tie</strong>
        </h2>
        <p>
            In the unlikely event that participating groups/individuals have the
            same number of points at the end of the competition, the final
            positions will be awarded based on the outcome of a “tie-break”
            event. <br />
            <br /> Prior to the World Cup final being played, participants with
            the possibility of ending the competition on the same number of
            points will be asked to predict the winning team and their number of
            runs. If, after the final, participants have the same number of
            points, their rankings will be determined based on the accuracy of
            their score prediction.
        </p>
        <p className="mt-4 mb-4">
            <strong>
                <i>
                    That's it for the boring stuff! Click on the button below to
                    enter the competition and make your picks!
                </i>
            </strong>
        </p>
    </>
)
