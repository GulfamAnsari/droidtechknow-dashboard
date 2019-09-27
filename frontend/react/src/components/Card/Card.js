import React, { Component } from "react";
import './Card.scss';

export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, description, description_icon, stats, stats_icon, cardClass, actions } = this.props.card;
    return (
      <div className="card card-chart __Card">
        <div className={`card-header ${cardClass}`}>
          <div className="titleBox">
            <h4 className="card-title">{title}</h4>
            {
              actions && actions.length ? <div class="btn-group">
                <span className={`dropdownButton dropdown-toggle ${''}`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></span>
                <div className="dropdown-menu">
                  {
                    actions.map((action) => {
                      return <a onClick={action.function} className="dropdown-item" href="#">{action.name}</a>
                    })
                  }
                </div>
              </div> : null
            }
          </div>

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
