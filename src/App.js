import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const BlockedSiteList = ({blockedSites}) => {
  const sites = blockedSites.map((site, index) =>
    <div key={index}>
      <span>{site.url}</span>
      <span>{site.redirectUrl}</span>
    </div>
  )
  return (
    <div>{sites}</div>
  )
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      blockedSites: [
        { url: 'http://prothom-alo.com' },
        { url: 'http://bdnews24.com' },
      ]
    };
  }

  componendDidMount() {
  
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">The Blocker</h1>
        </header>
        <BlockedSiteList blockedSites={this.state.blockedSites} />
      </div>
    );
  }
}

export default App;
