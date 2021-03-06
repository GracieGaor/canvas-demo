var yyy = document.getElementById('xxx')
var context = yyy.getContext('2d')
var lineWidth = 3

autosetCanvasSize(yyy)

listenToUser(yyy)

var eraserEnabled = false
pen.onclick = function(){
    eraserEnabled = false
    lineWidth = 3
    pen.classList.add('active')
    pen2.classList.remove('active')
    eraser.classList.remove('active')
}
pen2.onclick = function(){
    eraserEnabled = false
    lineWidth = 6
    pen2.classList.add('active')
    pen.classList.remove('active')
    eraser.classList.remove('active')
}
eraser.onclick = function(){
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
    pen2.classList.remove('active')
}
clear.onclick = function(){
    context.clearRect(0,0,yyy.width,yyy.height);
}

save.onclick = function(){
    var url = yyy.toDataURL("image/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = "picture"
    a.target = "_blank"
    a.click()
}
black.onclick = function(){
    context.strokeStyle = "black";
    black.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    yellow.classList.remove('active')
}
red.onclick = function(){
    context.strokeStyle = "red"
    red.classList.add('active')
    blue.classList.remove('active')
    yellow.classList.remove('active')
    black.classList.remove('active')
}
blue.onclick = function(){
    context.strokeStyle = "blue";
    blue.classList.add('active')
    red.classList.remove('active')
    yellow.classList.remove('active')
    black.classList.remove('active')
}
yellow.onclick = function(){
    context.strokeStyle = "yellow";
    yellow.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    black.classList.remove('active')
}

/*****/
function autosetCanvasSize(canvas) {
    setCanvasSize()
    window.onresize = function () {
        setCanvasSize()
    }
    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

function listenToUser(canvas) {
    var using = false
    var lastPoint = { x: undefined, y: undefined }
    if (document.body.ontouchstart !== undefined) {
        canvas.ontouchstart = function (aaa) {
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = { "x": x, "y": y }
            }
        }
        canvas.ontouchmove = function (aaa) {
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            if (!using) { return }
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = { "x": x, "y": y }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.ontouchend = function () {
            using = false
        } //触屏设备
    } else {
        canvas.onmousedown = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = { "x": x, "y": y }
            }
        }
        canvas.onmousemove = function (aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            if (!using) { return }
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = { "x": x, "y": y }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.onmouseup = function (aaa) {
            using = false
        }//非触屏设备
    }
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1) // 起点
    context.lineWidth = lineWidth
    context.lineTo(x2, y2) // 终点
    context.stroke()
    context.closePath()
}

