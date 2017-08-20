import React, { Component } from 'react'
import img_background1 from './img/background1.png'
import img_background2 from './img/background2.png'
import img_background3 from './img/background3.png'
import img_background4 from './img/background4.png'

import Cloud from './Cloud'
import Fog from './Fog'
import Rain from './Rain'
import SandStorm from './SandStorm'
import Snow from './Snow'
import Thunder from './Thunder'

class WeatherCanvas extends Component {
    constructor(props) {
        super(props)
    }

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

        const background_element1 = document.createElement('img')
        background_element1.src = img_background1
        const background_element2 = document.createElement('img')
        background_element2.src = img_background2
        const background_element3 = document.createElement('img')
        background_element3.src = img_background3
        const background_element4 = document.createElement('img')
        background_element4.src = img_background4

        class Weather {
            constructor() {
                this.fillStyle = 'rgba(0,0,0,0.5)'
                this.pointArray = []
                this.shiftX = 40
                this.shiftY = 10
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
                let dx = 0
                let dy = 0
                if(canvas.height > canvas.width) {
                    scale = canvas.height / background_element1.height
                    dx = (canvas.width - background_element1.width*scale) /2
                }else{
                    scale = canvas.width / background_element1.width
                    dy = (canvas.height - background_element1.height*scale) /2
                }
                const background = [
                    {
                        element: background_element1,
                        layer: 0
                    },
                    {
                        element: background_element2,
                        layer: 33.33
                    },
                    {
                        element: background_element3,
                        layer: 66.67
                    },
                    {
                        element: background_element4,
                        layer: 100
                    }
                ]
                background.forEach((item)=>{
                    const { element, layer } = item
                    const drawX = dx + (this.mouse.x - canvas.width / 2) / (canvas.width / 2) * this.shiftX * (layer/50-1)
                    const drawY = dy + (this.mouse.y - canvas.height / 2) / (canvas.height / 2) * this.shiftY * (layer/50-1)
                    ctx.drawImage(
                        element,
                        drawX - this.shiftX,
                        drawY - this.shiftY,
                        element.width * scale + 2 * this.shiftX,
                        element.height * scale + 2 *this.shiftY
                    )
                })
                ctx.globalAlpha = 1
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
            </div>
        )
    }
}

export default WeatherCanvas
