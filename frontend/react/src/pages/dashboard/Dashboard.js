import React, { Component } from 'react';
import './Dashboard.scss';
import Table from '../../components/Table/Table';
import AppCard from '../../components/AppCard/AppCard';
const Link = require("react-router-dom").Link;

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apps: [
        {
          name: 'TODO',
          icon: 'list',
          link: '/todos',
          taglineIcon: 'format_list_numbered_rtl',
          cardClass: 'card-header-warning',
          tagline: '10 TODOS need to be done',
          title: 'Todos'
        },
        {
          name: 'STORE',
          icon: 'store',
          link: '/',
          taglineIcon: 'date_range',
          cardClass: 'card-header-success',
          tagline: 'Last 24 Hours',
          title: '$34,245'
        },
        {
          name: 'TWITTER',
          icon: 'update',
          link: '/',
          taglineIcon: 'list',
          cardClass: 'card-header-danger',
          tagline: 'Last 24 Hours',
          title: '245'
        },
        {
          name: 'ISSUES',
          icon: 'info_outline',
          link: '/',
          taglineIcon: 'update',
          cardClass: 'card-header-info',
          tagline: 'Just Updated',
          title: '75'
        }
      ]
    }
  }

  render() {
    const { apps } = this.state;

    return (
      <div className="content">
        <div className="container-fluid">
          {/* First row */}
          <div className="row">
            {
              apps.map((app) => {
                return <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="card card-stats">
                    <AppCard app={app} />
                  </div>
                </div>
              })
            }
          </div>

          {/* Second Row */}
          <div className="row">
            <div className="col-md-4">
              <div className="card card-chart">
                <div className="card-header card-header-success">
                  <div className="ct-chart" id="dailySalesChart"></div>
                </div>
                <div className="card-body">
                  <h4 className="card-title">Daily Sales</h4>
                  <p className="card-category">
                    <span className="text-success"><i className="fa fa-long-arrow-up"></i> 55% </span> increase in today sales.</p>
                </div>
                <div className="card-footer">
                  <div className="stats">
                    <i className="material-icons">access_time</i> updated 4 minutes ago
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card card-chart">
                <div className="card-header card-header-warning">
                  <div className="ct-chart" id="websiteViewsChart"></div>
                </div>
                <div className="card-body">
                  <h4 className="card-title">Email Subscriptions</h4>
                  <p className="card-category">Last Campaign Performance</p>
                </div>
                <div className="card-footer">
                  <div className="stats">
                    <i className="material-icons">access_time</i> campaign sent 2 days ago
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card card-chart">
                <div className="card-header card-header-danger">
                  <div className="ct-chart" id="completedTasksChart"></div>
                </div>
                <div className="card-body">
                  <h4 className="card-title">Completed Tasks</h4>
                  <p className="card-category">Last Campaign Performance</p>
                </div>
                <div className="card-footer">
                  <div className="stats">
                    <i className="material-icons">access_time</i> campaign sent 2 days ago
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Third row */}
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <Table tableData={{
                title: 'Employees Stats',
                description: 'New employees on 15th September, 2016',
                data: [{ name: 'gulfam', salary: '$2' }, { name: 'ansari', salary: '$2' }]
              }} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
