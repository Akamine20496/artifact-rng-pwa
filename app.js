if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        await navigator.serviceWorker.register('sw.js')
            .then(registration => {
                if (registration.installing) {
                    console.info('Service worker installing');
                } else if (registration.waiting) {
                    console.info('Service worker installed');
                } else if (registration.active) {
                    console.info('Service worker active');
                }

                // Listen for updates in service worker
                registration.addEventListener('updatefound', () => {
                    const newSW = registration.installing;
                    if (newSW) {
                        newSW.addEventListener('statechange', () => {
                            if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
                                // A new version has been installed and the old version is still active
                                showNotification({
                                    title: 'A new version of the app is available!',
                                    body: 'Please wait for the update to be ready.'
                                });
                            }
                        });
                    }
                })
            })
            .catch(error => {
                console.error(`Registration failed with ${error}`)
            });
        
        // Listen for messages from the service worker
        navigator.serviceWorker.addEventListener('message', event => {
            if (event.data.type === 'NEW_VERSION') {
                showNotification({
                    title: `New version ${event.data.version} is ready!`,
                    body: 'Reload the app to apply the update.'
                });
            }
        });
    });
} else {
    console.error("This browser does not support service worker");
}

window.addEventListener('online', () => {
    window.location.reload();
});

window.addEventListener('offline', () => {
    console.log('You are offline. The page will reload when you are back online.');
});

const showNotification = (message) => {
    if (Notification.permission === 'granted') {
        new Notification(message.title, {
            body: message.body,
            icon: 'asset/Amber_Icon192.png'
        });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                showNotification(message);
            }
        });
    }
}
