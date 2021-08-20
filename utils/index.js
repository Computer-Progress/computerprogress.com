export const getRelativeTime = (d1, d2 = new Date()) => {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'always' })
    const formatDate = d1
    // console.log('TEMPO', formatDate, d2)
    var elapsed = formatDate.getTime() - d2.getTime()

    const units = {
        year: 24 * 60 * 60 * 1000 * 365,
        month: (24 * 60 * 60 * 1000 * 365) / 12,
        day: 24 * 60 * 60 * 1000,
        hour: 60 * 60 * 1000,
        minute: 60 * 1000,
        second: 1000
    }

    for (var u in units) {
        if (Math.abs(elapsed) > units[u] || u === 'second') {
        return rtf.format(Math.round(elapsed / units[u]), u)
        }
    }
}