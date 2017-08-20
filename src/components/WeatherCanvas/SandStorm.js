import Point from './Point'
import img_sand from './img/sand_img.png'

class SandStorm extends Point {
    constructor(args) {
        super(args)
        this.x = 0
        this.y = Math.random() * this.canvas.height * 0.8
        this.x_speed = Math.random() * 10 - 0.5
        this.y_speed = Math.random() - 0.5
        this.style = `rgba(90,191,246,${Math.random() + 0.2})`
        this.diameter = Math.random() * 2 + 1

    }

    draw() {
        const sand_element = document.createElement('img')
        sand_element.src = img_sand
        this.ctx.beginPath()
        this.ctx.lineCap = 'round'
        this.ctx.lineWidth = this.diameter
        this.ctx.strokeStyle= this.style
        this.ctx.globalAlpha = 0.04
        this.ctx.drawImage(sand_element, this.x - sand_element.width/2, this.y - sand_element.height/2)
        this.ctx.globalAlpha = 1
        this.nextPosition()
        this.ctx.stroke()
        this.ctx.closePath()
        this.shouldRemove()
    }
}

export default SandStorm
