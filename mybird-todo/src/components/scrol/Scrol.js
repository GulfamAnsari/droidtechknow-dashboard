import React, { Component } from 'react'
import './Scrol.css';

export default class Scrol extends Component {

  constructor(props) {
    super(props);
    this.state = {
      elementList: [{ name: 1 }, { name: 2 }, { name: 3 }],
      isLoading: false
    }
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (event) => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
      this.setState({
        isLoading: true
      });
    } else {
      setTimeout(() => {
        const { elementList } = this.state;
        const elementListLength = elementList.length;
        elementList.push({ name: elementListLength });
        this.setState({
          elementList: elementList,
          isLoading: false
        });
      }, 3000);
    }
  }

  render() {
    const { elementList, isLoading } = this.state;
    return (
      <React.Fragment>
        <div>
          {
            elementList.map((ele, index) => {
              return <div className="scrol" key={index}>{ele.name}</div>;
            })
          }
        </div>
        <div className="loading">
          {
            isLoading ? 'Loading...' : ''
          }
        </div>
      </React.Fragment>
    )
  }
}
