import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './CompletedTask.scss';


class CompletedTask extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    // console.log('[completedTask.js] In construction and props is', props);
  }

  /****************** Life Cycle Method for Demo Purposes *******************************/
  /**
   * This lifecycle function called each time whenevr the component
   * props or state changes and retutn something. This method execute
   * after the construction()
   */
  // static getDerivedStateFromProps(props, state) {
  //     console.log('[completedTask.js] getDerivedStateFromProps and props, state is', props, state);
  //     return state;
  // }

  // /**
  //  * This lifecycle method called each time after the getderivedStateFromProps method
  //  * The main purpose if this method is to cancle the updating process. 
  //  * This method should return true or false only. True means accept
  //  * You can extend PureComponent class to render the UI on the basis of props changes.
  //  */
  // shouldComponentUpdate = (nextProps, nextState) => {
  //     console.log('[completedTask.js] shouldComponentUpdate', nextProps, nextState);
  //     return true;
  // };

  /************************************************************************************/
  render() {
    // console.log('[completedTask.js] render');
    const { completedTask, removeCompletedTaskHandler, num } = this.props;
    return (
      <div className="__Completed_Task">
        <li className={"todo-item " + completedTask.priority.toLowerCase()}>
          <div className="icon-check">
            <i className="pad-15 material-icons md-36 md-light" onClick={() => { removeCompletedTaskHandler(completedTask.key) }}>check_circle</i>
          </div>

          <div className="icon-delete">
            <i className="pad-15 material-icons md-36 md-light" onClick={() => { removeCompletedTaskHandler(completedTask.key) }}>delete</i>
          </div>
          <div className="title">
          <p>{completedTask.title}</p>
          </div>
        </li>
      </div>
    )
  }

  /****************** Life Cycle Method for Demo Purposes *******************************/
  /**
 * This Lifecycle function once when the component is created after the
 * render() method. So because it runs only once, you can do some request
 * to fetch the application data.
 */
  // componentDidMount = () => {
  //     console.log('[completedTask.js] componentDidMount');
  // };

  // /**
  //  * This lifecycle method called each time after render() method. This method have access
  //  * to DOM and can update the dom element.
  //  */
  // getSnapshotBeforeUpdate(prevProp, prevState) {
  //     console.log('[completedTask.js] getSnapshotBeforUpdate');
  //     return { snap: 'snaplshot' }
  // }

  // /**
  //  * This lifecycle method called each time after when something is updated
  //  * in the state of the component
  //  */
  // componentDidUpdate = (prop, state, snap) => {
  //     console.log('[completedTask.js] componentDidUpdate', prop, state, snap)
  // }

  // /**
  //  * This lifecycle method called once when the component is destroyed
  //  */
  // componentWillUnmount = () => {
  //     console.log('[completedTask.js] componentWillUnmount')
  // };
  /************************************************************************************/
}

CompletedTask.propTypes = {
  completedTask: PropTypes.object,
  removeCompletedTaskHandler: PropTypes.func
};

export default CompletedTask;