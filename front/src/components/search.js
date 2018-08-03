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
                    <div className='search-inner'>
                        <p className={'search-prompt ' + (searchResultsPresent && 'bar')}>
                            Search for songs by albums name, song name, or artists
                        </p>
                        <form onSubmit={this.submitQuery} className='search-form'>
                            <input 
                                className='search-input'
                                type='text'
                                value={searchTerms} 
                                onChange={this.handleChange}/>
                            <button className='search-button-icon' type='submit'>
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 451 451" width="20px" height="20px">
                                    <g>
                                        <path d="M447.05,428l-109.6-109.6c29.4-33.8,47.2-77.9,47.2-126.1C384.65,86.2,298.35,0,192.35,0C86.25,0,0.05,86.3,0.05,192.3   s86.3,192.3,192.3,192.3c48.2,0,92.3-17.8,126.1-47.2L428.05,447c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4   C452.25,441.8,452.25,433.2,447.05,428z M26.95,192.3c0-91.2,74.2-165.3,165.3-165.3c91.2,0,165.3,74.2,165.3,165.3   s-74.1,165.4-165.3,165.4C101.15,357.7,26.95,283.5,26.95,192.3z"/>
                                    </g>
                                </svg>
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