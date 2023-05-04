class Pendo {
  static init(
    pendoApiKey: string,
    useLocalPendoJS: boolean,
    onLoadSuccess: (pendo: Pendo) => void,
  ) {
    if (!pendoApiKey) return;
    const pendoLibSource = useLocalPendoJS
      ? './pendo.xhr.js'
      : `https://cdn.pendo.io/agent/static/${pendoApiKey}/pendo.js`;
    const isCreated = document.querySelector(`script[src="${pendoLibSource}"]`);
    if (isCreated) return;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = pendoLibSource;
    script.async = true;
    script.onload = () => {
      if (useLocalPendoJS) {
        window.pendo.initialize({ apiKey: pendoApiKey });
      }
      console.log('pendo SDK is loaded!');
      if (typeof onLoadSuccess === 'function') {
        onLoadSuccess(window.pendo);
      }
    };
    script.onerror = () => {
      console.log('load pendo fail.');
    };
    document.head.appendChild(script);
  }
}

export { Pendo };
