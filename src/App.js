import PouchDB from 'pouchdb';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const db = new PouchDB('blocked');

const BlockedSites = ({blockedSites}) => {
  const sites = blockedSites.map((site) =>
    <div key={site._id}>
      <span>{site.url}</span>
      <span>{site.redUrl}</span>
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
      blockedSites: [],
      sitePattern: ''
    };

    this.blockSite = this.blockSite.bind(this);
    this.setSitePattern = this.setSitePattern.bind(this);
  }

  setSitePattern(event) {
    this.setState({ sitePattern: event.target.value});
  }

  blockSite() {
    let pattern = this.state.sitePattern;
    let doc = {
      _id: pattern,
      url: pattern,
      redUrl: ''
    };
    db.put(doc).then(res => {
      this.setState((prevState, props) => ({
        blockedSites: [doc, ...prevState.blockedSites]
      }))
    });
  }

  componentDidMount() {
    db.allDocs({ include_docs: true }).then((res) => {
      this.setState({
        blockedSites: res.rows.map(row => ({
          _id: row.id,
          url: row.doc.url,
          redUrl: row.doc.redUrl
        }))
      });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">The Blocker</h1>
        </header>
        <div>
          <input type="text"
            onChange={this.setSitePattern}
            value={this.state.sitePattern}
            placeholder="Site to block"/>
          <button onClick={this.blockSite}>Block</button>
        </div>
        <BlockedSites blockedSites={this.state.blockedSites} />
      </div>
    );
  }
}

export default App;
