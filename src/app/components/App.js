import React, { Component } from 'react';
import { connectStream } from '../../connection';

class App extends Component {
  constructor() {
    super();
    this.state = { events: [] };
    connectStream.subscribe(event => {
      const events = this.state.events.concat(event);
      this.setState({ events });
    });
  }

  render() {
    return (
      <div style={appStyle}>
        Events:
        <pre>
          test2
        </pre>
      </div>
    );
  }

}

const appStyle = {
  display: 'flex',
  background: 'yellow',
};
export default App;
