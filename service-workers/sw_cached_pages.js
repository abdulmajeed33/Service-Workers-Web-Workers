const cacheName = 'v2';


const assets = [
    '/',
    '/home.html',
    '/about.html',
    '/css/style.css',
    '/js/main.js'
];

self.addEventListener('install', event => {
//  Method 1: Cache all the assets in the install event 
//  prevent the browser from sending the initial request until the service worker is activated.
//  using the waitUntil method in the install event to delay the activation of the service worker until the caches are populated.

    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            console.log('Service Worker: Caching Files');
            cache.addAll(assets);
        })
    );
});


self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        if (cache !== cacheName) {
                            return caches.delete(cache);
                        }
                    })
                );
            }).then(() => {
                console.log('Service Worker: Activated');
                return self.clients.claim();  // Take control immediately
            })
            
            // Reload the page to update the cache
            // .then(() => {
            //     // Trigger a reload to re-fetch the page with the service worker
            //     self.clients.matchAll().then(clients => {
            //         clients.forEach(client => client.navigate(client.url));
            //     });
            // })

    );
})

self.addEventListener('fetch', event => {
    let mode = event.request.mode;
    let url = new URL(event.request.url);
    console.log('Service Worker: Fetching');

    
    if (mode === 'navigate' || (mode === 'no-cors' && url.origin === location.origin)) {
        event.respondWith(
            fetch(event.request)
            .then(response => {
                // if we don't cache in the in install event then this is the best way to cache the request one by one that are made by the user
                    const resClone = response.clone();
                    caches.open(cacheName)
                        .then(cache => {
                            cache.put(event.request, resClone);
                        });
                    return response;
                })
                .catch(error => {
                    caches.match(event.request)
                        .then(response => {
                            return response;
                        });
                })
        );
    }

    // Method 3: Change the response from a fetch request
    // else{
    //     let response = new Response(JSON.stringify({message: 'Techwards is up and running'}), {
    //         headers: {
    //             'content-type': 'application/json'
    //         }
    //     });
    //     event.respondWith(response);
    // }

});