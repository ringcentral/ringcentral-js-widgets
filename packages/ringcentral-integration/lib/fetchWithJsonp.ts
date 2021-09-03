const callback = '__rc_config_data_callback__';

export const fetchWithJsonp = <T>(url: string) => {
  return new Promise<T>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onerror = () => {
      reject(new Error(`'${url}' jsonp fetch failed`));
      document.body.removeChild(script);
    };
    // TODO: add type
    (window as any)[callback] = (data: T) => {
      resolve(data);
      document.body.removeChild(script);
    };
    document.body.appendChild(script);
  });
};
