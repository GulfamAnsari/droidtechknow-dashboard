import React, { Component } from 'react';
import { getCurrentLongtLati } from '../../helper/helper-functions';
import * as BACKEND from '../../helper/backend';
import { LOCATION_API_URL } from '../../constants';
import './Aqi.scss';

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
        const styleClass = {
            "gauge-container": {
                "gauge": {
                    "value": {
                        stroke: "#b8da65",
                        "stroke-width": 5
                    }
                }
            }
        }

        return (
            <div className="content">
                <div className="container-fluid">
                    <section className="__AQI">
                        {
                            currentAqi.data ?
                                <div class="card card-chart col-md-4">
                                    <div class="card-header card-header-primary">
                                        <h4 class="card-title">{currentAqi.data.city.name} (AQI)</h4>
                                    </div>
                                    <div className="card-body">
                                        <div>
                                            <div id="gauge" class="gauge-container"></div>
                                            {this.getAqiGauge(currentAqi.data.aqi, 'gauge')}
                                            <div className="card-category">
                                                <p>Dominant: {currentAqi.data.dominentpol}</p>
                                                <p>iaqi</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats"><i class="material-icons">access_time</i><p>Last updated: {currentAqi.data.time.s}</p></div>
                                    </div>
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
            console.log('There is error in fetching geolocation', error);
            alert('Please enable your real time location to fetch exact AQI');
            BACKEND.get(LOCATION_API_URL).then((locationData) => {
                const payload = {
                    latitude: locationData.data.lat,
                    longitude: locationData.data.lon
                }
                BACKEND.post('/aqi/get-aqi-information', { payload }).then((currentAqi) => {
                    this.setState({ currentAqi: currentAqi.data });
                }, (err) => { })
            }, (err) => { })
        })

    }

    searchAqi = (event) => {
        BACKEND.post('/aqi/get-aqi-information', { payload: { keyword: event.target.value } }).then((aqiData) => {
            this.setState({ searchAqi: aqiData.data });
        }, (error) => { });
    }


    getAqiGauge = (value, id) => {
        setTimeout(() => {
            window.Gauge(document.getElementById(id), {
                dialRadius: 40,
                dialStartAngle: 135,
                dialEndAngle: 45,
                value: value,
                max: 500,
                min: 0,
                valueDialClass: "value",
                valueClass: "value-text",
                dialClass: "dial",
                gaugeClass: "gauge",
                showValue: true,
                gaugeColor: null,
                label: function (val) { return Math.round(val); } // returns a string label that will be rendered in the center
            })
        }, 0)
    }


    // colorize = (aqi, specie) => {
    //     specie = specie || "aqi"
    //     if (["pm25", "pm10", "no2", "so2", "co", "o3", "aqi"].indexOf(specie) < 0) return aqi;

    //     var spectrum = [
    //         { a: 0, b: "#cccccc", f: "#ffffff" },
    //         { a: 50, b: "#009966", f: "#ffffff" },
    //         { a: 100, b: "#ffde33", f: "#000000" },
    //         { a: 150, b: "#ff9933", f: "#000000" },
    //         { a: 200, b: "#cc0033", f: "#ffffff" },
    //         { a: 300, b: "#660099", f: "#ffffff" },
    //         { a: 500, b: "#7e0023", f: "#ffffff" }
    //     ];


    //     var i = 0;
    //     for (i = 0; i < spectrum.length - 2; i++) {
    //         if (aqi == "-" || aqi <= spectrum[i].a) break;
    //     };
    //     return $("<div/>")
    //         .html(aqi)
    //         .css("font-size", "120%")
    //         .css("min-width", "30px")
    //         .css("text-align", "center")
    //         .css("background-color", spectrum[i].b)
    //         .css("color", spectrum[i].f)

    // }

}
