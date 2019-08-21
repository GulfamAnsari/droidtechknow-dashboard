import React, { Component } from 'react';
import * as constants from './constant';
import Quill from 'quill';

class TextEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount = () => {
    this.createQuill();
  }

  createQuill = () => {
    var container = document.getElementById('editor');
    var options = {
      debug: 'info',
      modules: {
        toolbar: constants.TOOLBAR_OPTIONS
      },
      placeholder: 'Compose an epic...',
      readOnly: false,
      theme: 'snow'
    };
    var editor = new Quill(container, options);
  }

  render() {
    return (
      <div id="editor">
      </div>
    )
  }
}

export default TextEditor;