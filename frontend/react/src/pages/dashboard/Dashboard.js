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
          icon: "mood",
          link: "/aqi",
          taglineIcon: "mood",
          cardClass: "card-header-success",
          tagline: "Moderate Air Quality in your area"
        },
        {
          name: "ANALYTICS",
          icon: "data",
          link: "/analytics",
          taglineIcon: "data",
          cardClass: "card-header-success",
          tagline: "See your fluctuating data"
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
        </div>
      </div>
    );
  }
}
