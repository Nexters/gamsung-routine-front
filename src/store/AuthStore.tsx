import { observable, action } from 'mobx';

export default class AuthStore {
  @observable token: string | null = null;

  @action setToken(token: string) {
    this.token = token;
  }
}
