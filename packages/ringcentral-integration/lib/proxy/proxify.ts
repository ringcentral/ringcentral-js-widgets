export function proxify(
  prototype: object,
  property: string,
  descriptor: TypedPropertyDescriptor<(...args: any) => Promise<any>>,
) {
  const { configurable, enumerable, value } = descriptor;

  function proxyFn(
    // TODO: fix type
    this: {
      _transport: any;
      modulePath: string;
      _proxyActionTypes: Record<string, string>;
    },
    ...args: any
  ) {
    if (!this._transport) {
      return value.call(this, ...args);
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

export default proxify;
