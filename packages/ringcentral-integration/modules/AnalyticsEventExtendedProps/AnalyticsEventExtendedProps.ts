import { IExtendedProps } from './AnalyticsEventExtendedProps.interface';

export class AnalyticsEventExtendedProps {
  private _EventExtendedPropsMap = new Map<string, IExtendedProps>();

  addEventsExtendedProps({
    events,
    extendedProps,
  }: {
    events: string[];
    extendedProps: IExtendedProps;
  }) {
    if (!events || !extendedProps) {
      console.error('[events or extendedProps] is required');
      return;
    }
    events.forEach((event) => {
      this.addEventExtendedProps({ event, extendedProps });
    });
  }

  addEventExtendedProps({
    event,
    extendedProps,
  }: {
    event: string;
    extendedProps: IExtendedProps;
  }) {
    if (!event || !extendedProps) {
      console.error('[event or extendedProps] is required');
      return;
    }
    const oldValue = this._EventExtendedPropsMap.get(event);
    this._EventExtendedPropsMap.set(event, { ...oldValue, ...extendedProps });
  }

  get extendedProps() {
    return this._EventExtendedPropsMap;
  }
}
