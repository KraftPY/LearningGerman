import { makeAutoObservable } from "mobx";

class CounterStore {
  counter: number = 11;

  constructor() {
    makeAutoObservable(this);
  }

  inc = (value: number) => {
    this.counter += value;
  };

  dec = (value: number) => {
    this.counter -= value;
  };
}

const store = new CounterStore();

export default store;
