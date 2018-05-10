import React, { Component } from 'react';

class Header extends Component {

    constructor(props) {
        super(props);
        this.onButtonClick = this.onButtonClick.bind(this);
    }


    listArtists() {
        if (!this.props.track.artists) {
            return
        }
        let artists = this.props.track.artists.map((artist, index) => {
            console.log(index);
            if (index > 0) {
                console.log('should render dot before', artist.name)
                return (
                    <span> • {artist.name} </span>
                )
            } else {
                return (
                    <span className='header-artist'> {artist.name} </span>
                )
            }
        })
        return (
            <span className="track-artists">{artists}</span>
        )
    }

    enterFeatureSelectionMode() {
        this.props.enterFeatureSelectionMode(true)
    }

    submitQuery() {
        this.props.findSimilarTracks()
    }

    onButtonClick() {
        this.props.featureSelectionMode ? this.submitQuery() : this.enterFeatureSelectionMode()  
    }

    render() {
        let featureSelectionMode = this.props.featureSelectionMode
        if (Object.keys(this.props.track).length === 0 && this.props.track.constructor === Object) {
            return ('')
        }
        return ( 
            <div className='header'>
                <div className='header__text'>
                    <p className='header__track-title'>{this.props.track.name}</p>
                    {this.listArtists()}    
                </div>
                <button className='rel-track__btn'
                        onClick={this.onButtonClick}>
                        {featureSelectionMode ? 'Submit Query' : 'Find Similar Tracks'}
                        </button>            
            </div>
        )
    }
}

export default Header;
