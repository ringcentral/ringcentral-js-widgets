/* eslint-disable @typescript-eslint/no-explicit-any */

export type DehydratedPortalOptions<
  Props extends Record<string, any>,
  PayLoad extends Record<string, any>,
> = {
  props?: (payload: PayLoad) => Props;
  payload?: () => Record<string, any>;
};

/**
 * dehydrated function to string with key value `Map<string, HandlerFunction>`
 * provide you a way to trigger event through different runtime instance, like multiple tabs.
 *
 * @example
 * // execute below in different runtime.
 * ```ts
 * type CustomData = {
 *   text: string;
 * }
 * type CustomDehydratedPortalOptions = DehydratedPortalOptions<{
 *   example: string;
 *   onClick: () => void;
 *   value?: string;
 * }, CustomData>
 *
 * const modalInstance = new DehydratedPortal<CustomDehydratedPortalOptions, CustomData>(
 *   {
 *     id: 'uniqueId'
 *     props: ({ text }) => ({
 *       example: `example ${text}`,
 *       onClick: () => {
 *         console.log('🧙 click');
 *       }
 *     })
 *   },
 *   {
 *     value: 'example'
 *   },
 * );
 *
 * modalInstance.open({
 * })
 * console.log(modalInstance.props);
 * // {
 * //    example: 'example',
 * //    onClick: 'onClick',
 * //    value: 'example', // default value will be add into props state
 * // }
 *
 * const modalSet = new Map<string, DehydratedPortal>();
 *
 * modalSet.set(id, modalInstance);
 * ```
 * // Then in another runtime can run the same unique id with event key name
 * ```ts
 * modalSet.get('uniqueId').handlerRegister['onClick'] // log => '🧙 click'
 * ```
 */
export class DehydratedPortal<
  Options extends DehydratedPortalOptions<any, Payload>,
  Payload extends Record<string, any> = Record<string, any>,
  Props = ReturnType<NonNullable<Options['props']>>,
> {
  /**
   * that unique type in whole dehydrated portal system, like `AppView.confirm`
   */
  type!: string;

  /**
   * for type getter only,
   */
  readonly payload!: Payload;
  /**
   * register method Map
   */
  get handlerRegister(): Map<string, (...args: any) => any> {
    return this._handlerRegister;
  }

  private _handlerRegister = new Map<string, (...args: any) => any>();

  constructor(
    public options: Options & DehydratedPortalOptions<any, Payload>,
    private defaultProps: Partial<Props> = {},
  ) {}

  /**
   * @private should not use that directly
   */
  getDehydrateState(id: string, payload: Payload) {
    const props = this.getProps(payload);

    const dehydratedState = this._dehydrateFunctions({
      ...props,
      id,
    });

    return dehydratedState;
  }

  /**
   * @private should not use that directly
   */
  getProps(payload: Payload): Props {
    const originalProps = this.options.props?.(payload) || {};

    // apply default props
    const processedProps = Object.entries(this.defaultProps).reduce(
      (acc, [key, value]) => {
        acc[key] = (originalProps as any)[key] ?? value;
        return acc;
      },
      {} as any,
    );

    return {
      ...originalProps,
      ...processedProps,
    };
  }

  /**
   * @private should not use that directly
   */
  getPureProps(payload: Payload) {
    const currentModalProps = this.getProps(payload);

    return Object.entries(currentModalProps as any).reduce(
      (acc, [key, value]) => {
        if (typeof value !== 'function') {
          (acc as any)[key] = value;
        }
        return acc;
      },
      {} as Props,
    );
  }

  /**
   * @private should not use that directly
   */
  private _dehydrateFunctions(props: any): Record<string, any> {
    const result = { ...props };

    for (const key in props) {
      if (
        Object.prototype.hasOwnProperty.call(props, key) &&
        typeof props[key] === 'function'
      ) {
        this.handlerRegister.set(key, props[key]);
        result[key] = key;
      }
    }

    return result;
  }
}
