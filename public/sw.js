if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const o=e=>a(e,c),f={module:{uri:c},exports:t,require:o};s[c]=Promise.all(n.map((e=>f[e]||o(e)))).then((e=>(i(...e),t)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/DarkTheme.png",revision:"58eb2b1aec9f84c4cc04dbb973f50418"},{url:"/LightTheme.png",revision:"a18d3b3759012c3da95a9428bbdadbb5"},{url:"/SystemTheme.png",revision:"56f6cf6103e1c5bcbc2d5e3f4f97f3e8"},{url:"/_next/app-build-manifest.json",revision:"434af078512000203212119bf342c673"},{url:"/_next/dynamic-css-manifest.json",revision:"d751713988987e9331980363e24189ce"},{url:"/_next/static/chunks/068224c5-8ed141d31d262dbe.js",revision:"f4aW6JeoBLvMLfh2PECRM"},{url:"/_next/static/chunks/232-06b6e2ae614e26e9.js",revision:"f4aW6JeoBLvMLfh2PECRM"},{url:"/_next/static/chunks/29ed9c77-45f88222095a1e47.js",revision:"f4aW6JeoBLvMLfh2PECRM"},{url:"/_next/static/chunks/30d20a6a-10c6933a2e70e74c.js",revision:"f4aW6JeoBLvMLfh2PECRM"},{url:"/_next/static/chunks/359-eb2319f045362a0a.js",revision:"f4aW6JeoBLvMLfh2PECRM"},{url:"/_next/static/chunks/42ef4a94-552bf3605cdebd4c.js",revision:"f4aW6JeoBLvMLfh2PECRM"},{url:"/_next/static/chunks/476.6904de49d7f9baa4.js",revision:"6904de49d7f9baa4"},{url:"/_next/static/chunks/4bd1b696-fb8a9d609be6a139.js",revision:"f4aW6JeoBLvMLfh2PECRM"},{url:"/_next/static/chunks/502f3de9-fbad3210c69b1f84.js",revision:"f4aW6JeoBLvMLfh2PECRM"},{url:"/_next/static/chunks/504-eda0eeeca3d1b94d.js",revision:"f4aW6JeoBLvMLfh2PECRM"},{url:"/_next/static/chunks/521-dbd747e55b34af90.js",revision:"f4aW6JeoBLvMLfh2PECRM"},{url:"/_next/static/chunks/547.962044b4fc1d3d60.js",revision:"962044b4fc1d3d60"},{url:"/_next/static/chunks/551-12aa618891b80a1e.js",revision:"f4aW6JeoBLvMLfh2PECRM"},{url:"/_next/static/chunks/62.20cd29088a0695fb.js",revision:"20cd29088a0695fb"},{url:"/_next/static/chunks/655-c88b9d4a37c8ee1c.js",revision:"f4aW6JeoBLvMLfh2PECRM"},{url:"/_next/static/chunks/683-c0adb468c509efc9.js",revision:"f4aW6JeoBLvMLfh2PECRM"},{url:"/_next/static/chunks/71424b7a-ed074f79f274ae8e.js",revision:"f4aW6JeoBLvMLfh2PECRM"},{url:"/_next/static/chunks/793.065ccc0a8f4054a2.js",revision:"065ccc0a8f4054a2"},{url:"/_next/static/chunks/87c2785e-2d56abb752343421.js",revision:"f4aW6JeoBLvMLfh2PECRM"},{url:"/_next/static/chunks/913a2838-ee2752dd1f2447fc.js",revision:"f4aW6JeoBLvMLfh2PECRM"},{url:"/_next/static/chunks/937-70c954e6fe7ec70d.js",revision:"f4aW6JeoBLvMLfh2PECRM"},{url:"/_next/static/chunks/a7440bc8-75edbe8e123593c6.js",revision:"f4aW6JeoBLvMLfh2PECRM"},{url:"/_next/static/chunks/e32b3802-f85f0b4d57fae93d.js",revision:"f4aW6JeoBLvMLfh2PECRM"},{url:"/_next/static/chunks/fad33e0f-da8bf598b0dc340a.js",revision:"f4aW6JeoBLvMLfh2PECRM"},{url:"/_next/static/chunks/framework-43d270270323fe59.js",revision:"f4aW6JeoBLvMLfh2PECRM"},{url:"/_next/static/chunks/main-app-3f018aaf6a422a69.js",revision:"f4aW6JeoBLvMLfh2PECRM"},{url:"/_next/static/chunks/main-dbc63db073d015c6.js",revision:"f4aW6JeoBLvMLfh2PECRM"},{url:"/_next/static/chunks/pages/_app-a4afd1e6298c2a77.js",revision:"f4aW6JeoBLvMLfh2PECRM"},{url:"/_next/static/chunks/pages/_error-a22951731f25ce07.js",revision:"f4aW6JeoBLvMLfh2PECRM"},{url:"/_next/static/chunks/pages/barcode-b5e3cf4adedc74ed.js",revision:"f4aW6JeoBLvMLfh2PECRM"},{url:"/_next/static/chunks/pages/history-469e71c6ab55d0dd.js",revision:"f4aW6JeoBLvMLfh2PECRM"},{url:"/_next/static/chunks/pages/index-d471a8d782fe0473.js",revision:"f4aW6JeoBLvMLfh2PECRM"},{url:"/_next/static/chunks/pages/qrcode-9c4ebfac533f962f.js",revision:"f4aW6JeoBLvMLfh2PECRM"},{url:"/_next/static/chunks/pages/settings-9f8c319f2d7c1a68.js",revision:"f4aW6JeoBLvMLfh2PECRM"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-f3e3bff2ad1515fa.js",revision:"f4aW6JeoBLvMLfh2PECRM"},{url:"/_next/static/css/3bd43f45cb9a5651.css",revision:"3bd43f45cb9a5651"},{url:"/_next/static/f4aW6JeoBLvMLfh2PECRM/_buildManifest.js",revision:"8665befd939a2972d40e3c925259db77"},{url:"/_next/static/f4aW6JeoBLvMLfh2PECRM/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/FluentSystemIcons-Filled.cd54074e.ttf",revision:"cd54074e"},{url:"/_next/static/media/FluentSystemIcons-Regular.d8462c0c.ttf",revision:"d8462c0c"},{url:"/_next/static/media/Hauora-ExtraBold.d1b2438a.ttf",revision:"d1b2438a"},{url:"/_next/static/media/Hauora-Regular.b0cb4241.ttf",revision:"b0cb4241"},{url:"/_next/static/media/Hauora-SemiBold.cc0aa2fb.ttf",revision:"cc0aa2fb"},{url:"/favicon.ico",revision:"46f8166f8a4c6a6fd33fdfa333c36177"},{url:"/fonts/FluentSystemIcons-Filled.ttf",revision:"f8fccaa06c212c7c31fc56bcf96017e6"},{url:"/fonts/FluentSystemIcons-Regular.ttf",revision:"0f7cbde6838ba772cd85a488e6cebd88"},{url:"/fonts/Hauora-ExtraBold.ttf",revision:"ac6cb6e7f3223ef711de688ac29c61d6"},{url:"/fonts/Hauora-Regular.ttf",revision:"18a69d21a23b14744cfe0b8960724df7"},{url:"/fonts/Hauora-SemiBold.ttf",revision:"7d0b5b1eb0cdc0557b59c5f2b276da63"},{url:"/images/icons/icon-128x128.png",revision:"777fa31991ae68b4b6da2547ea765973"},{url:"/images/icons/icon-144x144.png",revision:"0ddb0e4f1cef853ef3f1e926578502b5"},{url:"/images/icons/icon-152x152.png",revision:"eba1e161ef014f900c852ad1cbad92f5"},{url:"/images/icons/icon-192x192.png",revision:"b04d6bbad1351a920c12c2ba4fb8c3e9"},{url:"/images/icons/icon-384x384.png",revision:"f616fa18bd1f358fa132ab12615b1bf7"},{url:"/images/icons/icon-512x512.png",revision:"863f1ad61e7d3125e89ffa6f171b52e6"},{url:"/images/icons/icon-72x72.png",revision:"f5b750198b56dcd39026c7a0a0607a83"},{url:"/images/icons/icon-96x96.png",revision:"44915e9e398cd20cedf717a2e1e82cb0"},{url:"/images/social.png",revision:"fa81d25a2676b9d9a22d107eb59cb193"},{url:"/manifest.json",revision:"b2e23949ff78e5b325d94a8dc7ff5d05"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
