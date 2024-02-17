const CACHE_NAME = 'artifact-rng-cache';

const ASSETS = [
    "/",
    "/index.html",
    "/app.js",
    "./json/manifest.json",
    "./css/dialog.css",
    "./css/modalCustomStat.css",
    "./css/style.css",
    "./js/main.js",
    "./js/Stat.js",
    "./js/Artifact_Piece.js",
    "./js/Artifact_Simulator.js",
    "./js/Artifact.js",
    "./js/Attribute.js",
    "./js/CustomStat.js",
    "./js/customStatModel.js",
    "./js/Dialog.js",
    "./js/jquery-3.7.0.min.js",
    "./asset/Amber Icon.jpg",
    "./asset/Amber_Icon192.png",
    "./asset/Amber_Icon512.png",
    "https://i.pinimg.com/originals/dd/6a/53/dd6a53af112346d57377e9b4403bdc9e.jpg"
];

// install
self.addEventListener('install', event => {
    // Extend the lifetime of the event until all promises inside waitUntil resolve
    event.waitUntil((async () => {
        // Open a new cache storage with the specified CACHE_NAME
        const cache = await caches.open(CACHE_NAME);
        // Log a message indicating the opening of the cache
        console.log('Adding cache: ', ASSETS);
        // Add all specified ASSETS to the cache
        cache.addAll(ASSETS);
    })());
});

// activate
self.addEventListener("activate", event => {
    // Extend the lifetime of the event until all promises inside waitUntil resolve
    event.waitUntil(
        // Retrieve all cache storage keys
        caches.keys().then(cacheNames => {
            // Wait until all promises inside Promise.all resolve
            return Promise.all(
                // Map through each cache storage key
                cacheNames.map(name => {
                    // Check if the cache storage key matches the specified CACHE_NAME
                    if (name === CACHE_NAME) {
                        // If it matches, log a message indicating deletion of the old cache
                        console.log('Deleting old cache:', name);
                        // Delete the cache with the matching name
                        return caches.delete(name);
                    }
                })
            );
        })
    );
    // Immediately take control of clients
    self.clients.claim();
});

// fetch
self.addEventListener('fetch', event => {
    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);

        // get the resource from the cache
        const cachedResponse = await cache.match(event.request);
        console.log('Cached Response', cachedResponse);
        if (cachedResponse) {
            return cachedResponse;
        } else {
            try {
                // if the resource was not in the cache, try the network
                const fetchResponse = await fetch(event.request);

                // save the resource in the cache and return it
                cache.put(event.request, fetchResponse.clone());

                return fetchResponse;
            } catch (event) {
                // The network failed
                console.log('Network Failed');
            }
        }
    })());
});
