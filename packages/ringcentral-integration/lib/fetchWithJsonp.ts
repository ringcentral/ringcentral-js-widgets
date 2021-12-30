const callback = '__rc_config_data_callback__';

const RUNTIME: {
  lastPromise: Promise<any>;
} = {
  lastPromise: null,
};

export const fetchWithJsonp = <T>(url: string) => {
  const lastPromise = RUNTIME.lastPromise;
  const promise = (async () => {
    try {
      // if there is already ongoing request, wait for it to be done
      // before replacing the window.__rc_config_data_callback__ function
      await lastPromise;
    } catch (error) {
      // ignore last error
    }
    return new Promise<T>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onerror = () => {
        document.body.removeChild(script);
        (window as any)[callback] = null;
        if (RUNTIME.lastPromise === promise) {
          RUNTIME.lastPromise = null;
        }
        reject(new Error(`'${url}' jsonp fetch failed`));
      };
      // TODO: add type
      (window as any)[callback] = (data: T) => {
        document.body.removeChild(script);
        (window as any)[callback] = null;
        if (RUNTIME.lastPromise === promise) {
          RUNTIME.lastPromise = null;
        }
        resolve(data);
      };
      document.body.appendChild(script);
    });
  })();
  RUNTIME.lastPromise = promise;
  return promise;
};
