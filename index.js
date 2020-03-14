// Make an instance of two and place it on the page.

class PixelArray {

    constructor(width, height, xSize, ySize) {
        this.xSize = xSize
        this.ySize = ySize
        this.width = width
        this.height = height
        this.two = new Two({ width, height, type: Two.Types.canvas })
            .appendTo(document.getElementById('canvas-container'))
        this.pixels = this.createMatrix()
    }

    createMatrix() {
        let matrix = []
        for (let y = 0; y < this.ySize; y++) {
            let row = []
            for(let x = 0; x < this.xSize; x++)
                row.push(0)
            matrix.push(row)
        }
        return matrix
    }


    getPixel(x, y) {
        if (this.pixels[y] === undefined || this.pixels[y][x] === undefined) {
            return false
        }
        return this.pixels[y][x]
    }

    setPixel(x, y, value) {
        this.pixels[y][x] = value
    }

    render() {
        let pixelSize = this.width / this.xSize
        for (let y = 0; y < this.ySize; y++) {
            for(let x = 0; x < this.xSize; x++) {
                let rect = this.two.makeRectangle(x * pixelSize + pixelSize/2, y * pixelSize + pixelSize/2, pixelSize, pixelSize)
                if (this.pixels[y][x]) {
                    rect.fill = 'red'
                } else {
                    rect.fill = 'green'
                }
            }
        }
        this.two.update()
    }

    clear() {
        this.pixels = this.createMatrix()
        this.render()
    }

    getNeighbours(x, y) {
        let neighbours = 0
        neighbours += this.getPixel(x - 1, y)
        neighbours += this.getPixel(x - 1, y - 1)
        neighbours += this.getPixel(x - 1, y + 1)
        neighbours += this.getPixel(x, y - 1)
        neighbours += this.getPixel(x, y + 1)
        neighbours += this.getPixel(x + 1, y)
        neighbours += this.getPixel(x + 1, y - 1)
        neighbours += this.getPixel(x + 1, y + 1)
        return neighbours
    }

    nextGeneration() {
        let newPixels = this.createMatrix()
        for (let y = 0; y < this.ySize; y++) {
            for(let x = 0; x < this.xSize; x++) {
                //console.log(this.getNeighbours(x, y))
                if (!this.getPixel(x, y) && this.getNeighbours(x, y) === 3) {
                    newPixels[y][x] = true
                }
                if (this.getPixel(x, y) && (this.getNeighbours(x, y) !== 3 || this.getNeighbours(x, y) !== 2)) {
                    newPixels[y][x] = false
                }
                if (this.getPixel(x, y) && (this.getNeighbours(x, y) === 3 || this.getNeighbours(x, y) === 2)) {
                    newPixels[y][x] = true
                }
            }
        }
        this.pixels = newPixels
        this.render()
    }

}

let pixelArray = new PixelArray(900, 900, 50, 50)

// square
// pixelArray.setPixel(5, 5, true)
// pixelArray.setPixel(6, 5, true)
// pixelArray.setPixel(5, 6, true)
// pixelArray.setPixel(6, 6, true)

// ocillator
// pixelArray.setPixel(5, 5, true)
// pixelArray.setPixel(6, 5, true)
// pixelArray.setPixel(7, 5, true)

pixelArray.setPixel(1, 0, true)
pixelArray.setPixel(0, 2, true)
pixelArray.setPixel(2, 1, true)
pixelArray.setPixel(1, 2, true)
pixelArray.setPixel(2, 2, true)

pixelArray.render()

//console.log(pixelArray.getNeighbours(6, 5))

function loop() {
    // pixelArray.setPixel(Math.floor(Math.random()*50), Math.floor(Math.random()*50), 1)
    // pixelArray.render()
    pixelArray.nextGeneration()
    setTimeout(loop, 50)
}

loop()


console.log('rendered!')



