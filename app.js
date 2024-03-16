window.addEventListener('load', () => {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("sw.js")
            .then(registration => {
                console.log("Service Worker Registered", registration.scope);
            })
            .catch(error => {
                console.log(`Service Worker Registration Failed: ${error}`, registration.scope);
            });
    }
});