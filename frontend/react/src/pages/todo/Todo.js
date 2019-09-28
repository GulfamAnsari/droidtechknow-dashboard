import React, { Component } from 'react';
import AddTask from '../../components/Todo/add-task/AddTask';
import CompletedTask from '../../components/Todo/completed-task/CompletedTask';
import Task from '../../components/Todo/tasks/Task';
import { connect } from 'react-redux';
import * as actions from './store/actions';
import './Todo.scss';

class Todo extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  addNewTodoHandler(data) {
    const { tasks } = this.props.taskState;
    tasks.push(data);
    this.props.updateTasks(tasks);
  }

  deleteTaskHandler(index) {
    const { tasks } = this.props.taskState;
    tasks.splice(index, 1);
    this.props.updateTasks(tasks);
  }

  removeCompletedTaskHandler(index) {
    const { tasks } = this.props.taskState;
    tasks[index].completed = false;
    this.props.updateTasks(tasks);
  }

  addCompletedTaskHandler(index) {
    const { tasks } = this.props.taskState;
    tasks[index].completed = true;
    this.props.updateTasks(tasks);
  }

  render() {
    // const { tasks } = this.props.taskState;
    const tasks = [{"title":"verify www.droidtechknow domain in google webmater","description":"","priority":"High","time":"01/08/2019, 11:33:15"},{"title":"call zest dealer ","description":"Paytm zest dealer","priority":"High","time":"01/08/2019, 13:24:52","completed":true},{"title":"How to check your IP address Ubuntu 16.04 | 18.04","description":"","priority":"High","time":"8/2/2019, 5:16:21 PM","completed":true},{"title":"Resolve droidtechknow google webmaster issue","description":"We need to resolve webmaster issue. The main three issues in the webmaster tool and the all issues in the the page is not mobile friendly ","priority":"High","time":"8/8/2019, 12:49:43 PM","completed":true},{"title":"Do something with mc-validate.js","description":"In website it takes around 2s to download everytime","priority":"High","time":"09/08/2019, 16:23:18"},{"title":"Fill investment declation form","description":"","priority":"High","time":"14/08/2019, 16:01:24","completed":true},{"title":"g","description":"Currently what is happening is that we call the same API, again and again, to fetch the ticket data for all the tabs(ALL, SOLVED, OPEN) and store the data. So if we first scroll down on SOLVED tab then it fetched the results and save those results. After that, if I open another tab the same stored data reflected in the OPEN tab. \n\nAnother corner case is, if we have some older open issues then we need to scroll `ALL or SOLVED` tab to fetch the data because we cant scroll OPEN tab if there are no newly OPEN issues.\n\n\n\nSolution: We need to pass tab detail in the API URL to fetch the corresponding TAB data. \n\nJyotish Kumar Devratna Arya Can we fetch the tickets for particular tab? \n\nAPI END POINT: ﻿https://apiproxy.paytm.com/v1/user/tickets${request_parameters}&limit=10&offset=${offset}\n\n\n\n","priority":"High","time":"30/08/2019, 17:39:44"},{"title":"smartphone under 10000","description":"","priority":"High","time":"9/1/2019, 4:19:28 PM","completed":true},{"title":"Write article","description":"Best 10 Ubuntu screen recorder and How to Install those on Ubuntu","priority":"High","time":"08/09/2019, 14:10:11","completed":true},{"title":"Video","description":"how to find your ip address on ubuntu - Three simple ways","priority":"High","time":"08/09/2019, 14:31:25"},{"title":"Pay electricity bill","description":"","priority":"High","time":"9/26/2019, 10:34:50 AM","completed":true},{"title":"Cancel YouTube premium account ","description":"","priority":"medium","time":"9/26/2019, 10:35:15 AM","completed":true},{"title":"yahoo app","description":"App ID\niWpWMJ5c\nClient ID (Consumer Key)\ndj0yJmk9TVNOYXdOSWJNaU1FJmQ9WVdrOWFWZHdWMDFLTldNbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWY5\nClient Secret (Consumer Secret)\n034b615a6f8795be36ca16d8ad8bf9adbf9d8e08","priority":"High","time":"28/09/2019, 00:35:30"},{"title":"","description":"I am selling this because i need to shift my flat on very urgently. This is a very high quality matress which i bought just few months back. Its a best condition and super dfluppy also.","priority":"High","time":"28/09/2019, 11:49:37"}]
    const { openNewTodo } = this.state;

    return (
      <div className="content">
        <div className="container-fluid">
          <section className="todo-list-container">
            <div className="todo-in-progress col-md-7">
              <h2> Working tasks</h2>
              <div onDragStart={() => { console.log('on drag called') }} className="todo-list" id="target">
                
                {
                  tasks.map((task, index) => {
                    // setting index as  a key is not a good way
                    if (!task.completed) {
                      return <div className="todo-box"><Task
                        task={task}
                        key={index}
                        deleteTaskHandler={() => { this.deleteTaskHandler(index) }}
                        addCompletedTaskHandler={() => { this.addCompletedTaskHandler(index) }}
                      /></div>
                    }
                  })
                }
                

                {/* New Task creator form pop up */}
                <AddTask addNewTodoHandler={this.addNewTodoHandler.bind(this)} />
              </div>
            </div>

            {/* completed todo task of app */}
            <div className="todo-completed col-md-4">
              <ul className="todo-list-completed">
                <h2> Completed Tasks </h2>
                {
                  tasks.map((task, index) => {
                    if (task.completed) {
                      return <CompletedTask
                        completedTask={task}
                        key={index}
                        removeCompletedTaskHandler={this.removeCompletedTaskHandler.bind(this, index)}
                      />
                    }
                  })
                }
              </ul>
            </div>
            <button type="button" data-toggle="modal" data-target="#addTodo" className="add-button"><i className="fa fa-plus"></i></button>
          </section>
        </div>
      </div>
    )
  }

  /**
 * This Lifecycle function once when the component is created after the
 * render() method. So because it runs only once, you can do some request
 * to fetch the application data.
 */
  componentDidMount = () => {
    this.props.fetchTasks();
  }
}

const mapStateToProps = (state) => {
  return {
    taskState: state.Todo_Reducer.taskState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateTasks: (tasks) => dispatch(actions.updateTask(tasks)),
    fetchTasks: () => dispatch(actions.fetchTasks()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);