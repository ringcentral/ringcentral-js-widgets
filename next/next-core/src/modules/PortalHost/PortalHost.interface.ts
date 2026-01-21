export interface PortalHostOptions {
  enableCache?: boolean;
}

export type PortalHostResolveData = boolean | Record<string, any> | null;

export type PortalInstance = {
  id: string;
  /**
   * when the portal is closed, the promise will be resolved
   *
   * - `true` or `any object`: be user use action.confirm to close
   * - `false`: be user use action.cancel to close
   * - `null`: be user click outside or other auto close
   *
   * ### if you want use that closed event in worker mode, make sure that be use inside the worker thread(delegate('server')) to avoid the promise be miss by the tab close
   */
  closed: Promise<PortalHostResolveData>;
  close: () => void;
};
