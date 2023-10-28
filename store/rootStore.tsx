import counter from "./list/counterStore";
import lang from "./list/langStore";

class RootStore {
  counter = counter;
  lang = lang;
}

export default RootStore;
