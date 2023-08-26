type Props = {
    onMsg: (msg: Msg) => void
}

type Msg = { type: 'close' }

export const TabController = (_: Props) => {
    return <span>Tab controller</span>
}
