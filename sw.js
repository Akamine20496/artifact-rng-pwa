const cacheNaming = 'artifact-rng-cache';
const CACHE_NAME = 'artifact-rng-cache-v5.3.3';

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
    "./jquery/jquery-3.7.0.min.js",
    "./asset/Amber Icon.jpg",
    "./asset/Amber_Icon192.png",
    "./asset/Amber_Icon512.png",
    "https://i.pinimg.com/originals/dd/6a/53/dd6a53af112346d57377e9b4403bdc9e.jpg"
];

// install
self.addEventListener('install', (event) => {
    // Extend the lifetime of the event until all promises inside waitUntil resolve
    event.waitUntil(
        (async () => {
            // Open a new cache storage with the specified CACHE_NAME
            const cache = await caches.open(CACHE_NAME);
            console.info('Caching Resources');
            // Add all specified ASSETS to the cache
            await cache.addAll(ASSETS);
        })
    );
});

// activate
async function deleteCache(key) {
    // delete cache
    console.info(`Deleting old cache: ${key}`);
    await caches.delete(key);
};

async function deleteOldCaches() {
    // retrieve all caches
    const keyList = await caches.keys();
    // get all caches that is same to the name but different versions
    const cachesToDelete = keyList.filter(key => key.startsWith(cacheNaming) && key !== CACHE_NAME);
    // remove those filters caches
    await Promise.all(cachesToDelete.map(deleteCache));
};

self.addEventListener("activate", (event) => {
    // Extend the lifetime of the event until all promises inside waitUntil resolve
    event.waitUntil(deleteOldCaches().then(self.skipWaiting()));
    // Immediately take control of clients
    self.clients.claim();
});

// fetch
self.addEventListener('fetch', (event) => {
    event.respondWith(
        (async () => {
            const cache = await caches.open(CACHE_NAME);

            // get the resource from the cache
            const cachedResponse = await cache.match(event.request);

            if (cachedResponse) {
                return cachedResponse;
            } else {
                try {
                    // if the resource was not in the cache, try the network
                    const fetchResponse = await fetch(event.request);

                    // save the resource in the cache and return it
                    await cache.put(event.request, fetchResponse.clone());

                    return fetchResponse;
                } catch {
                    return new Response('Failed to fetch resources online.', {
                        status: 408,
                        headers: { 'Content-Type': 'text/plain' }
                    });
                }
            }
        })()
    );
});
