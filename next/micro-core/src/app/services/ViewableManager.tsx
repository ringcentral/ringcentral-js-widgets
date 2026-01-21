import {
  delegate,
  PortManager,
  RcModule,
  takeUntilAppDestroy,
} from '@ringcentral-integration/next-core';
import {
  createRepeatTrackingManager,
  CreateRepeatTrackingManagerOptions,
  type RepeatTrackingItems,
} from '@ringcentral-integration/utils';
import { useEffect } from 'react';

interface ViewableManagerOptions<T extends Record<any, any>> {
  /**
   * The options for the viewable manager.
   */
  viewableManagerOptions: Omit<
    CreateRepeatTrackingManagerOptions<T>,
    'sendToServer'
  >;
  /**
   * The callback function to be called when the items are viewed.
   */
  onViewable?: Parameters<
    ReturnType<typeof createRepeatTrackingManager<T>>['fromServerListener']
  >[0];
}

/**
 * A base class for viewable manager.
 *
 * that you can easily to know what items still on the screen in the worker thread.
 */
export abstract class ViewableManager<T extends Record<any, any>> {
  protected viewableManager = createRepeatTrackingManager<T>({
    ...this._options.viewableManagerOptions,
    sendToServer: (data) => this.emit(this._portManager?.clientId!, data),
  });

  @delegate('server')
  private async emit(clientId: string, data: RepeatTrackingItems[]) {
    this.viewableManager?.setListenerDataFromClient(clientId, data);
  }

  constructor(
    protected _portManager: PortManager,
    protected _options: ViewableManagerOptions<T>,
  ) {
    this.setupViewableManager();
  }

  useItemRender = (conversation: T, _: number) => {
    useEffect(() => {
      this.viewableManager.link(conversation);
      return () => {
        this.viewableManager.unlink(conversation);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  };

  private async setupViewableManager() {
    const onViewable = this._options.onViewable;
    if (!onViewable) return;

    const subscribeToClientListener = () => {
      this.viewableManager
        .fromClientListener()
        .pipe(takeUntilAppDestroy)
        .subscribe();
    };

    const subscribeToServerListener = () => {
      this.viewableManager
        .fromServerListener((distinctMap) => onViewable(distinctMap))
        .pipe(takeUntilAppDestroy)
        .subscribe();
    };

    if (this._portManager.shared) {
      this._portManager.onClient(() => {
        subscribeToClientListener();
      });

      this._portManager.onServer(() => {
        subscribeToServerListener();
      });
    } else {
      subscribeToClientListener();
      subscribeToServerListener();
    }
  }
}
