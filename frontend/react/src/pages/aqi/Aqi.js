import React, { Component } from 'react';
import { getCurrentLongtLati } from '../../helper/helper-functions';
import * as BACKEND from '../../helper/backend';
import { LOCATION_API_URL } from '../../constants';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import './Aqi.scss';

class Aqi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aqiData: []
        }
    }

    render() {
        const { aqiData } = this.state;
        return (
            <div className="content">
                <div className="container-fluid">
                    <section className="__AQI">
                        {
                            aqiData.map((data, index) => {
                                return this.getAqiCard(data, index)
                            })
                        }
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
                this.setState({ aqiData: [currentAqi.data] });
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
                    this.setState({ aqiData: [currentAqi.data] });
                }, (err) => { })
            }, (err) => { })
        });

    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.searchResult.query !== this.props.searchResult.query) {
            BACKEND.post('/aqi/get-aqi-information', { payload: { keyword: this.props.searchResult.query } }).then((aqiData) => {
                const displayData = [];
                for (const data of aqiData.data.data) {
                    displayData.push({
                        name: data.station.name + ' ' + (data.station.country ? data.station.country : ''),
                        value: data.aqi,
                        data: {
                            geo: data.station.geo,
                            uid: data.uid
                        }
                    });
                }
                this.props.search({ name: 'result', result: displayData });
            }, (error) => { });
        }
        if (this.props.searchResult.selected) {
            console.log(this.props.searchResult);
            this.props.search({ name: 'selected', selected: null });
            const payload = {
                uid: this.props.searchResult.selected.data.uid
            }
            BACKEND.post('/aqi/get-aqi-information', { payload }).then((currentAqi) => {
                const { aqiData } = this.state;
                aqiData.push(currentAqi.data);
                this.setState({ aqiData });
            }, (error) => { });
        }
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
            });
        }, 0)
    }

    getPollutants = (species) => {
        var names = {
            pm25: "PM",
            pm10: "PM",
            o3: "Ozone",
            no2: "Nitrogen Dioxide",
            so2: "Sulphur Dioxide",
            co: "Carbon Monoxyde"
        }
        return Object.keys(names).map((s) => {
            return species[s] ? <div className="__Range">
                <p style={{ width: "30%" }}>{names[s]} {s === 'pm25' ? <sub>2.5</sub> : s === 'pm10' ? <sub>10</sub> : null}</p>
                <input type="range" min="0" max="500" value={species[s]['v']} step="0" />
                <span className="aqiValue">{species[s]['v']}</span>
            </div> : null
        })
    }

    getAqiCard = (currentAqi, index) => {
        const id = currentAqi.data.city.name + index;
        const aqiColor = currentAqi.data.aqi <= 50 ?
            'success' : currentAqi.data.aqi <= 100 ?
                'warning' : currentAqi.data.aqi <= 200 ?
                    'danger' : 'primary';
        return <div className={`card card-chart col-md-5`}>
            <div className={`card-header card-header-${aqiColor}`} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h4 class="card-title">{currentAqi.data.city.name} (AQI)</h4>
                <span className="material-icons">near_me</span>
            </div>
            <div className="card-body">
                <div className="card-category row">
                    <div className={'col-md-12'}>
                        <div id={id} class="gauge-container"></div>
                        {document.getElementById(id) ? null : this.getAqiGauge(currentAqi.data.aqi, id)}
                    </div>
                    <div className={'col-md-12'}>
                        {this.getPollutants(currentAqi.data.iaqi)}
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <div className="stats"><i class="material-icons">access_time</i><p>Last updated: {currentAqi.data.time.s}</p></div>
            </div>
        </div>
    }

}


const mapStateToProps = (state) => {
    return {
        userInfo: state.Main_Reducer.userInfo,
        searchResult: state.Main_Reducer.searchResult
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserInfo: () => dispatch(actions.fetchUserInfo()),
        logout: () => dispatch(actions.logout()),
        search: (value) => dispatch(actions.search(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Aqi);
