const RUNTIME: Record<
  string,
  {
    lastPromise: Promise<any> | null;
  }
> = {};

export const fetchWithJsonp = <T>(url: string, key: string) => {
  if (!RUNTIME[key]) {
    RUNTIME[key] = {
      lastPromise: null,
    };
  }
  const runtime = RUNTIME[key];
  const lastPromise = runtime?.lastPromise;
  const promise = (async () => {
    try {
      // if there is already ongoing request, wait for it to be done
      // before replacing the window.[key] function
      await lastPromise;
    } catch (error: any /** TODO: confirm with instanceof */) {
      // ignore last error
    }
    return new Promise<T>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onerror = () => {
        document.body.removeChild(script);
        (window as any)[key] = null;
        if (runtime.lastPromise === promise) {
          runtime.lastPromise = null;
        }
        reject(new Error(`'${url}' jsonp fetch failed`));
      };
      (window as any)[key] = (data: T) => {
        document.body.removeChild(script);
        (window as any)[key] = null;
        if (runtime.lastPromise === promise) {
          runtime.lastPromise = null;
        }
        resolve(data);
      };
      document.body.appendChild(script);
    });
  })();
  runtime.lastPromise = promise;
  return promise;
};
