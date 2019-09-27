import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from '../../Card/Card';

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
    <Card card={{
      title: task.title,
      description: task.description,
      description_icon: "",
      stats: task.time,
      stats_icon: "access_time",
      actions: [{ name: 'Done', function: addCompletedTaskHandler }, { name: 'Edit', function: '' }, { name: 'Delele', function: deleteTaskHandler }],
      cardClass: task.priority.toLocaleLowerCase() === "high" ? "card-header-danger" : task.priority.toLocaleLowerCase() === "low" ? "card-header-success" : "card-header-warning"
    }} />
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
