import { highDigit, lowDigit, maxOpenClose, openCloseDigit } from '@/constants'

export const getRandomValue = (position: string) => {
    const random1 = Math.trunc(Math.random() * openCloseDigit + 2)
    const random2 = Math.trunc(Math.random() * openCloseDigit + 2)
    if (position === 'close') return String(Math.max(random1, random2))
    else if (position === 'open') return String(Math.min(random1, random2))
    else if (position === 'low')
        return String(Math.trunc(Math.random() * lowDigit) + 1)
    else return String(Math.trunc(Math.random() * highDigit) + maxOpenClose)
}
