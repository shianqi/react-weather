import Point from './Point'
import img_cloud from './img/cloud_img.png'

class Cloud extends Point {
    constructor(args) {
        super(args)
        this.x = Math.random() * this.canvas.width - this.canvas.width * 0.2
        this.y = Math.random() * this.canvas.height * 0.2 + this.canvas.height * 0.1
        this.x_speed = Math.random() * 0.6 + 0.2
        this.y_speed = 0
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
        this.ctx.globalAlpha = 0.9
        this.ctx.drawImage(cloud_element, this.x - cloud_element.width/2, this.y - cloud_element.height/2)
        this.ctx.globalAlpha = 1
        this.nextPosition()
        this.ctx.stroke()
        this.ctx.closePath()
        this.shouldRemove()
    }
}

export default Cloud
