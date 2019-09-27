import React from 'react';
import './AddTask.scss';

export default function AddTask({ openNewTodo, toggleTodoHandler, addNewTodoHandler }) {

  let formData = {
    title: '',
    description: '',
    priority: 'High'
  };


  function onSubmitHandler(event) {
    event.preventDefault();
    formData['time'] = new Date().toLocaleString();
    addNewTodoHandler(formData);
  }

  function onChangeHandler(event) {
    formData[event.target.name] = event.target.value;
  }

  return (
    <div className="__Add_TODO_Container">
      <div class="modal fade" id="addTodo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <form role="form" id="todoForm" onSubmit={onSubmitHandler}>
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <section className="main-content">
                  <section className="todo-form">

                    <div className="row">
                      <label htmlFor="title"> Title </label>
                      <input onChange={onChangeHandler} className="form-input" name="title" id="title" type="text" placeholder="Learn JavaScript" />
                    </div>
                    <div className="row">
                      <label htmlFor="description"> Description </label>
                      <textarea onChange={onChangeHandler} id="description" name="description" rows="4" cols="30" placeholder="Coz you already know Java"></textarea>
                    </div>
                    <div className="row">
                      <label htmlFor="priority"> Priority </label>
                      <select onChange={onChangeHandler} id="priority" name="priority">
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                  </section>
                </section>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">DO IT</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
