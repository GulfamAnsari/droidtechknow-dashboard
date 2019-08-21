import React from 'react';
import './Header';

export default function Header() {
  return (
    <header className="page-title">
      <h1>  <i className="material-icons">view_list</i>
        TODO</h1>
      <div className="tag"> An easy way to manage your work. <span className="caret">|</span></div>
    </header>
  )
}
