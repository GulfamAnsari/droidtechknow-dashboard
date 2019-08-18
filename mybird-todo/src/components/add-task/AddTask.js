import React from 'react';
import './AddTask.css';

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
    <main role="main" className={openNewTodo ? 'main-wrap' : 'hidden'}>
      <header role="heading" className="header">
        <h1 className="app-header"> Add your task <span className="close-add-task" onClick={() => { toggleTodoHandler(false) }}>X</span></h1>
      </header>
      <section className="main-content">
        <section className="todo-form">
          <form role="form" id="todoForm" onSubmit={onSubmitHandler}>
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
            <div className="row submit-btn">
              <input onChange={onChangeHandler} type="submit" className="primary-button" value="DO IT" />
            </div>
          </form>
        </section>
      </section>
    </main>
  )
}
