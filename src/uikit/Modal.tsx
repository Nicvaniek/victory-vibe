import { ReactNode } from 'react'
import './Modal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

type Props = {
    children: ReactNode
    id: string
    title: ReactNode
    onMsg: (msg: Msg) => void
}

type Msg = { type: 'close' }

export const Modal = ({ children, id, onMsg, title }: Props) => {
    return (
        <div className="vv-modal bg-primary flex flex-col" id={id}>
            <div className="action-bar flex items-center justify-between p-4">
                {title}
                <span
                    className="text-3xl"
                    style={{ cursor: 'pointer' }}
                    onClick={() => onMsg({ type: 'close' })}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </span>
            </div>
            {children}
        </div>
    )
}
