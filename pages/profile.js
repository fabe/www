import React, { Component } from 'react';
import { Provider, observer } from 'mobx-react';
import { initStore } from '~/stores';
import config from '~/config';
import Error from '~/pages/_error';
import Page from '~/components/page';
import Profile from '~/components/profile';
import { fetchUser } from '~/endpoints';

export default class extends Component {
  static async getInitialProps({ req, query }) {
    const user = await fetchUser(query.id);
    const isServer = !!req;
    const store = initStore(isServer, user);
    return { isServer, user };
  }

  constructor(props) {
    super(props);
    this.store = initStore(props.isServer, props.user);
  }

  render() {
    const { user } = this.store.user;

    return (
      <Provider store={this.store}>
        <Page>
          {typeof user === 'number' ? <Error statusCode={user} /> : <Profile />}
        </Page>
      </Provider>
    );
  }
}
