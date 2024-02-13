const assets = [
    "./",
    "./index.html",
    "./json/manifest.json",
    "./css/dialog.css",
    "./css/modalCustomStat.css",
    "./css/style.css",
    "./js/Artifact_Piece.js",
    "./js/Artifact_Simulator.js",
    "./js/Artifact.js",
    "./js/Attribute.js",
    "./js/CustomStat.js",
    "./js/customStatModel.js",
    "./js/Dialog.js",
    "./js/jquery-3.7.0.min.js",
    "./js/main.js",
    "./js/Stat.js",
    "./asset/Amber Icon.jpg",
    "./asset/Amber_Icon192.png",
    "./asset/Amber_Icon512.png"
];

// install
self.addEventListener("install", evt => {
    evt.waitUntil(
      caches.open("artifact_rngCache")
      .then(cache => cache.addAll(assets))
      .catch(err => console.error(err))
    );
});
   
// claim control
self.addEventListener("activate", evt => self.clients.claim());

// fetch
self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
});