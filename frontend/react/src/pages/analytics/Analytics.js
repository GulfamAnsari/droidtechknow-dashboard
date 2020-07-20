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
            appData: null,
            table: null,
            mediumTableData: null,
            showAllDataTable: true,
            mediumDataTable: false
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

    chnageDate = (inputDate) => {
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
            this.setState({ date: inputDate })
            Notiflix.remove();
            Notiflix.notify('Success', 'Your data is updated.');
        }
    }

    myFunction = (val) => {
        var val = val.target.value;
        val = val.split("-").reverse().join("-");
        this.chnageDate(val);
    }

    selectChange = (e) => {
        const { date } = this.state;
        var val = e.target.value;
        const sortBy = fn => {
            const cmp = (a, b) => -(a < b) || +(a > b);
            return (a, b) => cmp(fn(a), fn(b));
        };
        var newSortedData = this.sortByAttribute(this.getTableData(date), val);
        this.setState({ table: newSortedData });
    }

    sortByAttribute = (array, ...attrs) => {
        // generate an array of predicate-objects contains
        // property getter, and descending indicator
        let predicates = attrs.map(pred => {
            let descending = pred.charAt(0) === '-' ? -1 : 1;
            pred = pred.replace(/^-/, '');
            return {
                getter: o => o[pred],
                descend: descending
            };
        });
        // schwartzian transform idiom implementation. aka: "decorate-sort-undecorate"
        return array.map(item => {
            return {
                src: item,
                compareValues: predicates.map(predicate => predicate.getter(item))
            };
        })
            .sort((o1, o2) => {
                let i = -1, result = 0;
                while (++i < predicates.length) {
                    if (o1.compareValues[i] < o2.compareValues[i]) result = -1;
                    if (o1.compareValues[i] > o2.compareValues[i]) result = 1;
                    if (result *= predicates[i].descend) break;
                }
                return result;
            })
            .map(item => item.src);
    }

    selectMediumData = (e) => {
        const { mediumDataTable, showAllDataTable } = this.state;
        var val = e.target.value;
        if (val === "all") {
            this.setState({ mediumDataTable: false, showAllDataTable: true })
        } else {
            this.setState({ mediumTableData: this.getUserTableData().articlesList[val] })
            this.setState({ showAllDataTable: false, mediumDataTable: true })
        }
    }


    getUserTableData = () => {
        const { table } = this.state;
        const organicData = [{ Medium: "Google", Users: 0 }];
        const socialData = [{ Medium: "Social", Users: 0 }];
        const completeData = [{ Medium: "Organic", Users: 0 }, { Medium: "Social", Users: 0 }, { Medium: "Direct", Users: 0 }];
        const direct = [{ key: "Droidtechknow", value: 0 }, { key: "Others", value: 0 }];
        const allMedium = {
            organic: {
                list: ["google.com", "bing.com", "duckduckgo.com", "yahoo.com", "yandex.com", "qwant.com"],
                medium: ["Google", "Bing", "DuckduckGo", "Yahoo Search", "Yandex", "Qwant"]
            },
            social: {
                list: ["youtube.com", "facebook.com", "t.co", "reddit.com", "instagram.com", "quora.com"],
                medium: ["Youtube", "Facebook", "Twitter", "Reddit", "Instagram", "Quora"]
            }
        }

        var articlesList = {
            social: [],
            organic: [],
            direct: []
        }
        for (let article of table || []) {
            // creating organic list
            for (let i in allMedium.organic.list) {
                if (article.referer.includes(allMedium.organic.list[i])) {
                    organicData[i] = {
                        Medium: allMedium.organic.medium[i],
                        Users: organicData[i] && organicData[i].Users ? organicData[i].Users + 1 : 1
                    }
                    completeData[0].Users = completeData[0].Users + 1;
                    articlesList.organic.push(article);
                }
            }

            // creating social list
            for (let i in allMedium.social.list) {
                if (article.referer.includes(allMedium.social.list[i])) {
                    socialData[i] = {
                        Medium: allMedium.social.medium[i],
                        Users: socialData[i] && socialData[i].Users ? socialData[i].Users + 1 : 1
                    }
                    completeData[1].Users = completeData[1].Users + 1;
                    articlesList.social.push(article)
                }
            }

            if (article.referer.includes('droidtechknow.com')) {
                direct[0].value = direct[0].value + 1;
                completeData[2].Users = completeData[2].Users + 1;
                articlesList.direct.push(article)
            }
        }
        direct[1].value = (table || []).length - (completeData[0].Users + completeData[1].Users + completeData[2].Users);
        return { organicData, socialData, direct, completeData, articlesList };
    }

    plotGraph = () => {
        const { appData } = this.state;
        let x = [];
        let y = [];
        for (let date of appData || []) {
            x.push(Object.keys(date)[0]);
            y.push(Object.values(date)[0].length);
        }
        var trace1 = {
            type: 'scatter',
            x,
            y,
            marker: {
                color: '#C8A2C8',
                line: {
                    width: 1
                }
            }
        };

        var data = [trace1];

        var layout = {
            title: 'All Data',
            font: { size: 12 }
        };

        var config = { responsive: true }

        window.Plotly.newPlot('plotData', data, layout, config);
    }

    componentDidUpdate = () => {
        this.plotGraph();
    }


    render() {
        const { loading, mediumDataTable, showAllDataTable, error, appData, table, date, mediumTableData } = this.state;
        const sortList = ["ip", "referer", "bot", "city", "country", "date", "postId", "time", "title", "views"]
        const allMedium = ["all", "social", "organic", "direct"]
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

                        <div className="col-md-12 plot"><div id="plotData"></div></div>

                        <div class="col-md-3">
                            <input type="date" className={'datePicker'} name="Date Picker" defaultValue={date} min="2020-07-01" id="datePicker" onChange={(value) => { this.myFunction(value) }} />
                        </div>
                        <div class="col-md-3">
                            <select className="selectSort" onChange={(e) => { this.selectChange(e) }}>
                                <option value="" disabled selected>Sort Using</option>
                                {
                                    sortList.map(e => { return <option value={e}>{e}</option> })
                                }
                            </select>
                        </div>
                        <div class="col-md-3">
                            <select className="selectSort" onChange={(e) => { this.selectMediumData(e) }}>
                                <option value="" disabled selected>Select Medium</option>
                                {
                                    allMedium.map(e => { return <option value={e}>{e}</option> })
                                }
                            </select>
                        </div>


                        <div class="col-md-3">
                            <button className="btn btn-primary" onClick={() => { this.getAPIData() }} type="button">Refresh Data</button>
                        </div>

                        {mediumTableData && mediumDataTable ? <div id="socialOrganicData" class="col-md-12"><Table tableData={{
                            title: 'Organic Social and Direct',
                            icon: 'fa fa-table',
                            data: mediumTableData
                        }}
                        /></div> : null}
                        {appData && showAllDataTable ? <div id="allData" class="col-md-12"><Table tableData={{
                            title: 'Droidtechknow Website Analytics',
                            icon: 'fa fa-table',
                            data: table ? table : this.getTableData(date)
                        }}
                        /></div> : null}
                    </section>
                </div>
            </React.Fragment>
        )
    }


    componentDidMount = () => {
        this.getAPIData();
    }

    getAPIData = () => {
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
