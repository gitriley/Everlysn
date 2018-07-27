import React, { Component } from 'react';
import BarGraphFeature from './barGraphFeature.js' 
import TextFeature from './textFeature.js' 

class RelatedTracks extends Component {

    constructor(props) {
        super(props)
        this.representation = this.representation.bind(this)
        this.selectTrack = this.selectTrack.bind(this);
        this.setActiveFeature = this.setActiveFeature.bind(this)
    }
    state = {
        trackFeatures : [
            'acousticness',
            'danceability',
            'energy',
            'instrumentalness',
            'key',
            'liveness',
            'loudness',
            'mode',
            'speechiness',
            'tempo',
            'time_signature',
            'valence',
        ],
        activeFeature: 'danceability'
    }

    toggle(feature) {
        this.props.toggleQueryFeatures(feature)
    }

    representation(track) {
        const value = track.features[this.props.activeFeature]
        console.log('value', this.props.activeFeature)
        switch(this.props.activeFeature) {
        case 'key':
        case 'mode':
        case 'time_signature':
            return <TextFeature className="graph-bar" 
                                val={value}
                                feature={this.props.activeFeature}/>
        default:
            return <BarGraphFeature className="graph-bar" 
                                    val={value}
                                    feature={this.props.activeFeature}/>
        }
    }

