import { getDateTimer } from '.'

/**
 * @jest-environment jsdom
 */

describe('Date Timer', () => {
    test('immediately invoked', () => {
        expect(getDateTimer(1)).toBe(true)
    })
    jest.setTimeout(61000)
    test('called after minutes', async () => {
        const res = await new Promise((r) => {
            setTimeout(() => {
                r(getDateTimer(1))
            }, 60000)
        })

        expect(res).toBe(false)
    })
})
