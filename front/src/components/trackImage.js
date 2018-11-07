import React, { Component } from 'react';

function TrackImage(props) {
    if (Object.keys(props.track).length === 0 && props.track.constructor === Object) {
        return ('')
    }
    return (
        <div className='track__img__wrapper'>
            <img className='track__img' data-testid='track-image' src={props.track.album.images[1].url} />
        </div>
    )

}

export default TrackImage;
