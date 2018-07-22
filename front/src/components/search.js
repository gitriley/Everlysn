import React, { Component } from 'react';

class Search extends Component {

    constructor(props) {
        super(props);
        this.submitQuery = this.submitQuery.bind(this);
        this.selectTrack = this.selectTrack.bind(this);
    }
    
    state = {
        searchTerms: '',
        searchResults: [],
        searchResultsPresent: false
    }
    
    async submitQuery(e) {
        e.preventDefault();
        console.log(this.props)
        console.log(this.props.mode === 'search')
        if (!(this.props.mode === 'search')) {
            console.log('change app mode to search')
            this.props.setAppMode('search')
        }
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
                <div key={item.id} className="track-wrapper"
                    id={item.id}
                    onClick={this.selectTrack}>
                    <span>{item.name}</span>
                    <span className="track-artists">{artists}</span>
                </div>
            )
        })
        this.setState({
            searchResults: tracks,
            searchResultsPresent: true
        })
    }

    selectTrack = (e) => {
        e.preventDefault();
        this.props.setActiveTrack(e.currentTarget.getAttribute('id'))
    }    

    handleChange = (e) => {
        e.preventDefault();
        this.setState({searchTerms: e.target.value});
    }

    render() {
        const searchTerms = this.state.searchTerms;
        const searchResultsPresent = this.state.searchResultsPresent;
        return (
            <div className='search'>
                <div className={'search-wrapper ' +  (!searchResultsPresent && 'full')}>
                    <div>
                        <p className='search-prompt'>
                            Search for songs by albums name, song name, or artists
                        </p>
                        <form onSubmit={this.submitQuery} className='search-form'>
                            <input 
                                className='search-input'
                                type='text'
                                value={searchTerms} 
                                onChange={this.handleChange}/>
                            <button 
                                className='search-button'
                                type='submit'>
                                Search
                            </button>
                        </form>
                    </div>
                </div>
                {(this.props.mode === "search") ?
                    <div className="searchResults">
                        {this.state.searchResults}
                    </div>
                    : ""}
            </div>
        )
    }
}

export default Search;