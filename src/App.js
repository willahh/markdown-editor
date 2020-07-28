import React, { Component } from 'react';
import marked from 'marked'

import './App.css';
import { sampleText } from './sampleText'


class App extends Component {
  state = {
    text: sampleText
  }

  componentDidMount () {
    console.log('Je suis monté.');

    const text = localStorage.getItem('text')
    if (text) {
      this.setState({text});
    } else {
      this.setState({ text: sampleText });
    }
  }

  componentDidUpdate () {
    console.log('Je suis mis à jour.');
    const { text } = this.state
    
    localStorage.setItem('text', text)
  }

  handleChange = event => {
    const text = event.target.value
    this.setState({ text })
  }

  renderText = text => {
    const __html = marked(text, { sanitize: true })
    return { __html }
  }

  render () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <textarea onChange={this.handleChange} className="form-control" rows="35" value={this.state.text}></textarea>
          </div>
          <div className="col-sm-6">
            <div dangerouslySetInnerHTML={this.renderText(this.state.text)}>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
