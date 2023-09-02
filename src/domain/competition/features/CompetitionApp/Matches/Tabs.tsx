export type Tab = { type: 'fixtures' } | { type: 'results' }

type Props = {
    activeTab: Tab
    onTabSelect: (tab: Tab) => void
}
export const Tabs = ({ activeTab, onTabSelect }: Props) => (
    <div className="tabs tabs-boxed mt-4">
        <a
            className={`tab flex-1 ${
                activeTab.type === 'fixtures' ? 'tab-active' : ''
            }`}
            onClick={() => onTabSelect({ type: 'fixtures' })}
        >
            Fixtures
        </a>
        <a
            className={`tab flex-1 ${
                activeTab.type === 'results' ? 'tab-active' : ''
            }`}
            onClick={() => onTabSelect({ type: 'results' })}
        >
            Results
        </a>
    </div>
)
