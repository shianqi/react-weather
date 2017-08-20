import Point from './Point'
import img_cloud from './img/cloud_img.png'

class Fog extends Point {
    constructor(args) {
        super(args)
        this.x = 0
        this.y = Math.random() * this.canvas.height * 0.85
        this.x_speed = Math.random() * 1.2 + 0.3
        this.y_speed = Math.random() * 0.2 - 0.1
        this.style = `rgba(90,191,246,${Math.random() + 0.2})`
        this.diameter = Math.random() * 2 + 1
    }

    draw() {
        const cloud_element = document.createElement('img')
        cloud_element.src = img_cloud
        this.ctx.beginPath()
        this.ctx.lineCap = 'round'
        this.ctx.lineWidth = this.diameter
        this.ctx.strokeStyle= this.style
        this.ctx.globalAlpha = 0.3
        this.ctx.drawImage(
            cloud_element,
            this.x - cloud_element.width/2,
            this.y - cloud_element.height/2,
            cloud_element.width/2,
            cloud_element.height/2
        )
        this.ctx.globalAlpha = 1
        this.nextPosition()
        this.ctx.stroke()
        this.ctx.closePath()
        this.shouldRemove()
    }
}

export default Fog
