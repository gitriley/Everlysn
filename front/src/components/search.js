import React, { Component } from 'react';
import SearchSVG from './icons/searchSVG';
import * as Spotify from '../lib/fetchFromSpotify.js'

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
        if (!(this.props.mode === 'search')) {
            this.props.setAppMode('search')
        }
        

        console.log('this.state.searchTerms: ', this.state.searchTerms);

        console.log('this.props.token: ', this.props.token);

        const data = await Spotify.fetchSearchResults(this.state.searchTerms, this.props.token)

        console.log('this.state.searchTerms: ', this.state.searchTerms);

        console.log('this.props.token: ', this.props.token);
        //console.log(JSON.stringify(data))
        let tracks = data.tracks.items.map((item) => {
            let artists = item.artists.map((artist, index) => {
                if (index > 0) {
                    return (
                        <span key={artist.id}> • {artist.name} </span>
                    )
                } else {
                    return (
                        <span key={artist.id}> {artist.name} </span>
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

    handleChange (e) {
        console.log('handle change', e.target.value)
        e.preventDefault();
        this.setState({searchTerms: e.target.value});
    }

    render() {
        console.log('search renders')
        const searchTerms = this.state.searchTerms;
        const searchResultsPresent = this.state.searchResultsPresent;
        return (
            <div className='search'>
                <div className={'search-wrapper ' +  (!searchResultsPresent && 'full')}>
                    <div className='search-inner'>
                        <p className={'search-prompt ' + (searchResultsPresent && 'bar')}>
                            Search for songs by album name, song name, or artist
                        </p>
                        <form onSubmit={this.submitQuery} className='search-form'>
                            <input 
                                className='search-input'
                                type='text'
                                value={searchTerms} 
                                onChange={this.handleChange}/>
                            <button className='search-button-icon' type='submit'>
                                <SearchSVG/>
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