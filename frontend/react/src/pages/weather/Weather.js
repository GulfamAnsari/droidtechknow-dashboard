import React, { Component } from 'react';
import * as BACKEND from '../../helper/backend';
import { LOCATION_API_URL } from '../../constants';
import './Weather.scss';
import * as Notiflix from '../../helper/notiflix';
import { SSL_OP_EPHEMERAL_RSA } from 'constants';

export default class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherData: {
                currently: {
                    apparentTemperature: '',
                    summary: '',
                    temperature: '',
                    time: '',
                    icon: '',
                    windGust: '',
                    windSpeed: '',
                    humidity: '',
                    uvIndex: '',
                    visibility: '',
                    pressure: '',
                    dewPoint: '',

                    precipProbability: 0,
                    cloudCover: 0.32,
                    nearestStormDistance: 0,
                    ozone: 278.4,
                    precipIntensity: 0,
                    windBearing: 313,
                }
            },
            currentLocation: {
                city: null,
                country: null
            },
            currentTime: { h: 'h', m: 'm', s: 's' },
            loading: false,
            error: {
                status: false,
                msg: ''
            }
        }
    }


    render() {
        const { weatherData, currentTime, currentLocation, loading, error } = this.state;
        return (
            <React.Fragment>
                {loading ? Notiflix.loading('Loading Weather App. Please wait...') : Notiflix.remove()}
                {error.status && !loading ? Notiflix.notify('Failure', error.msg) : ''}
                <div className="content">
                    <div className="container-fluid">
                        <section className="main __Weather">
                            <div className="w3_agile_main_grids">
                                <div className="w3layouts_main_grid row">
                                    <div className="w3layouts_main_grid_left">
                                        <h2>{currentLocation.city + ', ' + currentLocation.country}</h2>
                                        <p>{weatherData.currently.summary}</p>
                                        <h3>Now</h3>
                                        <h4>{weatherData.currently.temperature}<span>°c</span></h4>
                                        <p>Feels like {weatherData.currently.apparentTemperature}<span>°c</span></p>

                                    </div>
                                    <div className="w3layouts_main_grid_right">
                                        <canvas id={weatherData.currently.icon} width="70" height="70"></canvas>
                                        <div id="w3time">{currentTime.h + ":" + currentTime.m + ":" + currentTime.s}</div>
                                        {this.getData()}
                                    </div>
                                    <div className="clear"> </div>
                                </div>

                                <div className="agileits_w3layouts_main_grid row">
                                    <div className="agile_main_grid_left col-md-5">
                                        <div className="wthree_main_grid_left_grid">
                                            {this.currentWeatherInformationGrid('Wind', weatherData.currently.windSpeed, 'Km/h', '')}
                                            {this.currentWeatherInformationGrid('Wind gust', weatherData.currently.windGust, 'Km/h', '')}
                                            {this.currentWeatherInformationGrid('Humidity', weatherData.currently.humidity * 100, '%', '')}
                                            {this.currentWeatherInformationGrid('UV Index', weatherData.currently.uvIndex, '', '')}
                                            {this.currentWeatherInformationGrid('Visibility', weatherData.currently.visibility, 'km', '')}
                                            {this.currentWeatherInformationGrid('Pressure', weatherData.currently.pressure, 'mbar', '')}
                                            {this.currentWeatherInformationGrid('Dew Point', weatherData.currently.dewPoint, '°c', '')}
                                        </div>
                                    </div>
                                    <div className="w3_agileits_main_grid_right col-md-7">
                                        <div className="agileinfo_main_grid_right_grid">
                                            <div id="parentHorizontalTab">
                                                <ul className="resp-tabs-list hor_1">
                                                    <li>Today</li>
                                                    <li>Week</li>
                                                    <li>Month</li>
                                                </ul>
                                                <div className="resp-tabs-container hor_1">
                                                    <div className="w3_agileits_tabs">
                                                        <div className="w3_main_grid_right_grid1">
                                                            <div className="w3_main_grid_right_grid1_left">
                                                                <p>10 AM</p>
                                                            </div>
                                                            <div className="w3_main_grid_right_grid1_right">
                                                                <p>15<i>°c</i><span>Cloudy</span></p>
                                                            </div>
                                                            <div className="clear"> </div>
                                                        </div>
                                                        <div className="w3_main_grid_right_grid1">
                                                            <div className="w3_main_grid_right_grid1_left">
                                                                <p>11 AM</p>
                                                            </div>
                                                            <div className="w3_main_grid_right_grid1_right">
                                                                <p>16<i>°c</i><span>Clear</span></p>
                                                            </div>
                                                            <div className="clear"> </div>
                                                        </div>
                                                        <div className="w3_main_grid_right_grid1">
                                                            <div className="w3_main_grid_right_grid1_left">
                                                                <p>12 PM</p>
                                                            </div>
                                                            <div className="w3_main_grid_right_grid1_right">
                                                                <p>18<i>°c</i><span>Cear</span></p>
                                                            </div>
                                                            <div className="clear"> </div>
                                                        </div>
                                                        <div className="w3_main_grid_right_grid1">
                                                            <div className="w3_main_grid_right_grid1_left">
                                                                <p>2 PM</p>
                                                            </div>
                                                            <div className="w3_main_grid_right_grid1_right">
                                                                <p>12<i>°c</i><span>Partly Cloudy</span></p>
                                                            </div>
                                                            <div className="clear"> </div>
                                                        </div>
                                                    </div>
                                                    <div className="w3_agileits_tabs">
                                                        <div className="w3_main_grid_right_grid1">
                                                            <div className="w3_main_grid_right_grid1_left">
                                                                <p>Monday</p>
                                                            </div>
                                                            <div className="w3_main_grid_right_grid1_right">
                                                                <p>14<i>°c</i><span>Clear</span></p>
                                                            </div>
                                                            <div className="clear"> </div>
                                                        </div>
                                                        <div className="w3_main_grid_right_grid1">
                                                            <div className="w3_main_grid_right_grid1_left">
                                                                <p>Tuesday</p>
                                                            </div>
                                                            <div className="w3_main_grid_right_grid1_right">
                                                                <p>16<i>°c</i><span>Cloudy</span></p>
                                                            </div>
                                                            <div className="clear"> </div>
                                                        </div>
                                                        <div className="w3_main_grid_right_grid1">
                                                            <div className="w3_main_grid_right_grid1_left">
                                                                <p>Wednesday</p>
                                                            </div>
                                                            <div className="w3_main_grid_right_grid1_right">
                                                                <p>11<i>°c</i><span>Rainy</span></p>
                                                            </div>
                                                            <div className="clear"> </div>
                                                        </div>
                                                        <div className="w3_main_grid_right_grid1">
                                                            <div className="w3_main_grid_right_grid1_left">
                                                                <p>Thursday</p>
                                                            </div>
                                                            <div className="w3_main_grid_right_grid1_right">
                                                                <p>18<i>°c</i><span>Sunny</span></p>
                                                            </div>
                                                            <div className="clear"> </div>
                                                        </div>
                                                    </div>
                                                    <div className="w3_agileits_tabs">
                                                        <div className="w3_main_grid_right_grid1">
                                                            <div className="w3_main_grid_right_grid1_left">
                                                                <p>January</p>
                                                            </div>
                                                            <div className="w3_main_grid_right_grid1_right">
                                                                <p>18<i>°c</i><span>Cloudy</span></p>
                                                            </div>
                                                            <div className="clear"> </div>
                                                        </div>
                                                        <div className="w3_main_grid_right_grid1">
                                                            <div className="w3_main_grid_right_grid1_left">
                                                                <p>February</p>
                                                            </div>
                                                            <div className="w3_main_grid_right_grid1_right">
                                                                <p>14<i>°c</i><span>Clear</span></p>
                                                            </div>
                                                            <div className="clear"> </div>
                                                        </div>
                                                        <div className="w3_main_grid_right_grid1">
                                                            <div className="w3_main_grid_right_grid1_left">
                                                                <p>March</p>
                                                            </div>
                                                            <div className="w3_main_grid_right_grid1_right">
                                                                <p>18<i>°c</i><span>Cear</span></p>
                                                            </div>
                                                            <div className="clear"> </div>
                                                        </div>
                                                        <div className="w3_main_grid_right_grid1">
                                                            <div className="w3_main_grid_right_grid1_left">
                                                                <p>April</p>
                                                            </div>
                                                            <div className="w3_main_grid_right_grid1_right">
                                                                <p>12<i>°c</i><span>Partly Cloudy</span></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    currentWeatherInformationGrid = (name, value, si, icon) => {
        return <div className="w3ls_main_grid_left_grid1 col-md-6">
            <div className="w3l_main_grid_left_grid1_left">
                <h3>{name}</h3>
                <p>{value} <span>{si}</span></p>
            </div>
            {
                icon ? <div className="w3l_main_grid_left_grid1_right">
                    <canvas id={icon} width="45" height="45"></canvas>
                </div> : null
            }
            <div className="clear"> </div>
        </div>
    }


    componentWillMount = () => {
        this.makePageResponsive();
    }

    componentDidMount = () => {
        setInterval(() => {
            this.setState({ currentTime: this.startTime() });
        }, 1000);
        this.setState({ loading: true });
        BACKEND.get(LOCATION_API_URL).then((locationData) => {
            const payload = {
                city: locationData.data.city + ', ' + locationData.data.country,
                latitude: locationData.data.lat,
                longitude: locationData.data.lon
            }
            BACKEND.post('/weather/get-weather-information', { payload }).then((weatherData) => {
                console.log(weatherData);
                this.setState({
                    weatherData: weatherData.data.darksky,
                    currentLocation: locationData.data,
                    loading: false
                }, () => {
                    this.iconPlay([
                        "sleet", "clear-night", "partly-cloudy-day",
                        "partly-cloudy-night", "cloudy", "rain", "clear-day", "snow", "wind",
                        "fog"
                    ]);
                });

            }, (err) => {
                console.log(err);
                this.setState({ loading: false, error: { status: true, msg: 'Something went wrong. Please try again.' } });
            })
        }, (err) => {
            this.setState({ loading: false, error: { status: true, msg: 'Something went wrong. Please try again.' } });
        })
    }

    startTime = () => {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        function checkTime(i) {
            if (i < 10) { i = "0" + i };
            return i;
        }
        m = checkTime(m);
        s = checkTime(s);
        return { h, s, m };
    }


    iconPlay = (list) => {
        var icons = new window.Skycons({ "color": "#f5f5f5" }),
            list,
            i;

        for (i = list.length; i--;)
            icons.set(list[i], list[i]);

        icons.play();
    }

    getData = () => {
        var mydate = new Date();
        var year = mydate.getYear()
        if (year < 1000)
            year += 1900
        var day = mydate.getDay()
        var month = mydate.getMonth()
        var daym = mydate.getDate()
        if (daym < 10)
            daym = "0" + day
        var dayarray = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")
        var montharray = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December")
        return <div className="w3layouts_date_year">{"" + dayarray[day] + ", " + montharray[month] + " " + daym + ", " + year + ""}</div>;
    }

    makePageResponsive = () => {
        const $ = window.$;
        $(document).ready(function () {
            //Horizontal Tab
            $('#parentHorizontalTab').easyResponsiveTabs({
                type: 'default', //Types: default, vertical, accordion
                width: 'auto', //auto or any width like 600px
                fit: true, // 100% fit in a container
                tabidentify: 'hor_1', // The tab groups identifier
                activate: function (event) { // Callback function if tab is switched
                    var $tab = $(this);
                    var $info = $('#nested-tabInfo');
                    var $name = $('span', $info);
                    $name.text($tab.text());
                    $info.show();
                }
            });
        });
    }

}
