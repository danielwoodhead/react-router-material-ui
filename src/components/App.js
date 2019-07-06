import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Writers from './writers';
import { NotFound } from './errors';
import { ResponsiveDrawer } from './layout';

export default class extends Component {
  state = {
    writers: []
  };

  async componentDidMount() {
    const writers = await (await fetch('http://localhost:3004/writers?_embed=texts')).json();
    this.setState({ writers });
  }

  render() {
    const { writers } = this.state;

    return <BrowserRouter>
      <Fragment>
        <ResponsiveDrawer writers={writers}>
          <Switch>
            <Route exact path="/" render={() => <div>Home</div>}/>
            <Route path="/writers" render={
              props => <Writers {...props} writers={writers} />
            }/>
            <Route component={NotFound} />
          </Switch>
        </ResponsiveDrawer>
      </Fragment>
    </BrowserRouter>
  }
}