document.addEventListener('DOMContentLoaded', (event) => {
  // we can move only if we are not in a browser's tab
  const isBrowser = matchMedia('(display-mode: browser)').matches;

  // Resize if a standalone app
  if (!isBrowser) {
    window.resizeTo(540, 720);
  }
});
