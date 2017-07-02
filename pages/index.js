import React, { Component } from 'react';
import { Provider, observer } from 'mobx-react';
import { initStore } from '~/stores';
import Page from '~/components/page';

export default class extends Component {
  static getInitialProps({ req }) {
    const isServer = !!req;
    const store = initStore(isServer);
    return { isServer };
  }

  constructor(props) {
    super(props);
    this.store = initStore(props.isServer);
  }

  render() {
    return (
      <Provider store={this.store}>
        <Page>
          Hello, World!
        </Page>
      </Provider>
    );
  }
}
