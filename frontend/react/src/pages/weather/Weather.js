import React, { Component } from 'react';
import * as BACKEND from '../../helper/backend';
import { LOCATION_API_URL } from '../../constants';

export default class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherData: null
        }
    }

    render() {
        const { weatherData } = this.state;
        console.log(weatherData)
        return (
            <div className="content">
                <div className="container-fluid">
                    <section className="__Weather">
                        {weatherData ?
                            'current temperature: ' + weatherData.darksky.currently.temperature
                            : null
                        }
                    </section>
                </div>
            </div>
        )
    }

    componentDidMount = () => {
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
}
