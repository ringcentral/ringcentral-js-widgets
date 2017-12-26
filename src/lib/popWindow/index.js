
export default function popWindow(url, id, w, h) {
  // Fixes dual-screen position                         Most browsers      Firefox
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screen.left;
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screen.top;

  const width = window.screen.width || window.outerWidth;
  const height = window.screen.height || window.innerHeight;

  const left = ((width / 2) - (w / 2)) + dualScreenLeft;
  const top = ((height / 2) - (h / 2)) + dualScreenTop;
  const newWindow = window.open(
    url,
    id,
    `scrollbars=yes, width=${w}, height=${h}, top=${top}, left=${left}`,
  );

  // Puts focus on the newWindow
  if (newWindow.focus) {
    try {
      newWindow.focus();
    } catch (e) {
      /* falls through */
    }
  }
  return newWindow;
}
