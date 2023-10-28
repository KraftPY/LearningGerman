import { makeAutoObservable } from "mobx";

type Lang = "ru" | "de" | "en";

class LangStore {
  lang: Lang = "ru";

  constructor() {
    makeAutoObservable(this);
  }

  setLang = (value: Lang) => {
    this.lang = value;
  };
}

const store = new LangStore();

export default store;
