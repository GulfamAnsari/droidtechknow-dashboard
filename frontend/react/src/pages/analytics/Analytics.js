import React, { Component } from 'react';
import * as BACKEND from '../../helper/backend';
import { LOCATION_API_URL } from '../../constants';
import './Analytics.scss';
import * as Notiflix from '../../helper/notiflix';
import Table from '../../components/Table/Table';
import SmartDataTable from 'react-smart-data-table';

export default class Analytics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: {
                status: false,
                msg: ''
            },
            date: this.convertDate(String(new Date())),
            pageSize: 10,
            appData: null,
            table: null
        }
    }

    convertDate = (d) => {
        var parts = d.split(" ");
        var months = { Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12" };
        return parts[2] + "-" + months[parts[1]] + "-" + parts[3];
    }


    getTableData = (date) => {
        const { appData } = this.state;
        var index = 0;
        for (let data of appData) {
            const datesKeys = Object.keys(data);
            if (datesKeys.includes(date)) {
                this.setState({ ...this.state, table: appData[index][date] });
                return appData[index][date];
            }
            index++;
        }
    }

    chnageDate = () => {
        var inputDate = document.getElementById('inputDate').value;
        if (!this.getTableData(inputDate)) {
            this.setState({
                error: {
                    status: true,
                    msg: 'Cant find the corresponding date data'
                }
            }, () => {
                setTimeout(() => {
                    this.setState({ error: { status: false } })
                }, 3000);
            })
        } else {
            Notiflix.remove();
            Notiflix.notify('Success', 'Your data is updated.');
        }
    }

    select = ()=> {
        var e = document.getElementById("paginagion");
        var value = e.options[e.selectedIndex].value;
        this.setState({pageSize: value})
    }


    render() {
        const { loading, error, appData, table, date, pageSize } = this.state;
        return (
            <React.Fragment>
                {loading ? Notiflix.loading('Loading Analytics. Please wait...') : Notiflix.remove()}
                {error.status && !loading ? Notiflix.notify('Failure', error.msg) : ''}
                <div className="content">
                    <section className="main __Analytics">
                        <span><stong>Date: {date}</stong></span>
                        <input type="text" id="inputDate" />
                        <button type="submit" onClick={() => { this.chnageDate() }} >Change</button>
                        <select id="paginagion" onChange={()=>{this.select()}}>
                            <option>10</option>
                            <option>20</option>
                            <option>30</option>
                            <option>50</option>
                            <option>100</option>
                            <option>500</option>
                            <option>1000</option>
                        </select>

                        {appData ? <SmartDataTable
                            data={table ? table : this.getTableData(date)}
                            name='Droidtechknow analytics table'
                            className='ui compact selectable table'
                            sortable
                            perPage={pageSize}
                        /> : null}
                    </section>
                </div>
            </React.Fragment>
        )
    }


    componentDidMount = () => {
        this.setState({ loading: true });
        BACKEND.get('https://droidtechknow.com/admin/api/analytics/getAnalytics.php').then((data) => {
            console.log(data);
            this.setState({
                appData: data.data,
                loading: false
            });
        }, (err) => {
            console.log(err);
            this.setState({ loading: false, error: { status: true, msg: 'Something went wrong. Please try again.' } });
        })
    }

}
