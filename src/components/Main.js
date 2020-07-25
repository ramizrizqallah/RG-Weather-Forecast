import React, { Component } from 'react'
import '../style/Style.css';
import Table from './Table'
import '../style/Table.css'
import axios from 'axios';
import SecondPage from './SecondPage';
import Header from './Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export class Main extends Component {

    constructor(props) {
        super(props)
        this.state = {
            jsonData: {},
            name: "Bethlehem",
            date: "Wed 15/7/2020",
            maxTemp: '20°',
            minTemp: "19°",
            feels: "19.5°",

            status: "Clear",

            windSpeed: "17 km/h",
            humidity: "29%",
            pressure: "1",

            nextDay: "Thu",
            dayAfter: "Fri",
            lastDay: "Sat",

            statusImage: `${require('../assets/01d.png')}`,

            tempName: "",

            lon: "-0.118092",
            lat: "51.509865",

            index: {},
        }


    }
    onChange = (e) => {
        this.setState({
            tempName: e.target.value
        });
    }

    submit = (e) => {
        e.preventDefault();
        //Call API
        try {
            axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${this.state.tempName}&appid=ad8cc942e17c8f242593e8d4a5bc5eb2&units=metric`)
                .then(resp => {
                    console.log(resp)
                    this.setState({
                        
                        maxTemp: `${Math.round(resp.data.list[0].main.temp_max)}°`,
                        minTemp: `${Math.round(resp.data.list[0].main.temp_min)}°`,
                        feels: `${Math.round(resp.data.list[0].main.feels_like)}°`,
                        status: `${resp.data.list[0].weather[0].main}`,
                        date: this.convert(resp.data.list[0].dt),
                        windSpeed: `${resp.data.list[0].wind.speed} km/h`,
                        humidity: ` ${resp.data.list[0].main.humidity} %`,
                        pressure: resp.data.list[0].main.pressure,
                        statusImage: `${require(`../assets/${resp.data.list[0].weather[0].icon}.png`)}`,
                        name: this.state.tempName,
                        jsonData: resp.data,
                    })
                })

        }
        catch (error) {
            console.log(error);
            //alert("The City You Requested Was Not Found! Use Proper English Next Time :)")
        }



    }

    convert = (unix) => {
        var date = new Date(unix * 1000);
        //console.log(date);
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        var day = weekday[date.getDay()];
        

        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var dayOfMonth = date.getDate();

        var format = `${day} ${dayOfMonth}/${month}/${year}`;

        return format;



    }

    componentDidMount() {
        if (navigator.geolocation) {
            
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position.coords)
                this.setState({

                    lon:  position.coords.longitude,
                    lat: position.coords.latitude,

                })

                
                
            })
            //console.log(this.state.lat,this.state.lon)
            axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${this.state.lat}&lon=${this.state.lon}&appid=ad8cc942e17c8f242593e8d4a5bc5eb2&units=metric`)
            .then(resp => {
                console.log(resp)
                this.setState({
                 
                    maxTemp: `${Math.round(resp.data.list[0].main.temp_max)}°`,
                    minTemp: `${Math.round(resp.data.list[0].main.temp_min)}°`,
                    feels: `${Math.round(resp.data.list[0].main.feels_like)}°`,
                    status: resp.data.list[0].weather[0].main,
                    date: this.convert(resp.data.list[0].dt),
                    statusImage: `${require(`../assets/${resp.data.list[0].weather[0].icon}.png`)}`,
                    windSpeed: `${resp.data.list[0].wind.speed} km/h`,
                    humidity: ` ${resp.data.list[0].main.humidity} %`,
                    pressure: resp.data.list[0].main.pressure,
                    jsonData: resp.data,
                    tempName: resp.data.city.name,
                    name: resp.data.city.name,
                })
                //console.log(this.state.name)
            })

        }
        else {
            console.error("Error")
        }

    }
    render() {
        return (
            <Router>

                <React.Fragment>
                    <Header />

                    <Route exact path="/">

                        <div className="main" >
                            <div>
                                <h1 className='main-text' id="name" >{this.state.name}</h1>
                                <h5 className='main-text' id="date"> {this.state.date} </h5>
                                <div className="temperatures">
                                    <h1 className='temp' id="maxTemp">{this.state.maxTemp}</h1>
                                    <h2 className='temp' id="minTemp">{this.state.minTemp}</h2>
                                </div>

                                <h5 className='temp' id="feels">Feels Like: {this.state.feels}</h5>
                            </div>

                            <div id="middleDiv">
                                <img id="statusImage" src={this.state.statusImage} alt="Weather Status" />
                                <h1 className='main-text'> {this.state.status} </h1>
                            </div>

                            <div >
                                <form onSubmit={this.submit}>

                                    <input id="search" type="search" placeholder="Look for your country..." onChange={this.onChange}

                                    ></input>
                                    <input id="searchBtn" type="submit" value="Search" ></input>

                                </form>
                                <div id="info">

                                    <h3 className='main-text'>Wind Speed: {this.state.windSpeed} </h3>
                                    <h3 className='main-text'>Humidity:         {this.state.humidity} </h3>
                                    <h3 className='main-text'>{"Pressure: " + this.state.pressure} </h3>

                                </div>

                            </div>

                        </div>
                        <div style={{
                            height: '20px'
                        }}></div>

                       <footer className="footer">

                        <Table data={this.state.jsonData} convert={this.convert} />
                       </footer>
                    </Route>



                    <Route path="/Today">
                        <SecondPage data={this.state.jsonData} convert={this.convert} name={(this.state.date).substring(0,3)} index={0}/>    
                    </Route>
                    <Route path="/SecondDay">
                        <SecondPage data={this.state.jsonData} convert={this.convert} name={(this.state.date).substring(0,3)} index={8}/>    
                    </Route>
                    <Route path="/ThirdDay">
                        <SecondPage data={this.state.jsonData} convert={this.convert} name={(this.state.date).substring(0,3)} index={16}/>    
                    </Route>
                    <Route path="/FourthDay">
                        <SecondPage data={this.state.jsonData} convert={this.convert} name={(this.state.date).substring(0,3)} index={24}/>    
                    </Route>
                    <Route path="/FifthDay">
                        <SecondPage data={this.state.jsonData} convert={this.convert} name={(this.state.name).substring(0,3)} index={32}/>    
                    </Route>



                </React.Fragment>


            </Router>


        )
    }


}





export default Main
