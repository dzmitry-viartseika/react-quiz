import React, {Component} from "react";
import Layout from "./components/Layout/Layout";
import { Route, Switch } from 'react-router-dom';
import routes from './routes/routes'
import './assets/scss/style.scss';

export default class App extends Component {
  render() {

      return (
          <Layout>
              <Switch>
                  {Object.values(routes).map(route =>
                      <Route
                          exact={route.exact}
                          key={route.component}
                          path={route.url}
                          component={route.component}
                      /> )}
            </Switch>
          </Layout>
      );
  }
}

