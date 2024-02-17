window.onload = () => {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("service-worker.js")
            .then(registration => {
                console.log("Service Worker Registered", registration.scope);
            })
            .catch(err => {
                console.log("Service Worker Registration Failed", registration.scope);
            });
    }
};