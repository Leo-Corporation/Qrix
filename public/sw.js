if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>a(e,c),u={module:{uri:c},exports:t,require:r};s[c]=Promise.all(n.map((e=>u[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/DarkTheme.png",revision:"58eb2b1aec9f84c4cc04dbb973f50418"},{url:"/LightTheme.png",revision:"a18d3b3759012c3da95a9428bbdadbb5"},{url:"/SystemTheme.png",revision:"56f6cf6103e1c5bcbc2d5e3f4f97f3e8"},{url:"/_next/app-build-manifest.json",revision:"434af078512000203212119bf342c673"},{url:"/_next/static/chunks/0d9c1337-05d1ba42a2bc9b76.js",revision:"qC2vQSh7aIkughPSV26fe"},{url:"/_next/static/chunks/167.62af3f3a1547e9d1.js",revision:"62af3f3a1547e9d1"},{url:"/_next/static/chunks/188-17c3be40fefa214e.js",revision:"qC2vQSh7aIkughPSV26fe"},{url:"/_next/static/chunks/317-3958236f78f88142.js",revision:"qC2vQSh7aIkughPSV26fe"},{url:"/_next/static/chunks/443-503b1f614662e071.js",revision:"qC2vQSh7aIkughPSV26fe"},{url:"/_next/static/chunks/464.7a64bd775cab63cb.js",revision:"7a64bd775cab63cb"},{url:"/_next/static/chunks/52c63b42-17b6c36034a18b82.js",revision:"qC2vQSh7aIkughPSV26fe"},{url:"/_next/static/chunks/575-06fa64f0f9c8b4cc.js",revision:"qC2vQSh7aIkughPSV26fe"},{url:"/_next/static/chunks/613-52b1427914ed5a42.js",revision:"qC2vQSh7aIkughPSV26fe"},{url:"/_next/static/chunks/614c10bb-67e2746980db7bd6.js",revision:"qC2vQSh7aIkughPSV26fe"},{url:"/_next/static/chunks/633-679dbc0ee845800c.js",revision:"qC2vQSh7aIkughPSV26fe"},{url:"/_next/static/chunks/7fab36dd-6f20e3a853cd1b6b.js",revision:"qC2vQSh7aIkughPSV26fe"},{url:"/_next/static/chunks/842-bb456a38da074d7d.js",revision:"qC2vQSh7aIkughPSV26fe"},{url:"/_next/static/chunks/975-7e33c99513cde7c0.js",revision:"qC2vQSh7aIkughPSV26fe"},{url:"/_next/static/chunks/976-8f5c27abad97768e.js",revision:"qC2vQSh7aIkughPSV26fe"},{url:"/_next/static/chunks/9ef4ab7f-7e507ef925f27b6d.js",revision:"qC2vQSh7aIkughPSV26fe"},{url:"/_next/static/chunks/9ff28164-f73b38c5bd2472fa.js",revision:"qC2vQSh7aIkughPSV26fe"},{url:"/_next/static/chunks/b55107cc-d553e3579ee08bda.js",revision:"qC2vQSh7aIkughPSV26fe"},{url:"/_next/static/chunks/fd0b3a01-c5fe2e89fcf50f0e.js",revision:"qC2vQSh7aIkughPSV26fe"},{url:"/_next/static/chunks/fd9d1056-b228836c27634f8d.js",revision:"qC2vQSh7aIkughPSV26fe"},{url:"/_next/static/chunks/framework-5861e9d0ae9713ed.js",revision:"qC2vQSh7aIkughPSV26fe"},{url:"/_next/static/chunks/main-6664fc756857fbe2.js",revision:"qC2vQSh7aIkughPSV26fe"},{url:"/_next/static/chunks/main-app-9b5486aa8038b6a0.js",revision:"qC2vQSh7aIkughPSV26fe"},{url:"/_next/static/chunks/pages/_app-b04e9e4b362dd943.js",revision:"qC2vQSh7aIkughPSV26fe"},{url:"/_next/static/chunks/pages/_error-a831210ab06585d2.js",revision:"qC2vQSh7aIkughPSV26fe"},{url:"/_next/static/chunks/pages/barcode-e7c2ed1a95c6df68.js",revision:"qC2vQSh7aIkughPSV26fe"},{url:"/_next/static/chunks/pages/history-181fc0eb873d42d3.js",revision:"qC2vQSh7aIkughPSV26fe"},{url:"/_next/static/chunks/pages/index-892c51f535daca86.js",revision:"qC2vQSh7aIkughPSV26fe"},{url:"/_next/static/chunks/pages/qrcode-d4fbc64967697006.js",revision:"qC2vQSh7aIkughPSV26fe"},{url:"/_next/static/chunks/pages/settings-c0be234974896c1e.js",revision:"qC2vQSh7aIkughPSV26fe"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-b6b437d2b7d80cb2.js",revision:"qC2vQSh7aIkughPSV26fe"},{url:"/_next/static/css/49c2942bfa38e5eb.css",revision:"49c2942bfa38e5eb"},{url:"/_next/static/media/FluentSystemIcons-Filled.cd54074e.ttf",revision:"cd54074e"},{url:"/_next/static/media/FluentSystemIcons-Regular.d8462c0c.ttf",revision:"d8462c0c"},{url:"/_next/static/media/Hauora-ExtraBold.d1b2438a.ttf",revision:"d1b2438a"},{url:"/_next/static/media/Hauora-Regular.b0cb4241.ttf",revision:"b0cb4241"},{url:"/_next/static/media/dark.682493e2.png",revision:"682493e2"},{url:"/_next/static/media/white.ac9eb76b.png",revision:"ac9eb76b"},{url:"/_next/static/qC2vQSh7aIkughPSV26fe/_buildManifest.js",revision:"b9636e4d55f8e5e6a9219c7aa1aba270"},{url:"/_next/static/qC2vQSh7aIkughPSV26fe/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/dark.png",revision:"334d51a8cb1829b9ec7d76066eaea2e2"},{url:"/favicon.ico",revision:"46f8166f8a4c6a6fd33fdfa333c36177"},{url:"/fonts/FluentSystemIcons-Filled.ttf",revision:"f8fccaa06c212c7c31fc56bcf96017e6"},{url:"/fonts/FluentSystemIcons-Regular.ttf",revision:"0f7cbde6838ba772cd85a488e6cebd88"},{url:"/fonts/Hauora-ExtraBold.ttf",revision:"ac6cb6e7f3223ef711de688ac29c61d6"},{url:"/fonts/Hauora-Regular.ttf",revision:"18a69d21a23b14744cfe0b8960724df7"},{url:"/images/icons/icon-128x128.png",revision:"777fa31991ae68b4b6da2547ea765973"},{url:"/images/icons/icon-144x144.png",revision:"0ddb0e4f1cef853ef3f1e926578502b5"},{url:"/images/icons/icon-152x152.png",revision:"eba1e161ef014f900c852ad1cbad92f5"},{url:"/images/icons/icon-192x192.png",revision:"b04d6bbad1351a920c12c2ba4fb8c3e9"},{url:"/images/icons/icon-384x384.png",revision:"f616fa18bd1f358fa132ab12615b1bf7"},{url:"/images/icons/icon-512x512.png",revision:"863f1ad61e7d3125e89ffa6f171b52e6"},{url:"/images/icons/icon-72x72.png",revision:"f5b750198b56dcd39026c7a0a0607a83"},{url:"/images/icons/icon-96x96.png",revision:"44915e9e398cd20cedf717a2e1e82cb0"},{url:"/images/social.png",revision:"fa81d25a2676b9d9a22d107eb59cb193"},{url:"/manifest.json",revision:"b2e23949ff78e5b325d94a8dc7ff5d05"},{url:"/white.png",revision:"29b8ca7f6c41e9c278350ac42a87d0fc"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
