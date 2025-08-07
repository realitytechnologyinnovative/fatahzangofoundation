var staticCacheName = "django-pwa-v" + new Date().getTime();
var filesToCache = [
    '/offline',
    "/static//assets/plugins/global/plugins.bundle.css",
    "/static//assets/plugins/custom/prismjs/prismjs.bundle.css",
    "/static//assets/css/style.bundle.css",
    "/static//assets/css/custom.css",
    "/static//assets/plugins/custom/prismjs/prismjs.bundle.js",
    // LandingPage start
    "/static/css/all.min.css",
    "/static/css/animate.css", 
    "/static/css/bootstrap.min.css",
    "/static/css/bootstrap.min.css.map",
    "/static/css/fontawsom-all.min.css",
    "/static/css/responsive.css",
    "/static/css/style.css",
    "/static/css/style.css.map",
    "/static/fonts/PTSans-Bold.ttf",
    "/static/fonts/PTSans-Regular.ttf",
    "/static/images/logo.webp",
    "/static/favicon.ico",
    "/static/js/bootstrap.min.js",
    "/static/js/bootstrap.min.js.map",
    "/static/js/jquery-3.2.1.min.js",
    "/static/js/popper.js",
    "/static/js/popper.min.js",
    "/static/js/popper.min.js.map",
    "/static/js/script.js",
    "/static/scss/base/basic_setup.scss",
    "/static/scss/component/home/header.scss",
    "/static/scss/component/home/section.scss",
    "/static/scss/component/home/slider.scss",
    "/static/scss/component/footer.scss",
    "/static/scss/_variable.scss",
    "/static/scss/style.scss",
    "/static/config-scss.bat",
    // LandingPage End    
    "/static//assets/plugins/global/plugins.bundle.css",
    "/static//assets/plugins/custom/prismjs/prismjs.bundle.css",
    "/static//assets/css/style.bundle.css",
    "/static//assets/plugins/custom/prismjs/prismjs.bundle.js",
];

// Cache on install
self.addEventListener("install", event => {
    this.skipWaiting();
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
                return cache.addAll(filesToCache);
            })
    )
});

// Clear cache on activate
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => (cacheName.startsWith("django-pwa-")))
                    .filter(cacheName => (cacheName !== staticCacheName))
                    .map(cacheName => caches.delete(cacheName))
            );
        })
    );
});

// Serve from Cache
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
            .catch(() => {
                return caches.match('offline');
            })
    )
});

