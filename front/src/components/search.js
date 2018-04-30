import React, { Component } from 'react';

class Search extends Component {

    constructor(props) {
        super(props);
        this.submitQuery = this.submitQuery.bind(this);
    }
    
    state = {
        searchTerms: '',
        searchResults: []
    }
    async submitQuery(e) {
        console.log(this.props.token)
        const response = await fetch(`https://api.spotify.com/v1/search?q=${this.state.searchTerms}&type=track`, {
            headers: new Headers({
            'Authorization': 'Bearer ' + this.props.token, 
            })
        });
        const data = await response.json()
        console.log(data)
        let tracks = data.tracks.items.map((item) => {
            let artists = item.artists.map((artist, index) => {
                console.log(index);
                if (index > 0) {
                    console.log('should render dot before', artist.name)
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
                <div key={item.id} className="track-wrapper">
                    <span>{item.name}</span>
                    <span className="track-artists">{artists}</span>
                </div>
            )
        })
        this.setState({searchResults: tracks})
    }

    handleChange = (e) => {
        console.log(e.target.value)
        this.setState({searchTerms: e.target.value});
    }

    render() {
        console.log(this.props)
        const searchTerms = this.state.searchTerms;
        return (
            <div>
                <input 
                    type="text"
                    value={searchTerms} 
                    onChange={this.handleChange}/>
                <button 
                onClick={this.submitQuery}>Search</button>
                <div className="searchResults">
                    {this.state.searchResults}
                </div>
            </div>
        )
    }
}

export default Search;