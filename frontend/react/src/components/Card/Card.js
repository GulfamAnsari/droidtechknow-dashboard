import React, { Component } from "react";

export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, description, description_icon, stats, stats_icon, cardClass } = this.props.card;
    return (
      <div className="card card-chart">
        <div className={`card-header ${cardClass}`}>
          <h4 className="card-title">{title}</h4>
        </div>
        <div className="card-body">
          <p className="card-category">
            <span className="text-success">
              <i className={description_icon}></i>
            </span>
            {description}
          </p>
        </div>
        <div className="card-footer">
          <div className="stats">
            <i className="material-icons">{stats_icon}</i> {stats}
          </div>
        </div>
      </div>
    );
  }
}
