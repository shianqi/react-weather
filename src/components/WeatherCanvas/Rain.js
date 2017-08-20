import Point from './Point'

class Rain extends Point {
    constructor(args) {
        super(args)
        this.x_speed = Math.random() - 0.5
        this.y_speed = Math.random()*3 + 6
        this.style = `rgba(90,191,246,${Math.random() + 0.2})`
        this.diameter = Math.random() * 2 + 1
    }
}

export default Rain
