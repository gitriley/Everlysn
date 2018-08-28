async function fetchRelatedTracks(queryString, token) {
    const url = `https://api.spotify.com/v1/recommendations?${queryString}`
    const resp = await fetch(url,{
        headers: new Headers({
            'Authorization': 'Bearer ' + token, 
        })
    })
    const relatedTracks = await resp.json()
    return relatedTracks
}

export default fetchRelatedTracks

