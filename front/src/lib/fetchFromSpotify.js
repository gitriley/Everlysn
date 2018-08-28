export async function fetchToken() {
    //const resp = await fetch('http://localhost:3005/token')
    const resp = await fetch('https://shielded-waters-65196.herokuapp.com/token')
    const tokenObj = await resp.json()
    return tokenObj
}

export async function fetchTrack(trackId, token) {
    const url = `https://api.spotify.com/v1/tracks/${trackId}`

    const resp = await fetch(url,{
        headers: new Headers({
            'Authorization': 'Bearer ' + token, 
        })
    })
    const trackData = await resp.json()
    if (trackData.error) {
        return Error('error')
    } else {
        return trackData
    }
    

}

export async function fetchTrackFeatures(trackId, token) {
    const url = `https://api.spotify.com/v1/audio-features/${trackId}`
    const resp = await fetch(url,{
        headers: new Headers({
            'Authorization': 'Bearer ' + token, 
        })
    })
    const trackFeatures = await resp.json()
    return trackFeatures
}

export async function fetchRelatedTracks(queryString, token) {
    const url = `https://api.spotify.com/v1/recommendations?${queryString}`
    const resp = await fetch(url,{
        headers: new Headers({
            'Authorization': 'Bearer ' + token, 
        })
    })
    const relatedTracks = await resp.json()
    // extract ids
    const ids = relatedTracks.tracks.map((track) => {
        return track.id
    })
    const idsString = ids.join()

    // get features for all tracks
    const tracksFeaturesUrl = `https://api.spotify.com/v1/audio-features/?ids=${idsString}`
    const resp2 = await fetch(tracksFeaturesUrl, {
        headers: new Headers({
            'Authorization': 'Bearer ' + token, 
        })
    })
    const features = await resp2.json()
    let tracksWithFeatures = relatedTracks.tracks.map((track, index) => {
        const newObj = Object.assign({}, track)

        // make sure we're assigning features to the correct tracks
        if (newObj.id === features.audio_features[index].id) {
            newObj.features = features.audio_features[index]
        }
        return newObj
    })
    return tracksWithFeatures
}
