import React, { Component } from 'react';
import { getCurrentLongtLati } from '../../helper/helper-functions';
import * as BACKEND from '../../helper/backend';

export default class Aqi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentAqi: {
                status: null,
                data: null
            },
            searchAqi: {
                status: null,
                data: null
            }
        }
    }

    render() {
        const { currentAqi, searchAqi } = this.state;
        console.log(this.state);

        return (
            <div className="content">
                <div className="container-fluid">
                    <section className="todo-list-container">
                        {
                            currentAqi.data ? <div>
                                <p>Last updated: {currentAqi.data.time.s}</p>
                                <p>AQI: {currentAqi.data.aqi}</p>
                                <p>Location: {currentAqi.data.city.name}</p>
                                <p>Dominant: {currentAqi.data.dominentpol}</p>
                                <p>iaqi</p>
                            </div> : null
                        }
                        <div>
                            <div><input type="text" onChange={(event) => { this.searchAqi(event) }} /></div>
                            <div>
                                {
                                    searchAqi.data ? searchAqi.data.map((aqiData) => {
                                        return <div style={{ border: 'solid 1px grey' }}>
                                            <p>Last updated: {aqiData.time.stime}</p>
                                            <p>AQI: {aqiData.aqi}</p>
                                            <p>Location: {aqiData.station.name}, {aqiData.station.country}</p>
                                            <p>iaqi</p>
                                        </div>;
                                    }) : null
                                }
                            </div>
                        </div>
                    </section>
                </div>
            </div>

        )
    }

    componentDidMount = () => {
        getCurrentLongtLati().then((position) => {
            const payload = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
            BACKEND.post('/aqi/get-aqi-information', { payload }).then((currentAqi) => {
                this.setState({ currentAqi: currentAqi.data });
            }, (error) => { });
        }, (error) => {
            console.log(error);
        })
    }

    searchAqi = (event) => {
        BACKEND.post('/aqi/get-aqi-information', { payload: { keyword: event.target.value } }).then((aqiData) => {
            this.setState({ searchAqi: aqiData.data });
        }, (error) => { });
    }


    colorize = (aqi, specie) => {
        specie = specie || "aqi"
        if (["pm25", "pm10", "no2", "so2", "co", "o3", "aqi"].indexOf(specie) < 0) return aqi;

        var spectrum = [
            { a: 0, b: "#cccccc", f: "#ffffff" },
            { a: 50, b: "#009966", f: "#ffffff" },
            { a: 100, b: "#ffde33", f: "#000000" },
            { a: 150, b: "#ff9933", f: "#000000" },
            { a: 200, b: "#cc0033", f: "#ffffff" },
            { a: 300, b: "#660099", f: "#ffffff" },
            { a: 500, b: "#7e0023", f: "#ffffff" }
        ];


        var i = 0;
        for (i = 0; i < spectrum.length - 2; i++) {
            if (aqi == "-" || aqi <= spectrum[i].a) break;
        };
        return $("<div/>")
            .html(aqi)
            .css("font-size", "120%")
            .css("min-width", "30px")
            .css("text-align", "center")
            .css("background-color", spectrum[i].b)
            .css("color", spectrum[i].f)

    }

}
