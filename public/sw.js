if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,a)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>n(e,t),o={module:{uri:t},exports:c,require:r};s[t]=Promise.all(i.map((e=>o[e]||r(e)))).then((e=>(a(...e),c)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/DarkTheme.png",revision:"58eb2b1aec9f84c4cc04dbb973f50418"},{url:"/LightTheme.png",revision:"a18d3b3759012c3da95a9428bbdadbb5"},{url:"/SystemTheme.png",revision:"56f6cf6103e1c5bcbc2d5e3f4f97f3e8"},{url:"/_next/app-build-manifest.json",revision:"434af078512000203212119bf342c673"},{url:"/_next/dynamic-css-manifest.json",revision:"d751713988987e9331980363e24189ce"},{url:"/_next/static/chunks/0d9c1337-c3fe0c0fb614818c.js",revision:"d87PEWTWjfLx0nP7BDz8T"},{url:"/_next/static/chunks/0f1159e5-d22b8f27299b0c15.js",revision:"d87PEWTWjfLx0nP7BDz8T"},{url:"/_next/static/chunks/144-967986d3821906a0.js",revision:"d87PEWTWjfLx0nP7BDz8T"},{url:"/_next/static/chunks/302-1b9715586bd8a9be.js",revision:"d87PEWTWjfLx0nP7BDz8T"},{url:"/_next/static/chunks/329-016b4bf76b8016d6.js",revision:"d87PEWTWjfLx0nP7BDz8T"},{url:"/_next/static/chunks/380-6570feb7e21f438b.js",revision:"d87PEWTWjfLx0nP7BDz8T"},{url:"/_next/static/chunks/391-af63375b4442d545.js",revision:"d87PEWTWjfLx0nP7BDz8T"},{url:"/_next/static/chunks/414.57d074afaa5821d7.js",revision:"57d074afaa5821d7"},{url:"/_next/static/chunks/497cd2bd-de6c44986beee783.js",revision:"d87PEWTWjfLx0nP7BDz8T"},{url:"/_next/static/chunks/4bd1b696-4aad5e8bda1a485c.js",revision:"d87PEWTWjfLx0nP7BDz8T"},{url:"/_next/static/chunks/52c63b42-93420c439238b246.js",revision:"d87PEWTWjfLx0nP7BDz8T"},{url:"/_next/static/chunks/5c94f8c1-5685a0f82e933923.js",revision:"d87PEWTWjfLx0nP7BDz8T"},{url:"/_next/static/chunks/614c10bb-f78b22e3183bbdfd.js",revision:"d87PEWTWjfLx0nP7BDz8T"},{url:"/_next/static/chunks/647-10e862a989651e61.js",revision:"d87PEWTWjfLx0nP7BDz8T"},{url:"/_next/static/chunks/660-7178a1b22f7b6e64.js",revision:"d87PEWTWjfLx0nP7BDz8T"},{url:"/_next/static/chunks/7fab36dd-095fef2fdfb0c8bb.js",revision:"d87PEWTWjfLx0nP7BDz8T"},{url:"/_next/static/chunks/851.2b19d13b5f97a7b9.js",revision:"2b19d13b5f97a7b9"},{url:"/_next/static/chunks/8a8d09a4-eb4144a63b0f2469.js",revision:"d87PEWTWjfLx0nP7BDz8T"},{url:"/_next/static/chunks/927.1669e4d1a277f407.js",revision:"1669e4d1a277f407"},{url:"/_next/static/chunks/974-c0c9956f7c5ae8b5.js",revision:"d87PEWTWjfLx0nP7BDz8T"},{url:"/_next/static/chunks/994.aca294c2263e99fa.js",revision:"aca294c2263e99fa"},{url:"/_next/static/chunks/9ef4ab7f-06f6cba5ee7c3115.js",revision:"d87PEWTWjfLx0nP7BDz8T"},{url:"/_next/static/chunks/b55107cc-a3b1a45a035c3820.js",revision:"d87PEWTWjfLx0nP7BDz8T"},{url:"/_next/static/chunks/f4debfa0-81f727740a284abf.js",revision:"d87PEWTWjfLx0nP7BDz8T"},{url:"/_next/static/chunks/fd0b3a01-f4dd23c46e03d255.js",revision:"d87PEWTWjfLx0nP7BDz8T"},{url:"/_next/static/chunks/framework-cbcae3f171c88b05.js",revision:"d87PEWTWjfLx0nP7BDz8T"},{url:"/_next/static/chunks/main-3b7a74d309d8947d.js",revision:"d87PEWTWjfLx0nP7BDz8T"},{url:"/_next/static/chunks/main-app-65ebef091af66642.js",revision:"d87PEWTWjfLx0nP7BDz8T"},{url:"/_next/static/chunks/pages/_app-5e9526697f86a243.js",revision:"d87PEWTWjfLx0nP7BDz8T"},{url:"/_next/static/chunks/pages/_error-387163b065b33110.js",revision:"d87PEWTWjfLx0nP7BDz8T"},{url:"/_next/static/chunks/pages/barcode-ac834d926b37fedd.js",revision:"d87PEWTWjfLx0nP7BDz8T"},{url:"/_next/static/chunks/pages/history-ba8f1dc61197159f.js",revision:"d87PEWTWjfLx0nP7BDz8T"},{url:"/_next/static/chunks/pages/index-42668a5a5af2ff86.js",revision:"d87PEWTWjfLx0nP7BDz8T"},{url:"/_next/static/chunks/pages/qrcode-b25bf6c60c4b7a7d.js",revision:"d87PEWTWjfLx0nP7BDz8T"},{url:"/_next/static/chunks/pages/settings-07e5c15035470ece.js",revision:"d87PEWTWjfLx0nP7BDz8T"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-c013f22e34c4a9d5.js",revision:"d87PEWTWjfLx0nP7BDz8T"},{url:"/_next/static/css/81a1fd298a5212b3.css",revision:"81a1fd298a5212b3"},{url:"/_next/static/d87PEWTWjfLx0nP7BDz8T/_buildManifest.js",revision:"0c6e44cd35d42319bce83f0e795c1bbd"},{url:"/_next/static/d87PEWTWjfLx0nP7BDz8T/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/FluentSystemIcons-Filled.cd54074e.ttf",revision:"cd54074e"},{url:"/_next/static/media/FluentSystemIcons-Regular.d8462c0c.ttf",revision:"d8462c0c"},{url:"/_next/static/media/Hauora-ExtraBold.d1b2438a.ttf",revision:"d1b2438a"},{url:"/_next/static/media/Hauora-Regular.b0cb4241.ttf",revision:"b0cb4241"},{url:"/_next/static/media/Hauora-SemiBold.cc0aa2fb.ttf",revision:"cc0aa2fb"},{url:"/favicon.ico",revision:"46f8166f8a4c6a6fd33fdfa333c36177"},{url:"/fonts/FluentSystemIcons-Filled.ttf",revision:"f8fccaa06c212c7c31fc56bcf96017e6"},{url:"/fonts/FluentSystemIcons-Regular.ttf",revision:"0f7cbde6838ba772cd85a488e6cebd88"},{url:"/fonts/Hauora-ExtraBold.ttf",revision:"ac6cb6e7f3223ef711de688ac29c61d6"},{url:"/fonts/Hauora-Regular.ttf",revision:"18a69d21a23b14744cfe0b8960724df7"},{url:"/fonts/Hauora-SemiBold.ttf",revision:"7d0b5b1eb0cdc0557b59c5f2b276da63"},{url:"/images/icons/icon-128x128.png",revision:"777fa31991ae68b4b6da2547ea765973"},{url:"/images/icons/icon-144x144.png",revision:"0ddb0e4f1cef853ef3f1e926578502b5"},{url:"/images/icons/icon-152x152.png",revision:"eba1e161ef014f900c852ad1cbad92f5"},{url:"/images/icons/icon-192x192.png",revision:"b04d6bbad1351a920c12c2ba4fb8c3e9"},{url:"/images/icons/icon-384x384.png",revision:"f616fa18bd1f358fa132ab12615b1bf7"},{url:"/images/icons/icon-512x512.png",revision:"863f1ad61e7d3125e89ffa6f171b52e6"},{url:"/images/icons/icon-72x72.png",revision:"f5b750198b56dcd39026c7a0a0607a83"},{url:"/images/icons/icon-96x96.png",revision:"44915e9e398cd20cedf717a2e1e82cb0"},{url:"/images/social.png",revision:"fa81d25a2676b9d9a22d107eb59cb193"},{url:"/manifest.json",revision:"e24ea0a2aa746d5ed10e9e353dbc3586"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
