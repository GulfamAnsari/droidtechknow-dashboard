import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function Task(props) {
  const { task, deleteTaskHandler, addCompletedTaskHandler } = props;

  /************************** React hooks *********************************************/
  /**
   * Use effect function of react hook calls everytime after render method
   * when something change in the component.
   * You can restrict the useeffect running cycle by passing the 2nd argument as an array.
   */
  // useEffect(() => {
  //     console.log('[Task.js] useEffect() React hook');
  // });

  // This is only called when delete handler is chnages, you can leave empty array
  // if you want to call useEffect() only once
  // useEffect(() => {
  //     console.log('[Task.js] useEffect() React hook when task changes');
  // }, [task]);

  // useEffect(() => {
  //     return () => {
  //         console.log('[Task.js] useEffect() React hook cleanup task go here');
  //     }
  // }, []);
  /****************************************************************************************/

  return (
    <li draggable="true" className={'todo-item ' + task.priority.toLowerCase()}>
      <div className="todo-card">
        <h3 className="todo-title">
          <span className="action">
            <i className="material-icons md-36 icon-delete" onClick={() => { deleteTaskHandler(task.key) }}>delete</i>
            <i className="icon-checkbox-outline material-icons md-36 md-dark" onClick={() => { addCompletedTaskHandler(task.key) }}>check_box_outline_blank</i>
            <i className="icon-checkbox material-icons md-36 md-light">check_box</i>
          </span>
          <span className="title">{task.title} </span></h3>
        <p className="todo-description">
          {task.description} </p>
        <span className="todo-priority"> {task.priority}</span>
        <span className="time">{task.time}</span>
      </div>
    </li>
  )
}

Task.propTypes = {
  task: PropTypes.object,
  deleteTaskHandler: PropTypes.func,
  addCompletedTaskHandler: PropTypes.func
};

// React memo take the screenshot of current component props. So if nothing is changes then
// DOM does not rerender
export default React.memo(Task);
