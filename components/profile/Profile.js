import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Head from 'next/head';
import s from './Profile.scss';

@inject('store')
@observer
class Profile extends Component {
  componentDidMount() {
    // When navigated on the client, fetch by action.
    if (!this.props.store.user.user) {
      this.props.store.user.fetchUser(this.props.id);
    }
  }

  render() {
    const { user } = this.props.store.user;

    return (
      <div>
        {user
          ? <h1>
              {user.name}
            </h1>
          : <div />}

        <style jsx>{s}</style>
      </div>
    );
  }
}

export default Profile;
