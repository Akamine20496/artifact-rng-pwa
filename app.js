window.addEventListener('load', async () => {
    if ("serviceWorker" in navigator) {
        await navigator.serviceWorker.register('sw.js')
            .then(registration => {
                if (registration.installing) {
                    console.info('Service worker installing');
                } else if (registration.waiting) {
                    console.info('Service worker installed');
                } else if (registration.active) {
                    console.info('Service worker active');
                }
            })
            .catch(error => {
                console.error(`Registration failed with ${error}`)
            });
    }
});