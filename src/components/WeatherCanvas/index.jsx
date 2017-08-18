import React, { Component } from 'react'

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

        /**
         *
         */
        class Point {
            constructor() {
                this.x = Math.random() * canvas.width
                this.y = 0
                this.x_speed = 0
                this.y_speed = 5
                this.style = 'rgb(255,255,255)'
                this.diameter = 3
                this.isLive = true
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

            shouldRemove() {
                if(this.x > canvas.width || this.x < 0) {
                    this.isLive = false
                }
                if(this.y > canvas.height || this.y < 0) {
                    this.isLive = false
                }
            }
        }

        class Rain extends Point {
            constructor(args) {
                super(args)
                this.x_speed = Math.random() - 0.5
                this.y_speed = Math.random()*3 + 6
                this.style = 'rgb(90,191,246)'
                this.diameter = 2
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
                this.pointArray.push(new Thunder())

                canvas.addEventListener('mousemove', this.updateMouse, false)
                this.nextPosition()
            }

            updateMouse = (e)=> {
                this.mouse.px = this.mouse.x
                this.mouse.py = this.mouse.y

                this.mouse.x = e.clientX
                this.mouse.y = e.clientY

                this.mouse.vx = this.mouse.x - this.mouse.px
                this.mouse.vy = this.mouse.y - this.mouse.py

                console.log(this.mouse.x, this.mouse.y)
                this.makeWind()
            }

            nextPosition = ()=> {
                ctx.fillStyle = this.fillStyle
                ctx.fillRect(0, 0, canvas.width, canvas.height)

                this.pointArray.push(new Rain())
                this.pointArray.push(new Snow())

                for(let i=0;i<this.pointArray.length;i++) {
                    this.pointArray[i].draw()
                }
                this.pointArray = this.pointArray.filter((item)=>{
                    return item.isLive
                })
                requestAnimationFrame(this.nextPosition)
            }

            makeWind = ()=> {

            }
        }

        new Weather().draw()
    }

    render() {
        return (
            <div>
                <canvas id="weather-canvas">您的设备不支持Canvas</canvas>
            </div>
        )
    }
}

export default WeatherCanvas