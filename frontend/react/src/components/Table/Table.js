import React, { Component } from 'react'

export default class Table extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { title, description, icon,  data } = this.props.tableData;
    console.log(this.props)
    return (
      <div className="card">
        <div className="card-header card-header-primary">
          <h4 className="card-title"><i className={icon} style={{padding: '0 8px 0 0'}}></i>{title}</h4>
          <p className="card-category">{description}</p>
        </div>
        <div className="card-body table-responsive">
          <table className="table table-hover">
            <thead className="text-primary">
              {
                Object.keys(data[0]).map((heading) => {
                  return <th>{heading}</th>
                })
              }
            </thead>
            <tbody>
              {
                data.map((value) => {
                  return <tr>
                    {
                      Object.values(value).map((td) => {
                        return <td>{td}</td>
                      })
                    }
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
