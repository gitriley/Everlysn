import * as Spotify from './lib/fetchFromSpotify.js'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import mockSearchResults from '../test_data/searchResults'
//import renderer from 'react-test-renderer';
import { render, cleanup, fireEvent } from 'react-testing-library'

afterEach(() => {
  cleanup()
  Spotify.fetchToken.mockClear()
})

jest.mock('./lib/fetchFromSpotify', ()=>({
  fetchToken: jest.fn(()=> {
    return {
      token: 777,
      token_age_minutes: 1
    }
  }),
  fetchSearchResults: jest.fn((a, b)=> {
    console.log('ran the fetchSearchResults mock', a, b)
    return mockSearchResults
  })
}))


const flushPromises = () => {
  return new Promise(resolve => setImmediate(resolve))
}



it('renders without crashing', async () => {
  spyOn(App.prototype, 'updateToken')
  const div = document.createElement('div')
  await ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})


test('<App /> calls updateToken() upon initialization', () => {
  spyOn(App.prototype, 'updateToken').and.callThrough()
  const wrapper = render(<App/>)
  expect(Spotify.fetchToken).toHaveBeenCalledTimes(1)
  
})

test('submitting a search term results in search results being rendered', async () => {
  const wrapper = render(<App/>)
  await fireEvent.change(wrapper.container.getElementsByClassName('search-input')[0], {
    target: {value: 'saba'},
  })
  fireEvent.click(wrapper.container.getElementsByClassName('search-button-icon')[0])
  await flushPromises()
  expect(Spotify.fetchSearchResults).toHaveBeenCalledTimes(1)
  expect(Spotify.fetchSearchResults).toHaveBeenCalledWith('saba', 777)
  expect(wrapper.container.getElementsByClassName('track-wrapper').length).toEqual(20)

  // make sure each search result was actually rendered with the correct text
  mockSearchResults.tracks.items.forEach((track) => {
    const element = wrapper.getByText(track.name)
    expect(element).toBeTruthy()

    // basically a tautology, but just double checking
    expect(element.innerHTML).toBe(track.name)
  });


});



