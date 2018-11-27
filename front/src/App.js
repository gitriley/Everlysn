import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleFeatureSelectionMode } from "./actions";
import logo from "./logo.svg";
import "./App.css";
// import FetchToken from './lib/fetchToken.js'
// import FetchTrack from './lib/fetchTrack.js'
// import FetchTrackFeatures from './lib/fetchTrackFeatures.js'
// import FetchRelatedTracks from './lib/fetchRelatedTracks.js'
import * as Spotify from "./lib/fetchFromSpotify.js";
import Search from "./components/search.js";
import TrackImage from "./components/trackImage.js";
import TrackFeatures from "./components/trackFeatures.js";
import RelatedTracks from "./components/relatedTracks.js";
import Header from "./components/header.js";
import ControlPanel_RelTracks from "./components/controlPanel_RelatedTracks.js";
import ControlPanel_TrackFeats from "./components/controlPanel_TrackFeatures.js";
import FooterAudioPlayer from "./components/FooterAudioPlayer.js";

export class App extends Component {
  // app modes: trackFeatures, relatedTracks, search
  constructor(props) {
    super(props);
    this.setActiveTrack = this.setActiveTrack.bind(this);
    this.setAppMode = this.setAppMode.bind(this);
    this.onFindSimilarTracks = this.onFindSimilarTracks.bind(this);
    this.setActiveFeature = this.setActiveFeature.bind(this);
    this.sortTracksAscending = this.sortTracksAscending.bind(this);
    this.sortTracksDescending = this.sortTracksDescending.bind(this);
    this.updateToken = this.updateToken.bind(this);
    this.tokenNeedsRefreshed = this.tokenNeedsRefreshed.bind(this);
  }

  state = {
    activeTrackId: "",
    currentlyPlayingTrackId: "",
    access_token: "",
    tokenInfo: {
      ageWhenReceived: null,
      timeWhenReceived: null
    },
    appMode: "search",
    activeTrack: {},
    featureSelectionMode: false,
    queryFeatures: {
      acousticness: false,
      danceability: false,
      energy: false,
      instrumentalness: false,
      key: false,
      liveness: false,
      loudness: false,
      mode: false,
      speechiness: false,
      tempo: false,
      time_signature: false,
      valence: false
    },
    trackFeatures: {},
    relatedTracks: {},
    activeFeature: "danceability"
  };

  async setActiveTrack(trackId) {
    this.setState(
      {
        activeTrackId: trackId,
        activeTrack: {},
        trackFeatures: {}
      },
      async function() {
        if (!(this.state.appMode === "trackFeatures")) {
          this.setState({ appMode: "trackFeatures" });
        }

        if (this.tokenNeedsRefreshed(this.state.tokenInfo)) {
          this.updateToken();
        }

        this.setState({
          activeTrack: await Spotify.fetchTrack(
            this.state.activeTrackId,
            this.state.access_token
          ),
          trackFeatures: await Spotify.fetchTrackFeatures(
            this.state.activeTrackId,
            this.state.access_token
          )
        });
      }
    );
  }

  setAppMode = mode => {
    this.setState({ appMode: mode });
  };

  async updateToken() {
    const tokenObj = await Spotify.fetchToken();
    this.setState({
      access_token: tokenObj.token,
      tokenInfo: {
        ageWhenReceived: tokenObj.token_age_minutes,
        timeWhenReceived: Date.now()
      }
    });
  }

  tokenNeedsRefreshed(tokenInfo) {
    const totalAge =
      Math.floor((Date.now() - tokenInfo.timeWhenReceived) / 60000) +
      tokenInfo.ageWhenReceived;
    if (totalAge > 50) {
      return true;
    } else {
      return false;
    }
  }

  async componentWillMount() {
    await this.updateToken();
  }

  

