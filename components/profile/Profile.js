import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import s from './Profile.css';

@inject('store')
@observer
class Profile extends Component {
  componentDidMount() {
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
