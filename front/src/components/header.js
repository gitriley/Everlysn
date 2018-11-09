import React, { Component } from 'react';
import LoadTrackInPlayer from '../containers/LoadTrackInPlayer'

class Header extends Component {

    constructor(props) {
        super(props);
    }


    listArtists() {
        if (!this.props.track.artists) {
            return
        }
        let artists = this.props.track.artists.map((artist, index) => {
            if (index > 0) {
                return (
                    <span key={artist.id} className='header-addition-artist' data-testid='main__track-artist'> • {artist.name} </span>
                )
            } else {
                return (
                    <span key={artist.id} className='header-artist' data-testid='main__track-artist'> {artist.name} </span>
                )
            }
        })
        return (
            <span className="track-artists">{artists}</span>
        )
    }



    render() {
        if (Object.keys(this.props.track).length === 0 && this.props.track.constructor === Object) {
            return ('')
        }
        return (
            <div className='header'>
                <div className='header__text'>
                    <p className='header__track-title' data-testid='main__track-title'>{this.props.track.name}</p>
                    {this.listArtists()}
                    <LoadTrackInPlayer 
                      trackId={this.props.track.id}  />
                </div>
            </div>
        )
    }
}

export default Header;
