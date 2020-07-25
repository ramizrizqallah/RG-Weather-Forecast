import React, { Component } from 'react'
import '../style/Second.css'
import {Link} from 'react-router-dom';


export class SecondPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            day: "Wednesday",
            date: "17/7/2020",
            pic: `${require(`../assets/01d.png`)}`,
            temp: "40°",
            status: "Clear",
            feels: "33/40 Feels Like 30",
            speed:"20 km/h",
            humidity:"100%",
            pressure:"1020",
            sea:"1029",
            lat:"34.43423",
            lon:"31.432423",

        }
    }
    
    render() {
        var fullDate = (this.props.convert(this.props.data.list[this.props.index].dt).split(" "));
        var onlyDay = fullDate[0];
        var onlyDate = fullDate[1];
        return (
            <React.Fragment>
            <div className="second">
                <Link to="/">
                <img id="back" src={require('../assets/back.png')} alt="sun" onClick={this.handleClick}/>
                </Link>
                
                <h1 className="text" id="day">{onlyDay}</h1>

                <h3 className="text3" id="date" style={{margin: '5px'}}>{onlyDate}</h3>

                <div id="pic-temp">
                    <img id="pic" src={`${require(`../assets/${this.props.data.list[this.props.index].weather[0].icon}.png`)}`} alt="sun" />
                    <h1 className="text" id="temp">{`${Math.round(this.props.data.list[this.props.index].main.temp)}°`}</h1>
                </div>

                <h1 className="text" id="status">{this.props.data.list[this.props.index].weather[0].main}</h1>
                <h3 className="text3" id="min-max-feels">{`Feels Like: ${Math.round(this.props.data.list[this.props.index].main.feels_like)}°`}</h3>

                <hr style={{
                    width: '50%'
                }}></hr>

                <div className="extra-info">
                    <div id="left">
                        <h2 className="text2">{"Ground Level: " + this.props.data.list[this.props.index].main.grnd_level}</h2>
                        <h2 className="text2">{"Wind Speed: " +this.props.data.list[this.props.index].wind.speed + "km/h"}</h2>
                        <h2 className="text2">{"Latitude: " + this.props.data.city.coord.lat+"°"}</h2>
                        <h2 className="text2">{"Pressure: " + this.props.data.list[this.props.index].main.pressure}</h2>
                    </div>
                    <div id="right">
                        <h2 className="text2">{"Sea Level: " + this.props.data.list[this.props.index].main.sea_level}</h2>
                        <h2 className="text2">{"Humidity: " + this.props.data.list[this.props.index].main.humidity+" %"}</h2>
                        <h2 className="text2">{"Longitude: " + this.props.data.city.coord.lon +"°"}</h2>
                        <h2 className="text2">{"Weather Description: " + this.props.data.list[this.props.index].weather[0].description}</h2>
                    </div>


                </div>
            </div>
            </React.Fragment>
        )
    }
}

export default SecondPage
