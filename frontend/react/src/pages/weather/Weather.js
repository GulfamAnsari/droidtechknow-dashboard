import React, { Component } from 'react';
import * as BACKEND from '../../helper/backend';
import { LOCATION_API_URL } from '../../constants';
import './Weather.scss';

export default class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherData: null,
            currentTime: { h: 'h', m: 'm', s: 's' }
        }
    }


    render() {
        const { weatherData, currentTime } = this.state;
        return (
            <div className="__Weather content">
                <div className="container-fluid">
                    <section>
                        <div className="main">
                            <div className="w3_agile_main_grids">
                                <div className="w3layouts_main_grid">
                                    <div className="w3layouts_main_grid_left">
                                        <h2>London, United Kingdom.</h2>
                                        <p>Mostly Rainy</p>
                                        <h3>Now</h3>
                                        <h4>10<span>°c</span></h4>
                                    </div>
                                    <div className="w3layouts_main_grid_right">
                                        <canvas id="sleet" width="70" height="70"></canvas>
                                        <div id="w3time">{currentTime.h + ":" + currentTime.m + ":" + currentTime.s}</div>
                                        {this.getData()}
                                    </div>
                                    <div className="clear"> </div>
                                </div>

                                <div className="agileits_w3layouts_main_grid">
                                    <div className="agile_main_grid_left">
                                        <div className="wthree_main_grid_left_grid">
                                            <div className="w3ls_main_grid_left_grid1">
                                                <div className="w3l_main_grid_left_grid1_left">
                                                    <h3>Partly Sunny</h3>
                                                    <p>3 <span>%</span></p>
                                                </div>
                                                <div className="w3l_main_grid_left_grid1_right">
                                                    <canvas id="partly-cloudy-day" width="45" height="45"></canvas>
                                                </div>
                                                <div className="clear"> </div>
                                            </div>
                                            <div className="w3ls_main_grid_left_grid1">
                                                <div className="w3l_main_grid_left_grid1_left">
                                                    <h3>Cloud</h3>
                                                    <p>38 <span>%</span></p>
                                                </div>
                                                <div className="w3l_main_grid_left_grid1_right">
                                                    <canvas id="cloudy" width="45" height="45"></canvas>
                                                </div>
                                                <div className="clear"> </div>
                                            </div>
                                            <div className="w3ls_main_grid_left_grid1">
                                                <div className="w3l_main_grid_left_grid1_left">
                                                    <h3>Wind</h3>
                                                    <p>14 <span>Km/h</span></p>
                                                </div>
                                                <div className="w3l_main_grid_left_grid1_right">
                                                    <canvas id="wind" width="45" height="45"></canvas>
                                                </div>
                                                <div className="clear"> </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w3_agileits_main_grid_right">
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
                                    <div className="clear"> </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }


    componentWillMount = () => {
        this.makePageResponsive();
    }

    componentDidMount = () => {
        setInterval(() => {
            this.setState({ currentTime: this.startTime() })
        }, 1000);
        this.iconPlay([
            "sleet", "clear-night", "partly-cloudy-day",
            "partly-cloudy-night", "cloudy", "rain", "clear-day", "snow", "wind",
            "fog"
        ]);

        BACKEND.get(LOCATION_API_URL).then((locationData) => {
            const payload = {
                city: locationData.data.city + ', ' + locationData.data.country,
                latitude: locationData.data.lat,
                longitude: locationData.data.lon
            }
            BACKEND.post('/weather/get-weather-information', { payload }).then((weatherData) => {
                console.log(weatherData);
                this.setState({
                    weatherData: weatherData.data
                })
            }, (err) => {
                console.log(err);
            })
        }, (err) => {
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

    // loadScript = (src) => {
    //     console.log('hello')
    //     const head = document.querySelector("head");

    //     const script = document.createElement("script");
    //     script.setAttribute(
    //         "src",
    //         src
    //     );
    //     head.appendChild(script);
    // }

    // loadExtScript = (src, test, callback) => {
    //     var s = document.createElement('script');
    //     s.src = src;
    //     document.body.appendChild(s);

    //     var callbackTimer = setInterval(function () {
    //         var call = false;
    //         try {
    //             call = test.call();
    //         } catch (e) { }

    //         if (call) {
    //             clearInterval(callbackTimer);
    //             callback.call();
    //         }
    //     }, 100);
    // }
}
