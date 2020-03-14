// Make an instance of two and place it on the page.
var elem = document.getElementById('canvas-container');

var height = 800
var params = { width: height, height };
var two = new Two(params).appendTo(elem);

var size = 10

var rectSize = height/size

var pixels = []

function getMatrix() {
    matrix = []
    for (var y = 0; y < size; y++) {
        var row = []
        for (var x = 0; x < size; x++) {
            row.push(false)
        }
        matrix.push(row)
    }
    return matrix
}

pixels = getMatrix()

pixels[6][5] = true
pixels[6][6] = true
pixels[6][7] = true

var generation = 0

function render() {
    two.clear()

    let newPixels = getMatrix()

    for (var y = 0; y < pixels.length; y ++) {
        var linePixels = pixels[y]
        for (var x = 0; x < linePixels.length; x++) {
            //count number of neighbors for that particular cell
            var neighbors = 0
            for (var deltaY = -1; deltaY < 2; deltaY++) {
                for (var deltaX = -1; deltaX < 2; deltaX++) {

                    var circle = two.makeCircle((x+1)*((x-deltaX) * rectSize/2), (y+1)*((y-deltaY) * rectSize/2), 1)
                    circle.fill = "red"

                    if (
                        pixels[y-deltaY] !== undefined &&
                        pixels[y-deltaY][x - deltaX] !== undefined &&
                        pixels[y - deltaY][x - deltaX] === true
                    ) {
                        neighbors++
                    }
                }
            }
            neighbors = neighbors - 1
            if (neighbors < 0) {
                neighbors = 0
            }
            console.log(neighbors)

            // check cell
            if (pixels[y][x]) {
                // if a cell is dead check if there is
                if (!(neighbors == 2 || neighbors == 3)) {
                    newPixels[y][x] = false
                }
                
            } else {
                if (neighbors == 3) {
                    newPixels[y][x] = true
                }
            }

            // actually render the cell

            var rect = two.makeRectangle((x+1)*(rectSize/2), (y+1)*(rectSize/2), rectSize/2, rectSize/2);
            if (newPixels[y][x]){
                rect.fill = "black";
            } else {
                rect.fill = "white"
            }
        }
    }
    pixels = newPixels
    
    two.update();
}

render()

// function newGeneration() {
//     generation += 1

//     console.log(generation)

//     two.clear()

//     for (var y = 0; y < pixels.length; y ++) {
//         var linePixels = pixels[y]
//         for (var x = 0; x < linePixels.length; x++) {
//             //count number of neighbors for that particular cell
//             var neighbors = 0
//             for (var deltaY = -1; deltaY < 2; deltaY++) {
//                 for (var deltaX = -1; deltaX < 2; deltaX++) {
//                     if (
//                         pixels[y-deltaY] !== undefined &&
//                         pixels[y-deltaY][x - deltaX] !== undefined &&
//                         pixels[y - deltaY][x - deltaX] === true
//                     ) {
//                         neighbors++
//                     }
//                 }
//             }
//             neighbors = neighbors - 1
//             if (neighbors < 0) {
//                 neighbors = 0
//             }
//             console.log(neighbors)

//             // check cell
//             if (pixels[y][x]) {
//                 // if a cell is dead check if there is
//                 if (!(neighbors == 2 || neighbors == 3)) {
//                     pixels[y][x] = false
//                 }
                
//             } else {
//                 if (neighbors == 3) {
//                     pixels[y][x] = true
//                 }
//             }

//             // actually render the cell
//             var rect = two.makeRectangle((x+1)*(rectSize/2), (y+1)*(rectSize/2), rectSize, rectSize);
//             if (pixels[y][x]){
//                 rect.fill = "black";
//             } else {
//                 rect.fill = "white"
//             }
//             rect.linewidth = 1
//             rect.stroke = "rgba(255,0,0,0.3)"
//         }
//     }
    
//     two.update();
// }

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// two.clear()

// for (var y = 10; y < 600; y += 20) {
//     for (var x = 10; x < 600; x += 20) {
//         var rect = two.makeRectangle(x, y, 20, 20);

//         rect.fill = getRandomColor();
//         rect.opacity = Math.random();
//         rect.noStroke();
//     }
// }

// two.update();

//newGeneration()


