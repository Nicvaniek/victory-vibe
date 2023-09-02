import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faRankingStar,
    faMedal,
    faFootball,
    faGear,
} from '@fortawesome/free-solid-svg-icons'

export type Tab =
    | { type: 'leaderboard' }
    | { type: 'my_picks' }
    | { type: 'matches' }
    | { type: 'settings' }

type Props = {
    activeTab: Tab
    onTabSelect: (tab: Tab) => void
}
export const BottomNav = ({ activeTab, onTabSelect }: Props) => (
    <div className="btm-nav text-secondary">
        <button
            className={activeTab.type === 'leaderboard' ? 'active' : ''}
            onClick={() => onTabSelect({ type: 'leaderboard' })}
        >
            <FontAwesomeIcon icon={faRankingStar} />
            <span className="btm-nav-label">Standings</span>
        </button>
        <button
            className={activeTab.type === 'my_picks' ? 'active' : ''}
            onClick={() => onTabSelect({ type: 'my_picks' })}
        >
            <FontAwesomeIcon icon={faMedal} />
            <span className="btm-nav-label">My Picks</span>
        </button>
        <button
            className={activeTab.type === 'matches' ? 'active' : ''}
            onClick={() => onTabSelect({ type: 'matches' })}
        >
            <FontAwesomeIcon icon={faFootball} />
            <span className="btm-nav-label">Matches</span>
        </button>
        <button
            className={activeTab.type === 'settings' ? 'active' : ''}
            onClick={() => onTabSelect({ type: 'settings' })}
        >
            <FontAwesomeIcon icon={faGear} />
            <span className="btm-nav-label">Settings</span>
        </button>
    </div>
)
