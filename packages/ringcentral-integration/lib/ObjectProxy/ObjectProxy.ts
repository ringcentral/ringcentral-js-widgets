export class ObjectProxy<Target extends object> {
  _chainSteps: Array<string | symbol> = [];

  constructor(private _target: Target, private _delegateTarget?: Target) {
    this._target = _target ?? {};
  }

  getValue(target: any) {
    let value = target;
    for (const step of this._chainSteps) {
      if (!value) break;
      value = value[step];
    }
    return value;
  }

  create() {
    let lastValue = this._target;
    return new Proxy(this._target, {
      get: (target, property, receiver) => {
        // Chaining
        this._chainSteps.push(property);
        const value =
          this.getValue(this._delegateTarget) ?? this.getValue(this._target);
        // Check value
        if (typeof value !== 'object' || value === null) {
          // Stop chaining
          this._chainSteps = [];
          return typeof value === 'function' ? value.bind(lastValue) : value;
        }
        // Keep on chaining
        lastValue = value;
        return receiver;
      },
      set: () => {
        throw new Error('Setting properties is not allowed');
      },
    });
  }
}
