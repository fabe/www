import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Head from 'next/head';
import s from './Profile.css';

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

    return user
      ? <h1 className={s.heading}>
          {user.name}
        </h1>
      : <div />;
  }
}

export default Profile;
