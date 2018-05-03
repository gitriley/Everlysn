async function fetchTrack(trackId, token) {
    const url = `https://api.spotify.com/v1/tracks/${trackId}`

    const resp = await fetch(url,{
        headers: new Headers({
            'Authorization': 'Bearer ' + token, 
        })
    })
    const trackData = await resp.json()
    return trackData;
}

export default fetchTrack