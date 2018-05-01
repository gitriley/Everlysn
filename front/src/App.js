import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './components/search.js'
import TrackContent from './components/trackContent.js'
import TrackFeatures from './components/trackFeatures.js'
import RelatedTracks from './components/relatedTracks.js'

class App extends Component {

  constructor(props) {
    super(props);
    this.setActiveTrack = this.setActiveTrack.bind(this);
    this.setAppMode = this.setAppMode.bind(this);
    this.enterFeatureSelectionMode = this.enterFeatureSelectionMode.bind(this)
  }



  state = {
    activeTrackId: '',
    access_token: '',
    appMode: '',
    activeTrack: {},
    featureSelectionMode: false
  }

  async setActiveTrack(trackId) {
    console.log(trackId)
    this.setState({activeTrackId: trackId}, async function() {
      if (!(this.state.appMode === 'trackFeatures')) {
        this.setState({appMode: 'trackFeatures'})
        console.log(this.state)
      }

      const url = `https://api.spotify.com/v1/tracks/${this.state.activeTrackId}`
      console.log(url)

      const resp = await fetch(url,{
        headers: new Headers({
          'Authorization': 'Bearer ' + this.state.access_token, 
        })
      })
      const trackData = await resp.json()

      if (trackData) {
        this.setState({ activeTrack: trackData}, ()=> {
          console.log(this.state)
        })
      }
    })

  }

  setAppMode = (mode) => {
    this.setState({appMode: mode})
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

  enterFeatureSelectionMode() {
    this.setState({featureSelectionMode: true})
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        
        <Search token={this.state.access_token}
                setActiveTrack={this.setActiveTrack}
                mode={this.state.appMode}
                setAppMode={this.setAppMode}/>

        {(this.state.appMode === 'trackFeatures') 
          ? <TrackFeatures token={this.state.access_token}
                           trackId = {this.state.activeTrackId} 
                           featureSelectionMode = {this.state.featureSelectionMode}/> 
          : ""}

        {(this.state.appMode !== 'search') 
          ? <div className="side-bar"> 
              <TrackContent track={this.state.activeTrack}
                            enterFeatureSelectionMode = {this.enterFeatureSelectionMode}/> 
            </div>
          : ""}
          
          
        
        
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

// {(this.state.appMode === 'trackFeatures') ? <TrackFeatures/> : ""}
// {(this.state.appMode === 'relatedTracks') ? <RelatedTracks/> : ""}

export default App;
