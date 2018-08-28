async function fetchTrackFeatures(trackId, token) {
    const url = `https://api.spotify.com/v1/audio-features/${trackId}`
    const resp = await fetch(url,{
        headers: new Headers({
            'Authorization': 'Bearer ' + token, 
        })
    })
    const trackFeatures = await resp.json()
    return trackFeatures
}

export default fetchTrackFeatures