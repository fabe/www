import React, { Component } from 'react';
import Head from 'next/head';
import { Provider, observer } from 'mobx-react';
import { initStore } from '~/stores';
import config from '~/config';
import Page from '~/components/page';

export default class Error extends Component {
  static getInitialProps({ req, res, jsonPageRes }) {
    const statusCode = res
      ? res.statusCode
      : jsonPageRes ? jsonPageRes.status : null;
    const isServer = !!req;
    const store = initStore(isServer);
    return { statusCode, isServer };
  }

  constructor(props) {
    super(props);
    this.store = initStore(props.isServer);
  }

  renderErrorMessage(statusCode) {
    switch (statusCode) {
      case 404:
        return <p>The page you requested wasn't found!</p>;
        break;
      default:
        return (
          <p>There was an error processing your request. Try reloading!</p>
        );
        break;
    }
  }

  render() {
    const { statusCode } = this.props;

    return (
      <Provider store={this.store}>
        <Page>
          <Head>
            <title>
              {config.app.name} — {statusCode}
            </title>
          </Head>

          {statusCode
            ? <h1>
                {statusCode}
              </h1>
            : <h1>Oh no!</h1>}
          {this.renderErrorMessage(statusCode)}
        </Page>
      </Provider>
    );
  }
}
