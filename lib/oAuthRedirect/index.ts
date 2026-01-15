import type { CombinedAuthState } from '../../modules/OAuth';

export function parseCombinedState(authState: string) {
  const [state] = authState.split('-'); // first part of auth state
  try {
    const json = window.atob(state);
    const combinedState: CombinedAuthState | null = JSON.parse(json);
    // validate the combined state
    if (typeof combinedState?.now === 'number') {
      console.log('[CombinedState] parsed');
      return combinedState;
    }
  } catch (ex) {
    console.log('[CombinedState]', ex);
  }
}

(() => {
  const callbackUri = location.href;
  const urlSearchParams = new URLSearchParams(callbackUri);
  const state = urlSearchParams.get('state') || '';
  const combinedState = parseCombinedState(state);

  /* Solution: call hook */
  try {
    if (window.opener?.oAuthCallback) {
      window.opener.oAuthCallback(callbackUri);
      console.log('[CallHook] success');
      window.close();
      return;
    }
  } catch (ex) {
    console.log('[CallHook]', ex);
  }

  /* Solution: postMessage */
  const postMessageToOpener = () => {
    try {
      if (window.opener?.postMessage && combinedState?.origin) {
        window.opener.postMessage({ callbackUri }, combinedState.origin);
        console.log('[PostMessage] success');
        window.close();
        return;
      }
    } catch (ex) {
      console.log('[PostMessage]', ex);
    }
  };

  /* Solution: localStorage */
  let storageSentTimeout = false;
  let timeoutId: NodeJS.Timeout | undefined = undefined;
  // Listen to storage event to detect if the storage is removed/handled
  const hash = state.split('-').slice(1).join('-');
  const key = `${hash}-callbackUri`;
  window.addEventListener('storage', (event) => {
    if (event.key !== key) return;
    const isRemoved = !event.newValue; // is removed by opener or by timeout
    if (isRemoved && !storageSentTimeout) {
      console.log('[LocalStorage] success');
      // Notify parent window to close window.
      if (window.parent) {
        window.parent.postMessage('authenticated', '*');
      }
      clearTimeout(timeoutId);
      window.close();
    }
  });
  // If opener can't handle the storage, remove the storage and try to post message to opener
  timeoutId = setTimeout(() => {
    console.log('[LocalStorage] timeout');
    storageSentTimeout = true;
    localStorage.removeItem(key);
    postMessageToOpener();
  }, 1000);
  // Set storage value
  localStorage.setItem(key, callbackUri);
})();
