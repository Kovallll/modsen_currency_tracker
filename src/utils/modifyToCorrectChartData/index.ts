import { dateNowMs, msInDay } from '@/constants'
import { InputData } from '@/types'

export const modifyToCorrectChartData = (data: InputData[]) => {
    return data.map((item) => {
        const o = Number.parseFloat(item.open)
        const c = Number.parseFloat(item.close)
        const l = Number.parseFloat(item.low)
        const h = Number.parseFloat(item.high)
        return {
            x: Number(item.day) * msInDay + dateNowMs,
            o: o,
            h: h,
            c: c,
            l: l,
        }
    })
}
