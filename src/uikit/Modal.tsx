import { ReactNode } from 'react'
import './Modal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

type Props = {
    children: ReactNode
    id: string
    onMsg: (msg: Msg) => void
}

type Msg = { type: 'close' }

export const Modal = ({ children, id, onMsg }: Props) => {
    return (
        <div className="vv-modal bg-primary flex flex-col" id={id}>
            <div className="action-bar flex items-center justify-end">
                <span
                    className="text-3xl mr-3 mt-3"
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
