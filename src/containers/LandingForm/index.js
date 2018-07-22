import React, { Component } from 'react';

export class LandingForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      location: '',
      keywords: ''
    };
  }

  render(){
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">Scene-It</h1>
        </header>
        <form className="landing-form">
          <label htmlFor="location"></label>
          <input id="location" placeholder="location" />
          <label htmlFor="keywords" /> 
          <input id="keywords" placeholder="keywords" />
        </form>
      </div>
    );
  }
}