import React, { Component } from 'react';
import { getCurrentLongtLati } from '../../helper/helper-functions';

export default class Aqi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: null
        }
    }

    render() {
        const { position } = this.state;

        return (
            <div className="content">
                <div className="container-fluid">
                    <section className="todo-list-container">
                        <div>
                            {
                                position ? ` Latitude: ${position.latitude} Longitude: ${position.longitude}` : null
                            }
                        </div>
                    </section>
                </div>
            </div>

        )
    }

    componentDidMount = () => {
        getCurrentLongtLati().then((position) => {
            console.log(position);
            this.setState({
                position: position.coords
            })
        }, (error) => {
            console.log(error);
        })
    }
}
