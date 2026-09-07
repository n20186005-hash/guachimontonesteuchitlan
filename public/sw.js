'use strict';

/* Guachimontones PWA Service Worker（静态导出站点） */

var CACHE = 'gmt-cache-v1';
/* 核心页面与资源：随 Next 静态导出（out/）一起发布 */
var CORE = [
  './es.html',
  './en.html',
  './zh.html',
  './index.html',
  './manifest.webmanifest',
  './og-guachimontones.jpg',
  './images/icon-192.png',
  './images/icon-512.png',
  './images/apple-touch-icon.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(CORE);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (key) { return key !== CACHE; })
          .map(function (key) { return caches.delete(key); })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (event) {
  var request = event.request;
  if (request.method !== 'GET') return;
  if (!request.url.startsWith(self.location.origin)) return;

  var url = new URL(request.url);
  /* 不缓存 Service Worker 自身 */
  if (url.pathname === '/sw.js') return;

  /* 页面导航：网络优先，离线时回退到缓存的西班牙语首页 */
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(function (response) {
          if (response && (response.status === 200 || response.type === 'opaque')) {
            var copy = response.clone();
            caches.open(CACHE).then(function (cache) {
              cache.put(request, copy);
            }).catch(function () {});
          }
          return response;
        })
        .catch(function () {
          return caches.match(request).then(function (hit) {
            return hit || caches.match('./es.html');
          });
        })
    );
    return;
  }

  /* 同源静态资源：先读缓存、后台更新（stale-while-revalidate） */
  event.respondWith(
    caches.match(request).then(function (hit) {
      var network = fetch(request)
        .then(function (response) {
          if (response && (response.status === 200 || response.type === 'opaque')) {
            var copy = response.clone();
            caches.open(CACHE).then(function (cache) {
              cache.put(request, copy);
            }).catch(function () {});
          }
          return response;
        })
        .catch(function () {
          return hit;
        });
      return hit || network;
    })
  );
});
