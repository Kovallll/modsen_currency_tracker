import { useRef } from 'react'

import * as styles from './styles.module.scss'

import { useClickOutside } from '@/hooks/use-click-outside'
import { ErrorModalProps } from '@/types'

export const ErrorModal = ({ onClose }: ErrorModalProps) => {
    const modalRef = useRef(null)
    useClickOutside(modalRef, () => {
        onClose(false)
    })
    return (
        <div className={styles.container}>
            <div className={styles.window} ref={modalRef}>
                Some Error
            </div>
        </div>
    )
}
