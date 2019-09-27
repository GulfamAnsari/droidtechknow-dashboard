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
    const { tasks } = this.props.taskState;
    // const tasks = [{ title: 'Hello', time: '12:30PM', 'description': 'description', priority: 'high', completed: false }, { title: 'low', 'description': 'description', priority: 'low', completed: false }, { title: 'medium', 'description': 'description', priority: 'medium', completed: false }, { title: 'Hello', 'description': 'description', priority: 'high', completed: true }]
    const { openNewTodo } = this.state;

    return (
      <div className="content">
        <div className="container-fluid">
          <section className="todo-list-container">
            <div className="todo-in-progress col-md-8">
              <h2> Working tasks</h2>
              <ul onDragStart={() => { console.log('on drag called') }} className="todo-list" id="target">
                {/* Warning Task */}
                {
                  tasks.map((task, index) => {
                    // setting index as  a key is not a good way
                    if (!task.completed) {
                      return <Task
                        task={task}
                        key={index}
                        deleteTaskHandler={() => { this.deleteTaskHandler(index) }}
                        addCompletedTaskHandler={() => { this.addCompletedTaskHandler(index) }}
                      />
                    }
                  })
                }

                {/* New Task creator form pop up */}
                <AddTask addNewTodoHandler={this.addNewTodoHandler.bind(this)} />
              </ul>
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