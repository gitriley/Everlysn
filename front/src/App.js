import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './components/search.js'

class App extends Component {

  state = {
    activeArtist: '',
    access_token: ''
  }

  async componentWillMount() {
    //https://api.spotify.com/v1/albums/1TUjTdwVe9DLxegWVijHJe 4KdtEKjY3Gi0mKiSdy96ML
   // https://open.spotify.com/track/1f5PNhkNgUpvDEeZfcIlO1
    const resp = await fetch('http://localhost:3005/token')
    console.log(resp)
    const tokenObj = await resp.json()
    const access_token = tokenObj.token
    console.log(access_token)
    if (access_token) {
      this.setState({access_token})
    }
    console.log(this.state.access_token)
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Search token={this.state.access_token}/>
      </div>
    );
  }
}


// class Data extends Component {
//   state = {
//     artists: []
//   }
//   render() {
//     return this.state.artists
//   }
//   async componentDidMount() {
//     //https://api.spotify.com/v1/albums/1TUjTdwVe9DLxegWVijHJe 4KdtEKjY3Gi0mKiSdy96ML
//    // https://open.spotify.com/track/1f5PNhkNgUpvDEeZfcIlO1
//     const resp = await fetch('http://localhost:3005/token')
//     const tokenObj = await resp.json()
//     const access_token = tokenObj.token
//     if (access_token) {
//       // https://api.spotify.com/v1/recommendations?seed_tracks=7497sdinamfWt5FFPEjVcZ"
//       // const response = await fetch('https://api.spotify.com/v1/audio-features/1f5PNhkNgUpvDEeZfcIlO1', {
//       //   headers: new Headers({
//       //     'Authorization': 'Bearer ' + access_token, 
//       //   })
//       // });
//       const response = await fetch('https://api.spotify.com/v1/recommendations?seed_tracks=7497sdinamfWt5FFPEjVcZ', {
//         headers: new Headers({
//           'Authorization': 'Bearer ' + access_token, 
//         })
//       });
//       console.log(response);
//       const data = await response.json()
//       console.log(data)
//       let trackIds = data.tracks.map((track) => {
//         return track.id;
//       });
//       console.log(trackIds)

//       // let artists = data.artists.map((artist) => {
//       //   return (
//       //       <p key={artist.id}>{artist.name}</p>
//       //   )
//       // })
//       const tFs = await fetch('https://api.spotify.com/v1/audio-features/?ids=' + trackIds, {
//         headers: new Headers({
//           'Authorization': 'Bearer ' + access_token, 
//         })
//       });
//       const trackFeatures = await tFs.json()
//       console.log(trackFeatures)
//       // this.setState({data})
//       // this.setState({artists})
  
//       // console.log(this.state.data)
//       // console.log(this.state.artists)
//     }
    
//   }
// }

export default App;
