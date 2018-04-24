import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Data/>
      </div>
    );
  }
}

class Data extends Component {
  state = {
    artists: []
  }
  render() {
    return this.state.artists
  }
  async componentDidMount() {
    //https://api.spotify.com/v1/albums/1TUjTdwVe9DLxegWVijHJe
   
    const resp = await fetch('http://localhost:3005/token')
    const tokenObj = await resp.json()
    const access_token = tokenObj.token
    if (access_token) {
      const response = await fetch('https://api.spotify.com/v1/albums/1TUjTdwVe9DLxegWVijHJe', {
        headers: new Headers({
          'Authorization': 'Bearer ' + access_token, 
        })
      });
      console.log(response);
      const data = await response.json()
      let artists = data.artists.map((artist) => {
        return (
            <p key={artist.id}>{artist.name}</p>
        )
      })
      this.setState({data})
      this.setState({artists})
  
      console.log(this.state.data)
      console.log(this.state.artists)
    }
    
  }
}

export default App;
