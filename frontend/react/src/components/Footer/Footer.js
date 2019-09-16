import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container-fluid">
          <nav className="float-left">
            <ul>
              <li>
                <a className="text-gray" href="https://droidtechknow.com/about" target="_blank" rel="noopener noreferrer">
                  About Us
                </a>
              </li>
              <li>
                <a className="text-gray" href="https://droidtechknow.com/about" target="_blank" rel="noopener noreferrer">
                  Blog
                </a>
              </li>
            </ul>
          </nav>
          <div className="copyright float-right text-gray">
            © 2019, DroidTechKnow
                </div>
        </div>
      </footer>
    )
  }
}
