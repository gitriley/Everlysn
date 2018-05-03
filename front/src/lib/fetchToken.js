async function fetchToken() {
    const resp = await fetch('http://localhost:3005/token')
    const tokenObj = await resp.json()
    return tokenObj.token
}

export default fetchToken