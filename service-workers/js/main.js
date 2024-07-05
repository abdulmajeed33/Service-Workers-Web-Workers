// Make sure service worker are supported
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('../sw_cached_pages.js')
      .then(reg => console.log('Service Worker: Registered'))
      .catch(err => console.log(`Service Worker: Error: ${err}`));
  });
}

// call api with fetch
fetch('https://adbac3b0fa4f4e0aa942222dda367508.api.mockbin.io/')
  .then(response => response.json())
  .then(data => console.log(data));
