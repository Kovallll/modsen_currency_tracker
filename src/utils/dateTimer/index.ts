export const getDateTimer = (delay: number) => {
    const currentDay = new Date().getMinutes()
    let startDay = JSON.parse(
        localStorage.getItem('assetsTimer') ?? JSON.stringify(null)
    )

    if (startDay === null) {
        localStorage.setItem('assetsTimer', JSON.stringify(currentDay))
        startDay = currentDay
    }

    const timer = Math.abs(startDay - currentDay)
    if (timer < delay) {
        return true
    } else {
        localStorage.removeItem('assetRate')
        localStorage.removeItem('assetsData')
        localStorage.removeItem('lastUpdated')
        return false
    }
}
