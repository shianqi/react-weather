import React, { Component } from 'react'
import img_background from './img/sidebar-bg.png'
import img_cloud from './img/cloud_img.png'
import img_sand from './img/sand_img.png'

class WeatherCanvas extends Component {
    componentDidMount() {
        const canvas = document.getElementById('weather-canvas')
        const ctx = canvas.getContext('2d')

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        window.onresize = function() {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        document.documentElement.style.overflowY = 'hidden'
        window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame

        const canvasImg = document.getElementById('background')
        const cloud_element = document.getElementById('cloud')
        const sand_element = document.getElementById('sand')

        class Point {
            constructor() {
                this.x = Math.random() * canvas.width
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
                ctx.beginPath()
                ctx.lineCap = 'round'
                ctx.lineWidth = this.diameter
                ctx.strokeStyle= this.style
                ctx.moveTo(this.x, this.y)
                this.nextPosition()
                ctx.lineTo(this.x, this.y)
                ctx.stroke()
                ctx.closePath()
                this.shouldRemove()
            }

            nextPosition() {
                this.x += this.x_speed
                this.y += this.y_speed
            }

            getDist(point) {
                const tx = this.x - point.x
                const ty = this.y - point.y
                return Math.sqrt(tx * tx + ty * ty)
            }

            makeWind = (mouse)=> {
                if(this.getDist(mouse) < this.mouseSize) {
                    this.x_speed += mouse.vx * this.mousePower
                    this.y_speed += mouse.vy * this.mousePower
                }
            }

            shouldRemove() {
                if(this.x > canvas.width * 1.2 || this.x < canvas.width * -0.2) {
                    this.isLive = false
                }
                if(this.y > canvas.height * 1.2 || this.y < canvas.height * -0.) {
                    this.isLive = false
                }
            }
        }

        class Rain extends Point {
            constructor(args) {
                super(args)
                this.x_speed = Math.random() - 0.5
                this.y_speed = Math.random()*3 + 6
                this.style = `rgba(90,191,246,${Math.random() + 0.2})`
                this.diameter = Math.random() * 2 + 1
            }
        }

        class Snow extends Point {
            constructor(args) {
                super(args)
                this.x_speed = Math.random() * 2 - 1
                this.y_speed = Math.random()* 0.6 + 0.5
                this.style = `rgba(255,255,255,${Math.random() + 0.2})`
                this.diameter = Math.random() * 5 + 2
            }

            nextPosition() {
                super.nextPosition()
            }
        }

        class Thunder {
            constructor() {
                this.isLive = true
                this.alpha = 0
                this.interval = 15
                this.nowInterval = 0
            }

            draw() {
                ctx.fillStyle = `rgba(255,255,255,${this.alpha})`
                ctx.fillRect(0, 0, canvas.width, canvas.height)

                this.nextPosition()
            }

            makeWind() {

            }

            nextPosition() {
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

        /**
         * 雾
         */
        class Fog extends Point {
            constructor(args) {
                super(args)
                this.x = 0
                this.y = Math.random() * canvas.height * 0.85
                this.x_speed = Math.random() * 1.2 + 0.3
                this.y_speed = Math.random() * 0.2 - 0.1
                this.style = `rgba(90,191,246,${Math.random() + 0.2})`
                this.diameter = Math.random() * 2 + 1

            }

            draw() {
                ctx.beginPath()
                ctx.lineCap = 'round'
                ctx.lineWidth = this.diameter
                ctx.strokeStyle= this.style
                ctx.globalAlpha = 0.3
                ctx.drawImage(
                    cloud_element,
                    this.x - cloud_element.width/2,
                    this.y - cloud_element.height/2,
                    cloud_element.width/2,
                    cloud_element.height/2
                )
                ctx.globalAlpha = 1
                //ctx.moveTo(this.x, this.y)
                this.nextPosition()
                //ctx.lineTo(this.x, this.y)
                ctx.stroke()
                ctx.closePath()
                this.shouldRemove()
            }
        }

        class Cloud extends Point {
            constructor(args) {
                super(args)
                this.x = Math.random() * canvas.width - canvas.width * 0.2
                this.y = Math.random() * canvas.height * 0.2 + canvas.height * 0.1
                this.x_speed = Math.random() * 0.6 + 0.2
                this.y_speed = 0
                this.style = `rgba(90,191,246,${Math.random() + 0.2})`
                this.diameter = Math.random() * 2 + 1

            }

            draw() {
                ctx.beginPath()
                ctx.lineCap = 'round'
                ctx.lineWidth = this.diameter
                ctx.strokeStyle= this.style
                ctx.globalAlpha = 0.9
                ctx.drawImage(cloud_element, this.x - cloud_element.width/2, this.y - cloud_element.height/2)
                ctx.globalAlpha = 1
                //ctx.moveTo(this.x, this.y)
                this.nextPosition()
                //ctx.lineTo(this.x, this.y)
                ctx.stroke()
                ctx.closePath()
                this.shouldRemove()
            }
        }

        class SandStorm extends Point {
            constructor(args) {
                super(args)
                this.x = 0
                this.y = Math.random() * canvas.height * 0.8
                this.x_speed = Math.random() * 10  - 0.5
                this.y_speed = Math.random() - 0.5
                this.style = `rgba(90,191,246,${Math.random() + 0.2})`
                this.diameter = Math.random() * 2 + 1

            }

            draw() {
                ctx.beginPath()
                ctx.lineCap = 'round'
                ctx.lineWidth = this.diameter
                ctx.strokeStyle= this.style
                ctx.globalAlpha = 0.04
                ctx.drawImage(sand_element, this.x - sand_element.width/2, this.y - sand_element.height/2)
                ctx.globalAlpha = 1
                //ctx.moveTo(this.x, this.y)
                this.nextPosition()
                //ctx.lineTo(this.x, this.y)
                ctx.stroke()
                ctx.closePath()
                this.shouldRemove()
            }
        }

        class Weather {
            constructor() {
                this.fillStyle = 'rgba(0,0,0,0.5)'
                this.pointArray = []
                this.mouse = {
                    vx : 0,
                    vy : 0,
                    px : 0,
                    py : 0,
                    x : 0,
                    y : 0
                }
            }

            draw = ()=> {
                //this.pointArray.push(new Thunder())
                canvas.addEventListener('touchstart', this.updateTouchStart, {
                    capture: false,
                    passive: true,
                    once: false
                })
                canvas.addEventListener('touchmove', this.updateTouch, {
                    capture: false,
                    passive: false,
                    once: false
                })
                canvas.addEventListener('mousemove', this.updateMouse, {
                    capture: false,
                    passive: true,
                    once: false
                })
                this.nextPosition()
            }

            updateTouchStart = (e)=> {
                this.mouse.x = e.touches[0].pageX
                this.mouse.y = e.touches[0].pageY
            }

            updateTouch = (e)=> {
                e.preventDefault()
                this.mouse.px = this.mouse.x
                this.mouse.py = this.mouse.y

                this.mouse.x = e.touches[0].pageX
                this.mouse.y = e.touches[0].pageY

                this.mouse.vx = this.mouse.x - this.mouse.px
                this.mouse.vy = this.mouse.y - this.mouse.py

                this.makeWind(this.mouse)
            }

            updateMouse = (e)=> {
                this.mouse.px = this.mouse.x
                this.mouse.py = this.mouse.y

                this.mouse.x = e.clientX
                this.mouse.y = e.clientY

                this.mouse.vx = this.mouse.x - this.mouse.px
                this.mouse.vy = this.mouse.y - this.mouse.py

                this.makeWind(this.mouse)
            }

            nextPosition = ()=> {
                ctx.fillStyle = this.fillStyle
                // ctx.fillRect(0, 0, canvas.width, canvas.height)

                this.drawBackground()

                //this.pointArray.push(new Rain())
                //this.pointArray.push(new Fog())
                //this.pointArray.push(new Cloud())
                //this.pointArray.push(new SandStorm())
                this.addPoint(Snow, 1)

                for(let i=0;i<this.pointArray.length;i++) {
                    this.pointArray[i].draw()
                }
                this.pointArray = this.pointArray.filter((item)=>{
                    return item.isLive
                })
                requestAnimationFrame(this.nextPosition)
            }

            addPoint = (Ele, probability)=> {
                if(probability===1) {
                    this.pointArray.push(new Ele())
                }else if(Math.random() < probability) {
                    this.pointArray.push(new Ele())
                }
            }

            drawBackground = ()=> {
                let scale = 0
                if(canvas.height > canvas.width) {
                    scale = canvas.height / canvasImg.height
                    ctx.globalAlpha = 0.5
                    const _x = (canvasImg.width*scale - canvas.width) /2
                    ctx.drawImage(canvasImg, -_x, 0, canvasImg.width * scale, canvasImg.height * scale)
                    ctx.globalAlpha = 1
                }else{
                    scale = canvas.width / canvasImg.width
                    ctx.globalAlpha = 0.5
                    const _y = (canvasImg.height*scale - canvas.height) /2
                    ctx.drawImage(canvasImg, 0, -_y, canvasImg.width * scale, canvasImg.height * scale)
                    ctx.globalAlpha = 1
                }


            }

            makeWind = (mouse)=> {
                for(let i=0;i<this.pointArray.length;i++) {
                    this.pointArray[i].makeWind(mouse)
                }
            }
        }

        new Weather().draw()
    }

    render() {
        return (
            <div>
                <canvas id="weather-canvas">您的设备不支持Canvas</canvas>
                <img id="background" src={ img_background } />
                <img id="cloud" src={ img_cloud } />
                <img id="sand" src={ img_sand } />
            </div>
        )
    }
}

export default WeatherCanvas