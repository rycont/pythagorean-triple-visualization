function* getPythagoreanNumbers() {
    for (let a = 1; a <= 255; a++) {
        for (let b = 1; b <= 255; b++) {
            for (let c = 1; c <= 255; c++) {
                if (
                    (a ** 2 + b ** 2 === c ** 2)
                    || (a ** 2 === b ** 2 + c ** 2)
                    || (a ** 2 + c ** 2 === b ** 2)
                ) {
                    yield w3color('#' + [a, b, c].map(e => e.toString(16).padStart(2, '0')).join(''))
                }
            }
        }
    }
}

const splitArrayEvery = (arr, n) => Array.from(Array(Math.ceil(arr.length / n)), (_, i) => arr.slice(i * n, i * n + n));

const colors = [...getPythagoreanNumbers()]
console.log(colors.length)
const bSorted = colors.sort((a, b) => a.black - b.black)
const filterGrouped = splitArrayEvery(bSorted, 39).map(row => row.sort((a, b) =>  a.hue - b.hue))
console.log(filterGrouped)
filterGrouped.map(row => row.map(color => {
    const el = document.createElement('div')
    el.classList.add('box')
    el.style.backgroundColor = `rgb(${color.red}, ${color.green}, ${color.blue})`
    return el
})).map(row => {
    const rowEl = document.createElement('div')
    rowEl.classList.add('row')
    row.forEach(box => rowEl.appendChild(box))
    document.body.appendChild(rowEl)
})