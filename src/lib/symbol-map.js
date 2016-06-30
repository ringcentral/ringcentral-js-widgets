import Enum from './enum';

export default class SymbolMap extends Enum {
  constructor(keys) {
    const definition = {};
    keys.forEach(key => {
      definition[key] = Symbol();
    });
    super(definition);
  }
}
