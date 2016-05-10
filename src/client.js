import React, { Component } from 'react';
import { render } from 'react-dom';
import App from './app/components/App';
import { AppContainer } from 'react-hot-loader';

render((
  <AppContainer>
    <App />
  </AppContainer>
), document.getElementById('render-target'));

if (module.hot) {
  module.hot.accept('./app/components/App', () => {
    const App = require('./app/components/App').default;
    render((
      <AppContainer>
        <App />
      </AppContainer>
    ), document.getElementById('render-target'));
  });
}