    RelatedTrackList() {
        return this.props.relatedTracks.map((track) => {
            return (
                <div className='feature-row' key={track.id}>
                    <div class='load-track_wrapper' onClick={() => this.props.loadTrackInPlayer(track.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class='load-track_svg' x="0px" y="0px" viewBox="0 0 60 60" >
                            <g>
                                <path d="M34.437,7.413c-0.979-0.561-2.143-0.553-3.115,0.019c-0.063,0.037-0.121,0.081-0.174,0.131L17.906,19.891   C17.756,19.963,17.593,20,17.427,20H9.104C7.392,20,6,21.393,6,23.104v12.793C6,37.607,7.392,39,9.104,39h8.324   c0.166,0,0.329,0.037,0.479,0.109l13.242,12.328c0.053,0.05,0.112,0.094,0.174,0.131c0.492,0.289,1.033,0.434,1.574,0.434   c0.529,0,1.058-0.138,1.541-0.415C35.416,51.027,36,50.021,36,48.894V10.106C36,8.979,35.416,7.973,34.437,7.413z M34,48.894   c0,0.577-0.389,0.862-0.556,0.958c-0.158,0.09-0.562,0.262-1.025,0.037l-13.244-12.33c-0.054-0.051-0.113-0.095-0.176-0.131   C18.522,37.147,17.979,37,17.427,37H9.104C8.495,37,8,36.505,8,35.896V23.104C8,22.495,8.495,22,9.104,22h8.324   c0.551,0,1.095-0.147,1.572-0.428c0.063-0.036,0.122-0.08,0.176-0.131l13.244-12.33c0.465-0.226,0.868-0.053,1.025,0.037   C33.611,9.244,34,9.529,34,10.106V48.894z"></path>
                                <path d="M43.248,17.293c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414c6.238,6.238,6.238,16.39,0,22.628   c-0.391,0.391-0.391,1.023,0,1.414c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293   C50.266,35.73,50.266,24.312,43.248,17.293z"></path>
                                <path d="M39.707,20.293c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414c4.297,4.297,4.297,11.289,0,15.586   c-0.391,0.391-0.391,1.023,0,1.414C38.488,38.902,38.744,39,39,39s0.512-0.098,0.707-0.293   C44.784,33.63,44.784,25.37,39.707,20.293z"></path>
                                <path d="M46.183,12.293c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414c4.356,4.355,6.755,10.142,6.755,16.293   s-2.399,11.938-6.755,16.293c-0.391,0.391-0.391,1.023,0,1.414C44.964,47.902,45.22,48,45.476,48s0.512-0.098,0.707-0.293   c4.734-4.733,7.341-11.021,7.341-17.707S50.917,17.026,46.183,12.293z"></path>
                                <path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30   S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"></path>
                            </g>
                        </svg>
                    </div>
                    <div class='external-link_wrapper'>
                        <a href={track.external_urls.spotify} target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="external-link_svg" x="0px" y="0px" viewBox="0 0 493.253 493.253">
                                <path d="M246.626,0C110.418,0,0,110.419,0,246.627  c0,136.207,110.418,246.626,246.626,246.626s246.626-110.419,246.626-246.626C493.252,110.419,382.834,0,246.626,0z   M358.248,372.355c-4.022,6.749-12.543,9.472-19.83,6.246c-1.463-0.641-2.836-1.51-4.221-2.334  c-27.037-16.016-56.214-25.944-87.219-30.686c-19.031-2.917-38.168-3.923-57.381-3.169c-24.857,0.973-49.402,4.416-73.682,9.787  c-2.453,0.549-4.981,1.052-7.476,1.075c-7.515,0.068-13.864-5.257-15.187-12.485c-1.395-7.654,2.397-14.826,9.422-17.651  c1.483-0.595,3.061-0.973,4.626-1.327c19.859-4.45,39.912-7.836,60.195-9.553c11.331-0.961,22.695-1.326,34.05-1.967  c33.592,0.355,66.451,4.897,98.338,15.648c17.588,5.926,34.387,13.603,50.34,23.103c1.377,0.823,2.785,1.636,4.055,2.608  C360.719,356.535,362.394,365.377,358.248,372.355z M389.505,302.861c-5.65,9.26-17.381,12.143-27.135,6.651  c-5.501-3.111-10.939-6.331-16.563-9.202c-25.783-13.145-53.128-21.667-81.499-27.031c-21.844-4.142-43.889-6.154-67.322-6.258  c-29.175,0.125-59.065,3.74-88.266,12.4c-4.758,1.418-9.535,1.51-14.19-0.377c-7.585-3.066-12.521-10.674-12.252-18.71  c0.273-8.396,5.394-15.694,13.48-18.165c8.232-2.518,16.588-4.691,24.99-6.567c20.682-4.598,41.65-7.023,62.83-7.824  c45.568-1.728,90.086,4.164,133.515,18.086c21.964,7.035,42.973,16.249,62.814,28.056c0.984,0.584,1.963,1.189,2.952,1.784  C393.201,282.017,394.437,294.75,389.505,302.861z M392.521,230.604c-11.016-6.234-22.289-11.885-34.039-16.592  c-23.341-9.358-47.524-15.648-72.244-20.008c-17.205-3.031-34.541-5.045-51.976-6.098c-18.126-1.086-36.264-1.213-54.413-0.274  c-20.801,1.075-41.433,3.363-61.795,7.756c-7.514,1.625-14.934,3.673-22.369,5.651c-4.559,1.235-9.049,1.373-13.585,0.046  c-9.929-2.905-16.78-11.806-17.071-22.216c-0.293-10.129,5.959-19.533,15.775-22.77c7.184-2.368,14.556-4.232,21.934-5.938  c18.263-4.221,36.777-6.84,55.446-8.533c19.825-1.808,39.679-2.391,59.548-1.83c48.961,1.406,96.961,8.557,143.416,24.594  c18.938,6.544,37.173,14.66,54.498,24.771c6.177,3.593,10.324,8.672,11.902,15.707c0.377,1.671,0.463,3.398,0.686,5.113  C428.161,228.465,408.765,239.79,392.521,230.604z"></path>
                            </svg>
                        </a>
                    </div>
                    <div className='rel-track_text'>
                        <p  id={track.id}
                            className='rel-track_name'
                            onClick={this.selectTrack}>{track.name}</p>
                        <p className='rel-track_artist'>{track.artists[0].name}</p>
                    </div>
                    {this.representation(track)}
                    <div class='rel-track_val'>{track.features[this.props.activeFeature].toFixed(2)}</div>
                </div>)
        })
    }

    selectTrack = (e) => {
        e.preventDefault();
        this.props.setActiveTrack(e.currentTarget.getAttribute('id'))
    } 

    setActiveFeature = (e) => {
        e.preventDefault();
        this.props.setActiveFeature(e.target.value)
    }

    render() {
        if (this.props.relatedTracks.length > 18) {
            //const list = this.buildList()
            return (
                <div className='related-tracks'>
                    <div>{this.RelatedTrackList()}</div>
                </div>
            )
        } else {
            return ''
        }
        
    }
}

export default RelatedTracks;
//<span>{track.features[this.state.activeFeature]}</span>