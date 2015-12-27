'use strict';

import React from 'react';
import Header from './common/header';
import {RouteHandler} from 'react-router';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header/>
        <div className="container-fluid">
          <RouteHandler/>
        </div>
      </div>
    );
  }

}

export default App;
