class Thunder {
    constructor() {
        this.canvas = document.getElementById('weather-canvas')
        this.ctx = this.canvas.getContext('2d')
        this.isLive = true
        this.alpha = 0
        this.interval = 15
        this.nowInterval = 0
    }

    draw() {
        this.ctx.fillStyle = `rgba(255,255,255,${this.alpha})`
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        this._nextPosition()
    }

    makeWind() {

    }

    _nextPosition() {
        if(Math.random()<0.002) {
            this.alpha = 0.7
            this.nowInterval = this.interval
        }

        if(this.nowInterval>1) {
            this.nowInterval--
        }else if(this.nowInterval===1) {
            this.alpha = 1
            this.nowInterval = 0
        }
        if(this.alpha>=0) {
            this.alpha = this.alpha - 0.06
        }
    }
}

export default Thunder