  buildRecommendationQueryString() {
    const artists = this.state.activeTrack.artists;
    const artist1String = `&seed_artists=${artists[0].id}`;
    const artist2String = artists[1] ? `&seed_artists=${artists[1].id}` : "";
    const artist3String = artists[2] ? `&seed_artists=${artists[2].id}` : "";
    const artistsString = `${artist1String}${artist2String}${artist3String}`;
    const trackString = `seed_tracks=${this.state.activeTrackId}`;

    const featuresToSearchBy = Object.keys(
      this.props.store.queryFeatures
    ).filter(feature => {
      return this.props.store.queryFeatures[feature] === true;
    });
    let featuresStrings = featuresToSearchBy.map(feature => {
      if (this.props.store.queryFeatures[feature] === true) {
        return `&${feature}=${this.state.trackFeatures[feature]}`;
      }
    });
    const featuresString = featuresStrings.join("");
    const queryString = `${featuresString}${trackString}${artistsString}`;
    return queryString;
  }

  async onFindSimilarTracks() {
    if (this.tokenNeedsRefreshed(this.state.tokenInfo)) {
      this.updateToken();
    }

    const queryString = this.buildRecommendationQueryString();
    this.setState(
      {
        relatedTracks: await Spotify.fetchRelatedTracks(
          queryString,
          this.state.access_token
        )
      },
      this.setAppMode("relatedTracks")
    );
    this.props.dispatch(toggleFeatureSelectionMode(false));
    //this.setState({ featureSelectionMode: false })
  }

  setActiveFeature(feature) {
    this.setState({ activeFeature: feature });
  }

  sortTracksAscending(attribute) {
    let sortedTracks = this.state.relatedTracks.slice();
    sortedTracks.sort(function(a, b) {
      return a.features[attribute] - b.features[attribute];
    });
    this.setState({ relatedTracks: sortedTracks });
  }

  sortTracksDescending(attribute) {
    let sortedTracks = this.state.relatedTracks.slice();
    sortedTracks.sort(function(a, b) {
      return b.features[attribute] - a.features[attribute];
    });
    this.setState({ relatedTracks: sortedTracks });
  }

  render() {
    let audioPlayerId;
    if (this.props.store) {
      audioPlayerId = this.props.store.audioPlayerId;
    }

    const iframeURL =
      "https://open.spotify.com/embed?uri=spotify:track:" +
      audioPlayerId +
      "&theme=white";
    return (
      <div className={'App ' + (audioPlayerId ? "hasFooter" : "") + this.props.store.theme}>
        <Search
          token={this.state.access_token}
          setActiveTrack={this.setActiveTrack}
          mode={this.state.appMode}
          setAppMode={this.setAppMode}
          tokenNeedsRefreshed={this.tokenNeedsRefreshed}
          tokenInfo={this.state.tokenInfo}
          updateToken={this.updateToken}
        />
        {this.state.appMode !== "search" && (
          <div className="top">
            <TrackImage track={this.state.activeTrack} />
            <Header track={this.state.activeTrack} />
          </div>
        )}

        {this.state.appMode === "trackFeatures" && (
          <div className="feature-main_wrapper">
            <div className="feature-description">
              <ControlPanel_TrackFeats
                findSimilarTracks={this.onFindSimilarTracks}
              />
            </div>

            <TrackFeatures
              queryFeatures={this.props.store.queryFeatures}
              features={this.state.trackFeatures}
            />
          </div>
        )}

        {(this.state.appMode === "relatedTracks") && (
          <div className="feature-main_wrapper">
            <div className="feature-description">
              <ControlPanel_RelTracks
                activeFeature={this.state.activeFeature}
                setActiveFeature={this.setActiveFeature}
                findSimilarTracks={this.onFindSimilarTracks}
                sortTracksAscending={this.sortTracksAscending}
                sortTracksDescending={this.sortTracksDescending}
              />
            </div>
            <RelatedTracks
              relatedTracks={this.state.relatedTracks}
              setActiveTrack={this.setActiveTrack}
              activeFeature={this.state.activeFeature}
              setActiveFeature={this.setActiveFeature}
            />
          </div>
        )}

        <FooterAudioPlayer />
      </div>
    );
  }
}

function mapStateToProps(store) {
  return { store };
}

export const ConnectApp = connect(mapStateToProps)(App);
//export default App
