import React, { Component } from 'react'
import WeatherCanvas from './WeatherCanvas'
import 'normalize.css'
import './font.css'


import Style from './style.css'

class App extends Component {
    render() {
        return (
            <div className={Style['background']}>
                <WeatherCanvas/>
            </div>
        )
    }
}

export default App
