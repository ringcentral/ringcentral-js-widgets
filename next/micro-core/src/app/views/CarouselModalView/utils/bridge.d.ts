export {};

declare global {
  interface Window {
    RC_AEM: {
      /**
       * by default we will listen global all `click` and `keydown(Enter, button also listen space key)` with `data-desktop-action` and `data-mobile-action` attribute,
       * if you not need that. set disabledGlobalActionListener at global before load bridge script.
       *
       * @example
       * ```html
       * <script>
       *   window.RC_AEM = {
       *     disabledGlobalActionListener: true
       *   }
       * </script>
       * <script
       *     defer
       *     src="http://localhost:8081/bridge.js"
       *     type="text/javascript"
       * ></script>
       * ```
       */
      disabledGlobalActionListener: boolean;
      /**
       * post event to parent window with `postMessage`
       * @param args the final arg be `event: Event`, if you pass the final event at the latest of params, that will do `event.preventDefault()` for you, if not pass that will not take effect.
       */
      post: (...args: unknown[]) => void;
    };
  }
}
