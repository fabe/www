import { action, observable, extendObservable } from 'mobx';
import Router from 'next/router';
import { autobind } from 'core-decorators';
import { fetchUser } from '~/endpoints';

export default class User {
  @observable user = {};

  constructor(user) {
    this.user = user;
  }

  @action fetchUser = id => fetchUser(id).then(data => this.user = data);
}
