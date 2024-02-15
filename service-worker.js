const CACHE_NAME = 'artifact-rng-cache';

const ASSETS = [
    "../",
    "../index.html",
    "../json/manifest.json",
    "../css/dialog.css",
    "../css/modalCustomStat.css",
    "../css/style.css",
    "./main.js",
    "./Stat.js",
    "./Artifact_Piece.js",
    "./Artifact_Simulator.js",
    "./Artifact.js",
    "./Attribute.js",
    "./CustomStat.js",
    "./customStatModel.js",
    "./Dialog.js",
    "./jquery-3.7.0.min.js",
    "../asset/Amber Icon.jpg",
    "../asset/Amber_Icon192.png",
    "../asset/Amber_Icon512.png",
    "https://i.pinimg.com/originals/dd/6a/53/dd6a53af112346d57377e9b4403bdc9e.jpg"
];

// install
self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        console.log('Adding cache: ', cache);
        cache.addAll(ASSETS);
    }));
});

// activate
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(name => name !== CACHE_NAME).map(name => {
                    console.log('Deleting old cache:', name);
                    return caches.delete(name);
                })
            );
        })
    );
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
