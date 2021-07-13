import { observable, action, makeObservable } from 'mobx';

export default class AuthStore {
  constructor() {
    makeObservable(this, {
      token: observable,
      login: action,
    });
  }

  token: string | null = null;

  login = (token: string) => {
    this.token = token;
  };
}
