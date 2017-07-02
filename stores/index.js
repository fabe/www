import User from './user';

let store = null;

export default class Store {
  constructor(isServer, user) {
    this.user = new User(user);
  }
}

export function initStore(isServer, user) {
  if (isServer && typeof window === 'undefined') {
    return new Store(isServer, user);
  } else {
    if (store === null) {
      store = new Store(isServer, user);
    }
    return store;
  }
}
