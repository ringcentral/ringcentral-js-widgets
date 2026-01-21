export class DetectorListener {
  // unit: ms
  private _interval: number = 100;
  private _intervalId?: number;

  constructor(
    // manage the new intervalId for listener
    private readonly _startCallback = (intervalId: number) => {},
    // to get detector volume
    private readonly _listenHandle = () => {},
    // clear the intervalId of listener
    private readonly _disposeCallback = (intervalId: number) => {},
  ) {}

  /**
   * Listener start to handle detector volume by interval
   * @return ListenDisposer: Function
   */
  start() {
    if (!this._intervalId) {
      const intervalId = window.setInterval(() => {
        this._listenHandle();
      }, this._interval);
      this._startCallback(intervalId);
      this._intervalId = intervalId;
    }

    return () => {
      if (this._intervalId) {
        clearInterval(this._intervalId);
        this._disposeCallback(this._intervalId);
        delete this._intervalId;
      }
    };
  }

  /**
   * set interval for listener
   * @param interval: number, default 100 ms
   */
  public setInterval(interval: number): DetectorListener {
    this._interval = interval;
    return this;
  }
}
