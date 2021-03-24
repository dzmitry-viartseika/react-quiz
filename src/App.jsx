import React, {Component} from "react";
import Layout from "./components/Layout/Layout";
import Quiz from "./components/Quiz/Quiz";
import './assets/scss/style.scss';

export default class App extends Component {
  render() {

      return (
          <Layout>
              <Quiz />
          </Layout>
      );
  }
}

