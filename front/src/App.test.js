import * as Spotify from './lib/fetchFromSpotify.js'

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import renderer from 'react-test-renderer';
import { render, cleanup, fireEvent } from 'react-testing-library'

afterEach(cleanup);

jest.mock('./lib/fetchFromSpotify', ()=>({
  fetchToken: jest.fn(()=> {
    console.log('ran the mock');
    return {
      token: 777,
      token_age_minutes: 1
    }
  })
}));

it('renders without crashing', async () => {
  spyOn(App.prototype, 'updateToken');
  const div = document.createElement('div');
  await ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


test('<App /> calls updateToken() upon initialization', () => {
  spyOn(App.prototype, 'updateToken').and.callThrough();
  const wrapper = render(<App/>);
  expect(Spotify.fetchToken).toHaveBeenCalledTimes(1);
  
});

test('updateToken gets and stores API token info', () => {
  expect(1).toEqual(1);
});


