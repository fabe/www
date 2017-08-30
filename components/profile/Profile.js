import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Head from 'next/head';
import s from './Profile.css';

class Profile extends Component {
  componentDidMount() {
    console.log(this.props);
    // When navigated on the client, fetch by action.
    if (!this.props.user.user) {
      this.props.user.fetchUser(this.props.id);
    }
  }

  render() {
    const { user } = this.props.user;

    return user
      ? <h1 className={s.heading}>
          {user.name}
        </h1>
      : <div />;
  }
}

export default Profile;
