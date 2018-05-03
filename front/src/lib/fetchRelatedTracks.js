async function fetchRelatedTracks(queryString, token) {
    const url = `https://api.spotify.com/v1/recommendations?${queryString}`
    const resp = await fetch(url,{
        headers: new Headers({
            'Authorization': 'Bearer ' + token, 
        })
    })
    const relatedTracks = await resp.json()
    console.log(relatedTracks);
    return relatedTracks
}

export default fetchRelatedTracks



  // "https://api.spotify.com/v1/recommendations?
  // seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_tracks=0c6xIDDpzE81m2q797ordA
  // &min_energy=0.4&min_popularity=50&market=US"
