const CACHE_NAMING = 'artifact-rng-cache';
const APP_VERSION = 'v11.1.0';
const CACHE_NAME = `${CACHE_NAMING}-${APP_VERSION}`;

const ASSETS = [
    "/",
    "index.html",
    "app.js",
    "manifest/manifest.webmanifest",
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
    "js/customStatModal.js",
    "asset/Amber Icon.jpg",
    "asset/Amber_Icon192.png",
    "asset/Amber_Icon512.png",
    "asset/genshin_background_liyue.webp",
    "https://res.cloudinary.com/dy0sbkf3u/raw/upload/Dialog.min.js",
];

const addAssetsToCache = async () => {
    const cache = await caches.open(CACHE_NAME);

    // handle individual cache.add operations
    const cachePromises = ASSETS.map(async (asset) => {
        try {
            await cache.add(asset);
        } catch (error) {
            console.warn(error.message);
        }
    });

    // Wait for all caching operations to settle
    await Promise.allSettled(cachePromises);
    console.info('Assets are successfully cached!');
}

const deleteCacheAndSendMessage = async () => {
    // delete old cache version
    await deleteOldCaches();

    // Notify clients about the new service worker version
    const clients = await self.clients.matchAll({ includeUncontrolled: true });

    if (clients.length > 0) {
        console.info(`Found ${clients.length} client/s. Sending messages.`);
        clients.forEach(client => {
            client.postMessage({
                type: 'NEW_VERSION',
                version: APP_VERSION
            });
        });
    } else {
        console.warn('No clients found to send messages.');
    }
};

const deleteOldCaches = async () => {
    // retrieve all caches
    const keyList = await caches.keys();
    // get all caches that is same to the name but different versions
    const cachesToDelete = keyList.filter(key => key.startsWith(CACHE_NAMING) && key !== CACHE_NAME);
    // remove those filters caches
    await Promise.allSettled(cachesToDelete.map(async (cache) => {
        console.info(`Deleting old cache: ${cache}`);
        await caches.delete(cache);
    }));
};

const cacheFirst = async (event) => {
    const cache = await caches.open(CACHE_NAME);

    // get the resource from the cache
    const cachedResponse = await cache.match(event.request);

    if (cachedResponse) {
        return cachedResponse;
    }

    try {
        // if the resource was not in the cache, try the network
        const networkResponse = await fetch(event.request);

        if (event.request.method === 'GET' && new URL(event.request.url).origin === location.origin) {
            // save the resource in the cache and return it
            await cache.put(event.request, networkResponse.clone());
        }

        return networkResponse;
    } catch {
        return new Response(showStatusPage(), {
            status: 408,
            headers: { 'Content-Type': 'text/html' }
        });
    }
};

// install
self.addEventListener('install', (event) => {
    // Extend the lifetime of the event until all promises inside waitUntil resolve
    event.waitUntil(addAssetsToCache());

    self.skipWaiting();
});

// activate
self.addEventListener("activate", (event) => {
    // Extend the lifetime of the event until all promises inside waitUntil resolve
    event.waitUntil(deleteCacheAndSendMessage());
});

// fetch
self.addEventListener('fetch', (event) => {
    event.respondWith(cacheFirst(event));
});

// 408 page
const showStatusPage = () => {
    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>408 Request Timeout</title>
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                    }

                    html,
                    body {
                        height: 100%;
                        width: 100%;
                    }

                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f8f9fa;
                        color: #333;
                        text-align: center;

                        align-content: center;
                    }

                    h1 {
                        font-size: 50px;
                        color: #dc3545;

                        margin-bottom: 20px;
                    }

                    p {
                        font-size: 20px;
                    }
                </style>
            </head>
            <body>
                <h1>408 Request Timeout</h1>
                <p>The request took too long to complete or no internet connection. Please try again later.</p>
            </body>
        </html>
    `;
}