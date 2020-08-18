export class HeartBeat {
  private _heartBeat = {
    success: {
      key: `${this.prefix}_success`,
      intervalId: null,
    },
    working: {
      key: `${this.prefix}_working`,
      intervalId: null,
    },
  };

  get localStorage() {
    return window?.localStorage;
  }

  get isSuccessByLocal() {
    return this._getStatusByLocal(this._heartBeat.success.key);
  }

  get isWorkingByLocal() {
    return this._getStatusByLocal(this._heartBeat.working.key);
  }

  constructor(private prefix: string, private _heartBeatIntervalTime: number) {}

  heartBeatOnWorking() {
    if (typeof this._heartBeat.working === 'number') return;

    this._setLocalTime(this._heartBeat.working.key);

    this._heartBeat.working.intervalId = setInterval(() => {
      this._setLocalTime(this._heartBeat.working.key);
    }, this._heartBeatIntervalTime);
  }

  heartBeatOnSuccess() {
    if (typeof this._heartBeat.success === 'number') return;

    this._heartBeat.success.intervalId = setInterval(() => {
      this._setLocalTime(this._heartBeat.success.key);
    }, this._heartBeatIntervalTime);
  }

  destroy() {
    if (this._heartBeat.success.intervalId) {
      clearInterval(this._heartBeat.success.intervalId);
      this._heartBeat.success.intervalId = null;
    }

    if (this._heartBeat.working.intervalId) {
      clearInterval(this._heartBeat.working.intervalId);
      this._heartBeat.working.intervalId = null;
    }
  }

  private _setLocalTime(key: string) {
    this.localStorage.setItem(key, Date.now().toString());
  }

  private _getStatusByLocal(statusKey: string) {
    return (
      this.localStorage &&
      Date.now() - Number(this.localStorage.getItem(statusKey)) <
        this._heartBeatIntervalTime * 2 - 100
    );
  }
}
