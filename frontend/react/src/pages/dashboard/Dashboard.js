import React, { Component } from "react";
import "./Dashboard.scss";
import Table from "../../components/Table/Table";
import AppCard from "../../components/AppCard/AppCard";
import Card from "../../components/Card/Card";
const Link = require("react-router-dom").Link;

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apps: [
        {
          name: "Todos",
          icon: "list",
          link: "/todos",
          taglineIcon: "format_list_numbered_rtl",
          cardClass: "card-header-warning",
          tagline: "10 TODOS need to be done"
        },
        {
          name: "Weather",
          icon: "cloud-sun-rain",
          link: "/weather",
          taglineIcon: "cloud",
          cardClass: "card-header-primary",
          tagline: "Chances of rain is higher today."
        },
        {
          name: "AQI",
          icon: "cloud-sun-rain",
          link: "/aqi",
          taglineIcon: "cloud",
          cardClass: "card-header-primary",
          tagline: "Moderate AQI"
        },
        {
          name: "Twitter",
          icon: "update",
          link: "/",
          taglineIcon: "list",
          cardClass: "card-header-danger",
          tagline: "Last 24 Hours",
        },
        {
          name: "Issues",
          icon: "info_outline",
          link: "/",
          taglineIcon: "update",
          cardClass: "card-header-info",
          tagline: "Just Updated",
        }
      ]
    };
  }

  render() {
    const { apps } = this.state;
    return (
      <div className="content">
        <div className="container-fluid">
          {/* First row */}
          <div className="row">
            {apps.map(app => {
              return (
                <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="card card-stats">
                    <AppCard app={app} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Second Row */}
          <div className="row">
            <div className="col-md-4">
              <Card card={{
                title: "Email Subscriptions",
                description: "Last Campaign Performance",
                description_icon: "",
                stats: "campaign sent 2 days ago",
                stats_icon: "access_time",
                cardClass: "card-header-success"
              }} />
            </div>
          </div>

          {/* Third row */}
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <Table
                tableData={{
                  title: "Employees Stats",
                  description: "New employees on 15th September, 2016",
                  data: [
                    { name: "gulfam", salary: "$2" },
                    { name: "ansari", salary: "$2" }
                  ]
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
