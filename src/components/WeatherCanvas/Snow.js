import Point from './Point'

class Snow extends Point {
    constructor(args) {
        super(args)
        this.x_speed = Math.random() * 2 - 1
        this.y_speed = Math.random()* 0.6 + 0.5
        this.style = `rgba(255,255,255,${Math.random() + 0.2})`
        this.diameter = Math.random() * 5 + 2
    }
}

export default Snow
