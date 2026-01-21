import {
  action,
  delegate,
  injectable,
  logger,
  optional,
  portal,
  RcViewModule,
  state,
  useConnector,
} from '@ringcentral-integration/next-core';
import React from 'react';
import { filter, map, Subject } from 'rxjs';

import { ModalRef, ModalView, useModalItemView } from '../ModalView';

import type { CarouselModalViewOptions } from './CarouselModal.view.interface';
import {
  CarouselModalPanel,
  CarouselModalPanelProps,
  CarouselModalPayload,
} from './CarouselModalPanel';
import type { CarouselModalMessage } from './utils';
import { TUTORIAL_ACTION_KEY } from './utils';

const modalClasses = {
  root: 'carouselModal-dialog-root',
  paper: 'carouselModal-dialog-paper',
};

type CarouselEmitAction = {
  /**
   * current active index of carousel
   */
  index: number;
  data: unknown[];
  origin: string;
};

const omitDataType = map<CarouselEmitAction, CarouselEmitAction>(
  ({ data: [_, ...data], ...rest }) => ({
    ...rest,
    data,
  }),
);

@injectable({
  name: 'CarouselModalView',
})
export class CarouselModalView extends RcViewModule implements ModalRef {
  opened = false;

  @state
  activeIndex = 0;

  @action
  _setActiveIndex(val: number) {
    this.activeIndex = val;
  }

  @state
  invisible = false;

  @action
  setInvisible(val: boolean) {
    this.invisible = val;
  }

  @delegate('server')
  async setActiveIndex(val: number) {
    this._setActiveIndex(val);
  }

  /**
   * emit when iframe inner emit value
   */
  action$ = new Subject<CarouselEmitAction>();

  /**
   * emit desktop action
   */
  desktopAction$ = this.action$.pipe(
    filter(({ data }) => data[0] === 'desktop'),
    omitDataType,
  );

  /**
   * emit mobile action
   */
  mobileAction$ = this.action$.pipe(
    filter(({ data }) => data[0] === 'mobile'),
    omitDataType,
  );

  /**
   * container getter, if need custom container, set that field
   *
   * @default get '#root' element and return clientHeight and clientWidth
   * @param contentDocument
   * @returns {width: number, height: number}
   */
  getContainerSize: CarouselModalPanelProps['getContainerSize'] = (
    contentDocument,
  ) => {
    const root =
      this._carouselModalViewOptions?.defaultSelector(contentDocument) ||
      contentDocument?.querySelector('#root');

    if (!root) return;

    const clientHeight = root.clientHeight;
    const clientWidth = root.clientWidth;

    if (clientHeight && clientWidth) {
      return {
        width: clientWidth,
        height: clientHeight,
      };
    }
  };

  constructor(
    private _modalView: ModalView,
    @optional('CarouselModalViewOptions')
    private _carouselModalViewOptions?: CarouselModalViewOptions,
  ) {
    super();

    global.window?.addEventListener('message', (event) => {
      try {
        const source: CarouselModalMessage = JSON.parse(event.data);

        if (source.type !== TUTORIAL_ACTION_KEY) return;

        this.action$.next({
          index: this.activeIndex,
          origin: event.origin,
          data: source.data,
        });
      } catch (error) {
        // ignore
      }
    });
  }

  header = null;
  footer = null;

  @portal
  private modal = this._modalView.create({
    view: this,
    props: () => ({
      disableBackdropClick: false,
      classes: modalClasses,
      /**
       * disable enforce focus, otherwise user can't click outside element
       */
      disableEnforceFocus: true,
      onExited: () => {
        this.setActiveIndex(0);

        if (this.invisible) {
          this.setInvisible(false);
        }
      },
    }),
  });

  /**
   * open modal with iframe like tutorial
   *
   * @example
   * ```ts
      const { closed } = this._carouselModalView.open({
        data: [
          {
            url: '/assets/Card details - Download meeting materials.html',
          },
          {
            url: '/assets/Card details - Stress-free webinars.html',
            size: {
              // when you set size here, that will be force size without auto calculate iframe page element
              width: 100,
              height: 200
            }
          },
        ],
        // default show index, default is zero
        initIndex: 0,
        showLoading: true,
      });

      closed.then((e) => {
        console.log('tutorial closed', e);
      });
    ```
   */
  open({ initIndex, ...payload }: CarouselModalPayload) {
    const toIndex = initIndex ?? 0;
    if (this.activeIndex !== toIndex) this.setActiveIndex(toIndex);

    const { id, closed } = this._modalView.open(this.modal, payload);

    this.opened = true;

    return {
      id,
      closed: closed.then(() => {
        this.opened = false;

        return this.activeIndex;
      }),
    };
  }

  close() {
    return this._modalView.close(this.modal);
  }

  /**
   * open modal that be invisible, to got better user experience
   *
   * can use `setInvisible(true)` or `setInvisible(false)` method to toggle that render visible
   */
  invisibleOpen(payload: CarouselModalPayload) {
    const result = this.open(payload);
    this.setInvisible(true);

    return result;
  }

  /**
   * when that be opened and is invisible mode, show that.
   */
  showInvisibleView() {
    if (this.opened && this.invisible) {
      this.setInvisible(false);
    }
  }

  /**
   * when that be opened and is invisible mode, hide that.
   */
  hideInvisibleView() {
    if (this.opened && !this.invisible) {
      this.setInvisible(true);
    }
  }

  component() {
    const { action } = useModalItemView();
    const props = useConnector(() => ({
      activeIndex: this.activeIndex,
      invisible: this.invisible,
    }));

    return (
      <CarouselModalPanel
        {...props}
        setActiveIndex={this.setActiveIndex.bind(this)}
        getContainerSize={this.getContainerSize}
        onLoadFail={(e) => {
          logger.error(
            '[CarouselModalView] iframe load fail',
            (e.target as HTMLIFrameElement).src,
          );

          action!.close();
        }}
      />
    );
  }
}
