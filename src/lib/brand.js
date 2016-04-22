
const ID = Symbol();
const NAME = Symbol();
const PREFIX = Symbol();

export default class Brand {
  constructor({
    id,
    name,
    prefix
  }) {
    this[ID] = id;
    this[NAME] = name;
    this[PREFIX] = prefix;
  }

  get id() {
    return this[ID];
  }
  get name() {
    return this[NAME];
  }
  get prefix() {
    return this[PREFIX]
  }
}
