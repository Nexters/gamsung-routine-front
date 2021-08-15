import { action, makeObservable, observable } from 'mobx';

class IndicatorStore {
  // XXX : _ prefix를 계속 사용할지 고민
  private static _instance: IndicatorStore;
  count = 0;

  constructor() {
    makeObservable(this, { count: observable, up: action, down: action });
  }

  up() {
    this.count += 1;
  }
  down() {
    this.count -= 1;
  }

  public static instance() {
    if (!this._instance) {
      this._instance = new IndicatorStore();
    }
    return this._instance;
  }
}

export default IndicatorStore.instance();
