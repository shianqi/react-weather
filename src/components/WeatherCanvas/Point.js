class Point {
    constructor() {
        this.canvas = document.getElementById('weather-canvas')
        this.ctx = this.canvas.getContext('2d')
        this.x = Math.random() * this.canvas.width
        this.y = 0
        this.x_speed = 0
        this.y_speed = 5
        this.style = 'rgb(255,255,255)'
        this.diameter = 3
        this.isLive = true
        this.mouseSize = 150
        this.mousePower = 0.05
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.lineCap = 'round'
        this.ctx.lineWidth = this.diameter
        this.ctx.strokeStyle= this.style
        this.ctx.moveTo(this.x, this.y)
        this._nextPosition()
        this.ctx.lineTo(this.x, this.y)
        this.ctx.stroke()
        this.ctx.closePath()
        this.shouldRemove()
    }

    _nextPosition() {
        this.x += this.x_speed
        this.y += this.y_speed
    }

    _getDist(point) {
        const tx = this.x - point.x
        const ty = this.y - point.y
        return Math.sqrt(tx * tx + ty * ty)
    }

    makeWind = (mouse)=> {
        if(this._getDist(mouse) < this.mouseSize) {
            this.x_speed += mouse.vx * this.mousePower
            this.y_speed += mouse.vy * this.mousePower
        }
    }

    shouldRemove() {
        if(this.x > this.canvas.width * 1.2 || this.x < this.canvas.width * -0.2) {
            this.isLive = false
        }
        if(this.y > this.canvas.height * 1.2 || this.y < this.canvas.height * -0.) {
            this.isLive = false
        }
    }
}

export default Point
