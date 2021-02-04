function* getPythagoreanNumbers() {
    for (let a = 1; a <= 255; a++) {
        for (let b = 1; b <= 255; b++) {
            for (let c = 1; c <= 255; c++) {
                if (
                    (a ** 2 + b ** 2 === c ** 2)
                    || (a ** 2 === b ** 2 + c ** 2)
                    || (a ** 2 + c ** 2 === b ** 2)
                ) {
                    yield [a, b, c]
                }
            }
        }
    }
}

const getLightnessOfRGB = (rgbIntArray) => {
    const highest = Math.max(...rgbIntArray);
    const lowest = Math.min(...rgbIntArray);
    return (highest + lowest) / 512;
  }
  
const getHueFromColor = (R, G, B) => {
    let Max = 0.0;
    let Min = 0.0;

    let fR = R / 255.0;
    let fG = G / 255.0;
    let fB = B / 255.0;

    if (fR >= fG && fR >= fB)
        Max = fR;
    else if (fG >= fB && fG >= fR)
        Max = fG;
    else if (fB >= fG && fB >= fR)
        Max = fB;

    if (fR <= fG && fR <= fB)
        Min = fR;
    else if (fG <= fB && fG <= fR)
        Min = fG;
    else if (fB <= fG && fB <= fR)
        Min = fB;

    let Hue;

    if (Max == Min) {
        Hue = -1.0;
    }
    else {
        if (Max == fR) {
            Hue = (fG - fB) / (Max - Min);
        }
        else if (Max == fG) {
            Hue = 2.0 + (fB - fR) / (Max - Min);
        }
        else if (Max == fB) {
            Hue = 4.0 + (fR - fG) / (Max - Min);
        }

        Hue *= 60.0;

        if (Hue < 0.0) {
            Hue += 360.0;
        }
    }

    return Hue;
}

const splitArrayEvery = (arr, n) => Array.from(Array(Math.ceil(arr.length / n)), (_, i) => arr.slice(i * n, i * n + n));

const colors = [...getPythagoreanNumbers()]
console.log(colors.length)
const bSorted = colors.sort((a, b) => getLightnessOfRGB(a) > getLightnessOfRGB(b))
const filterGrouped = splitArrayEvery(bSorted, 39).map(row => row.sort((a, b) => getHueFromColor(...a) - getHueFromColor(...b)))
console.log(filterGrouped)
filterGrouped.map(row => row.map(color => {
    const el = document.createElement('div')
    el.classList.add('box')
    el.style.backgroundColor = `rgba(${color.join(', ')})`
    return el
})).map(row => {
    const rowEl = document.createElement('div')
    rowEl.classList.add('row')
    row.forEach(box => rowEl.appendChild(box))
    document.body.appendChild(rowEl)
})