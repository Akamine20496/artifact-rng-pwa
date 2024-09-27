const CACHE_NAMING = 'artifact-rng-cache';
const APP_VERSION = 'v9.0.3';
const CACHE_NAME = `${CACHE_NAMING}-${APP_VERSION}`;

const ASSETS = [
    "/",
    "index.html",
    "app.js",
    "manifest/manifest.webmanifest",
    "css/dialog.css",
    "css/modalCustomStat.css",
    "css/main.css",
    "jquery/jquery-3.7.1.min.js",
    "js/main.js",
    "js/AttributeStat.js",
    "js/ProbabilityStat.js",
    "js/ValueStat.js",
    "js/WeightedStat.js",
    "js/ArtifactDisplayerPanel.js",
    "js/ArtifactSimulator.js",
    "js/Artifact.js",
    "js/Attribute.js",
    "js/CustomStatDialog.js",
    "js/customStatModel.js",
    "js/Dialog.js",
    "asset/Amber Icon.jpg",
    "asset/Amber_Icon192.png",
    "asset/Amber_Icon512.png",
    "https://i.pinimg.com/originals/dd/6a/53/dd6a53af112346d57377e9b4403bdc9e.jpg",
];

// install
self.addEventListener('install', (event) => {
    // Extend the lifetime of the event until all promises inside waitUntil resolve
    event.waitUntil(
        async () => {
            // Open a new cache storage with the specified CACHE_NAME
            const cache = await caches.open(CACHE_NAME);
            // Add all specified ASSETS to the cache
            await cache.addAll(ASSETS);
        }
    );
});

async function deleteOldCaches() {
    // retrieve all caches
    const keyList = await caches.keys();
    // get all caches that is same to the name but different versions
    const cachesToDelete = keyList.filter(key => key.startsWith(CACHE_NAMING) && key !== CACHE_NAME);
    // remove those filters caches
    await Promise.all(cachesToDelete.map(cache => {
        console.info(`Deleting old cache: ${cache}`);
        caches.delete(cache);
    }));
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