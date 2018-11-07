import React, { Component } from 'react';

function TrackContent(props) {



    const listArtists = () => {
        if (!props.track.artists) {
            return
        }
        let artists = props.track.artists.map((artist, index) => {
            if (index > 0) {
                return (
                    <span> • {artist.name} </span>
                )
            } else {
                return (
                    <span> {artist.name} </span>
                )
            }
        })
        return (
            <span className="track-artists">{artists}</span>
        )
    }



    if (Object.keys(props.track).length === 0 && props.track.constructor === Object) {
        return ('')
    }
    return (
        <div className='track__img__wrapper'>
            <img className='track__img' src={props.track.album.images[1].url} />
        </div>
    )

}

export default TrackContent;
