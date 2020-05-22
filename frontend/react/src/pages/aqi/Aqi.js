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
        this.fetchCurrentAqiData();
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
            this.props.search({ name: 'selected', selected: null });
            const payload = {
                uid: this.props.searchResult.selected.data.uid
            }
            this.updateAqiData(payload);
        }
    }

    componentWillUnmount = () => {
        this.props.search({ name: 'result', result: [] });
    }


    fetchCurrentAqiData = () => {
        getCurrentLongtLati().then((position) => {
            const payload = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
            this.updateAqiData(payload);
        }, (error) => {
            console.log('There is error in fetching geolocation', error);
            alert('Please enable your real time location to fetch exact AQI');
            BACKEND.get(LOCATION_API_URL).then((locationData) => {
                const payload = {
                    latitude: locationData.data.loc.split(",")[0],
                    longitude: locationData.data.loc.split(",")[1]
                }
                this.updateAqiData(payload);
            }, (err) => { })
        });
    }

    updateAqiData = (payload) => {
        BACKEND.post('/aqi/get-aqi-information', { payload }).then((currentAqi) => {
            const { aqiData } = this.state;
            aqiData.push(currentAqi.data);
            this.setState({ aqiData });
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
            });
            document.getElementById(id).children[0].children[2].style.stroke = this.colorize(value).b;
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

    colorize = (aqi) => {
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
        return spectrum[i];
    }

    delete = (index, id) => {
        // document.getElementById(id).remove();
        const { aqiData } = this.state;
        aqiData.splice(index, 1);
        this.setState({ aqiData });
    }

    getAqiCard = (currentAqi, index) => {
        const id = currentAqi.data.city.name + index;
        return <div className={`card card-chart aqiCard ${this.state.aqiData.length === 1 ? 'col-md-7' : ''}`}>
            <div className={`card-header card-header-default`} style={{ display: 'flex', justifyContent: 'space-between', background: this.colorize(currentAqi.data.aqi).b }}>
                <h4 class="card-title">{currentAqi.data.city.name} (AQI)</h4>
                {index === 0 ? <span className="material-icons">near_me</span> : <span onClick={() => { this.delete(index, id) }} className="material-icons delete">delete</span>}
            </div>
            <div className="card-body">
                <div className="card-category row">
                    <div className={`col-md-6`}>
                        <div id={id} class="gauge-container"></div>
                        {document.getElementById(id) ? null : this.getAqiGauge(currentAqi.data.aqi, id)}
                    </div>
                    <div className={`col-md-6`}>
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
