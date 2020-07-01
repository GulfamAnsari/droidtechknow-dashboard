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
            appData: null,
            table: null
        }
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

    render() {
        const { loading, error, appData, table } = this.state;
        var date = '02-07-2020';

        return (
            <React.Fragment>
                {loading ? Notiflix.loading('Loading Analytics. Please wait...') : Notiflix.remove()}
                {error.status && !loading ? Notiflix.notify('Failure', error.msg) : ''}
                <div className="content">
                    <section className="main __Analytics">
                        <p><stong>Date: {date}</stong></p>
                        <input type="text" id="inputDate" />
                        <button type="submit" onClick={() => { this.chnageDate() }} >Change</button>
                        {appData ? <Table tableData={{ title: 'Droidtechkow Analytics', description: 'See your analytics here', data: table ? table : this.getTableData(date) }} /> : null}
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
