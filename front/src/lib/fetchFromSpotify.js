export async function fetchToken() {
    //const resp = await fetch('http://localhost:3005/token')
    let tokenObj
    try {
        const resp = await fetch('https://shielded-waters-65196.herokuapp.com/token')
        tokenObj = await resp.json()
    } catch(error) {
        console.log(error)
    }
    console.log(tokenObj)
    return tokenObj
}

export async function fetchSearchResults(searchTerms, token) {
    const url = `https://api.spotify.com/v1/search?q=${searchTerms}&type=track`

    const resp = await fetch(url,{
        headers: new Headers({
            'Authorization': 'Bearer ' + token, 
        })
    })

    const results = await resp.json()
    if (results.error) {
        console.log(results.error)
        return Error('error')
    } else {
        return results
    } 
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
    console.log('fetchTrackFeatures')
    console.log(JSON.stringify(trackFeatures))
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

    console.log('tracksWithFeatures')
    console.log(JSON.stringify(tracksWithFeatures))
    return tracksWithFeatures
}
