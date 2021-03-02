class Pendo {
  static init(pendoApiKey, onLoadSuccess) {
    if (!pendoApiKey) return;
    const pendoLibSource = `https://cdn.pendo.io/agent/static/${pendoApiKey}/pendo.js`;
    const isCreated = document.querySelector(`script[src="${pendoLibSource}"]`);
    if (isCreated) return;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = pendoLibSource;
    script.async = true;
    script.onload = () => {
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
