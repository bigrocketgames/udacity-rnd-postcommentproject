import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import '../App.css';
import Home from '../views/home';

class App extends Component {
  render() {
    return (
      <div>
        <div className="header text-center">
          <Link to='/' className="app-title"><h2>Cool Content Displayer</h2></Link>
        </div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/:category' component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;