export default function proxify(prototype, property, descriptor) {
  const {
    configurable,
    enumerable,
    value,
  } = descriptor;

  function proxyFn(...args) {
    if (!this._transport) {
      return this::value(...args);
    }
    const functionPath = `${this.modulePath}.${property}`;
    return this._transport.request({
      payload: {
        type: this._proxyActionTypes.execute,
        functionPath,
        args,
      },
    });
  }
  return {
    configurable,
    enumerable,
    value: proxyFn,
  };
}
