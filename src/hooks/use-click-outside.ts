import { useEffect } from 'react'

interface ValidRefTarget {
    contains: (target: EventTarget | null) => unknown
}

export function useClickOutside(
    ref: React.RefObject<ValidRefTarget>,
    onClickOutside: () => void
) {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (ref?.current && !ref?.current.contains(event.target)) {
                onClickOutside?.()
            }
        }
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [onClickOutside, ref])
}
