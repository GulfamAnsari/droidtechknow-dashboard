import React, { Component } from 'react';
import * as BACKEND from '../../helper/backend';
import { LOCATION_API_URL } from '../../constants';
import './Analytics.scss';
import * as Notiflix from '../../helper/notiflix';
import Table from '../../components/Table/Table';

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

    select = () => {
        var e = document.getElementById("paginagion");
        var value = e.options[e.selectedIndex].value;
        this.setState({ pageSize: value })
    }

    getUserTableData = () => {
        const { table } = this.state;
        const organicData = [{ key: "Google", value: 0 }, { key: "Bing", value: 0 }, { key: "DuckDuckGo", value: 0 }, { key: "Yahoo Search", value: 0 }];
        const socialData = [{ key: "Youtube", value: 0 }, { key: "Facebook", value: 0 }, { key: "Quora", value: 0 }, { key: "Twitter", value: 0 }, { key: "Redit", value: 0 }, { key: "Instagram", value: 0 }]
        const direct = [{ key: "Droidtechknow", value: 0 }, { key: "Others", value: 0 }];
        const completeData = [{ Medium: "Organic", Users: 0 }, { Medium: "Social", Users: 0 }, { Medium: "Direct", Users: 0 }];
        for (let article of table || []) {
            if (article.referer.includes(".google.")) {
                organicData[0].value = organicData[0].value + 1;
                completeData[0].Users = completeData[0].Users + 1;
            } else if (article.referer.includes("bing.com")) {
                organicData[1].value = organicData[1].value + 1;
                completeData[0].Users = completeData[0].Users + 1;
            } else if (article.referer.includes("duckduckgo.com")) {
                organicData[2].value = organicData[2].value + 1;
                completeData[0].Users = completeData[0].Users + 1;
            } else if (article.referer.includes("search.yahoo.com")) {
                organicData[3].value = organicData[3].value + 1;
                completeData[0].Users = completeData[0].Users + 1;
            } else if (article.referer.includes("droidtechknow.com")) {
                direct[0].value = direct[0].value + 1;
                completeData[2].Users = completeData[2].Users + 1;
            } else if (article.referer.includes("youtube.com")) {
                socialData[0].value = socialData[0].value + 1;
                completeData[1].Users = completeData[1].Users + 1;
            } else if (article.referer.includes("facebook.com")) {
                socialData[1].value = socialData[1].value + 1;
                completeData[1].Users = completeData[1].Users + 1;
            } else if (article.referer.includes("quora.com")) {
                socialData[2].value = socialData[2].value + 1;
                completeData[1].Users = completeData[1].Users + 1;
            } else if (article.referer.includes("t.co")) {
                socialData[3].value = socialData[3].value + 1;
                completeData[1].Users = completeData[1].Users + 1;
            } else if (article.referer.includes("reddit.com")) {
                socialData[4].value = socialData[4].value + 1;
                completeData[1].Users = completeData[1].Users + 1;
            } else if (article.referer.includes("instagram.com")) {
                socialData[5].value = socialData[5].value + 1;
                completeData[1].Users = completeData[1].Users + 1;
            } else {
                direct[1].value = direct[1].value + 1;
                completeData[2].Users = completeData[2].Users + 1;
            }
        }
        return { organicData, socialData, direct, completeData };
    }


    render() {
        const { loading, error, appData, table, date, pageSize } = this.state;
        return (
            <React.Fragment>
                {loading ? Notiflix.loading('Loading Analytics. Please wait...') : Notiflix.remove()}
                {error.status && !loading ? Notiflix.notify('Failure', error.msg) : ''}
                <div className="content">
                    <section className="main __Analytics">
                        <div class="col-md-3">
                            <Table tableData={{
                                title: 'Traffic',
                                icon: 'fa fa-data',
                                data: this.getUserTableData().completeData
                            }} />
                        </div>
                        <div class="col-md-3">
                            <Table tableData={{
                                title: 'Organic Data',
                                icon: 'fa fa-google',
                                data: this.getUserTableData().organicData
                            }} />
                        </div>
                        <div class="col-md-3">
                            <Table tableData={{
                                title: 'Social Data',
                                icon: 'fa fa-facebook',
                                data: this.getUserTableData().socialData
                            }} />
                        </div>
                        <div class="col-md-3">
                            <Table tableData={{
                                title: 'Direct Data',
                                icon: 'fa fa-direct',
                                data: this.getUserTableData().direct
                            }} />
                        </div>

                        <div class="col-md-3">
                            <span><stong>Date: {date}</stong></span>
                            <input type="text" id="inputDate" />
                            <button type="submit" onClick={() => { this.chnageDate() }} >Change</button>
                            <select id="paginagion" onChange={() => { this.select() }}>
                                <option>10</option>
                                <option>20</option>
                                <option>30</option>
                                <option>50</option>
                                <option>100</option>
                                <option>500</option>
                                <option>1000</option>
                            </select>
                        </div>

                        {appData ? <div class="col-md-12"><Table
                            data={table ? table : this.getTableData(date)}
                            Title='Droidtechknow analytics table'
                        /></div> : null}
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
