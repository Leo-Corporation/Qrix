if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,a)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>n(e,t),o={module:{uri:t},exports:c,require:r};s[t]=Promise.all(i.map((e=>o[e]||r(e)))).then((e=>(a(...e),c)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/DarkTheme.png",revision:"58eb2b1aec9f84c4cc04dbb973f50418"},{url:"/LightTheme.png",revision:"a18d3b3759012c3da95a9428bbdadbb5"},{url:"/SystemTheme.png",revision:"56f6cf6103e1c5bcbc2d5e3f4f97f3e8"},{url:"/_next/app-build-manifest.json",revision:"434af078512000203212119bf342c673"},{url:"/_next/static/YWfPnUJlPG0q3GiBmCOj2/_buildManifest.js",revision:"badee95e32c73ce24b2e5b2fdc53207f"},{url:"/_next/static/YWfPnUJlPG0q3GiBmCOj2/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0d9c1337-efd57ddce94b99d1.js",revision:"YWfPnUJlPG0q3GiBmCOj2"},{url:"/_next/static/chunks/167.09fd139d8c144000.js",revision:"09fd139d8c144000"},{url:"/_next/static/chunks/188-0374d92f6b025511.js",revision:"YWfPnUJlPG0q3GiBmCOj2"},{url:"/_next/static/chunks/317-1c00be6b1742e08c.js",revision:"YWfPnUJlPG0q3GiBmCOj2"},{url:"/_next/static/chunks/4-2414e7142237792c.js",revision:"YWfPnUJlPG0q3GiBmCOj2"},{url:"/_next/static/chunks/464.d93515e872f184ff.js",revision:"d93515e872f184ff"},{url:"/_next/static/chunks/478-a3fe2b03700124a3.js",revision:"YWfPnUJlPG0q3GiBmCOj2"},{url:"/_next/static/chunks/52c63b42-07cbdb1630847acb.js",revision:"YWfPnUJlPG0q3GiBmCOj2"},{url:"/_next/static/chunks/540-515db4419ffbb86d.js",revision:"YWfPnUJlPG0q3GiBmCOj2"},{url:"/_next/static/chunks/575-8da6fc0f66e98cb0.js",revision:"YWfPnUJlPG0q3GiBmCOj2"},{url:"/_next/static/chunks/614c10bb-67e2746980db7bd6.js",revision:"YWfPnUJlPG0q3GiBmCOj2"},{url:"/_next/static/chunks/7fab36dd-a3634033a5878f48.js",revision:"YWfPnUJlPG0q3GiBmCOj2"},{url:"/_next/static/chunks/901-f10bdb4811ff65f0.js",revision:"YWfPnUJlPG0q3GiBmCOj2"},{url:"/_next/static/chunks/975-3bad7f124f727f04.js",revision:"YWfPnUJlPG0q3GiBmCOj2"},{url:"/_next/static/chunks/9ef4ab7f-153dcfe126ae4984.js",revision:"YWfPnUJlPG0q3GiBmCOj2"},{url:"/_next/static/chunks/9ff28164-836b64842b421452.js",revision:"YWfPnUJlPG0q3GiBmCOj2"},{url:"/_next/static/chunks/b55107cc-ee0974509c0513e9.js",revision:"YWfPnUJlPG0q3GiBmCOj2"},{url:"/_next/static/chunks/e6b377d6-efdb5535d9e4a27c.js",revision:"YWfPnUJlPG0q3GiBmCOj2"},{url:"/_next/static/chunks/f4debfa0-89023005487f3837.js",revision:"YWfPnUJlPG0q3GiBmCOj2"},{url:"/_next/static/chunks/fd0b3a01-5010aa33797db835.js",revision:"YWfPnUJlPG0q3GiBmCOj2"},{url:"/_next/static/chunks/fd9d1056-2e175a3d7b9bfd4d.js",revision:"YWfPnUJlPG0q3GiBmCOj2"},{url:"/_next/static/chunks/framework-5861e9d0ae9713ed.js",revision:"YWfPnUJlPG0q3GiBmCOj2"},{url:"/_next/static/chunks/main-app-36758af98caa581d.js",revision:"YWfPnUJlPG0q3GiBmCOj2"},{url:"/_next/static/chunks/main-c357feb4ae29aeb7.js",revision:"YWfPnUJlPG0q3GiBmCOj2"},{url:"/_next/static/chunks/pages/_app-ea6bdf28ee22a4c6.js",revision:"YWfPnUJlPG0q3GiBmCOj2"},{url:"/_next/static/chunks/pages/_error-a831210ab06585d2.js",revision:"YWfPnUJlPG0q3GiBmCOj2"},{url:"/_next/static/chunks/pages/barcode-7c9ac7ba0d871af9.js",revision:"YWfPnUJlPG0q3GiBmCOj2"},{url:"/_next/static/chunks/pages/history-c7dc06eaec87c914.js",revision:"YWfPnUJlPG0q3GiBmCOj2"},{url:"/_next/static/chunks/pages/index-d47753f6c0249989.js",revision:"YWfPnUJlPG0q3GiBmCOj2"},{url:"/_next/static/chunks/pages/qrcode-4441eff222a76331.js",revision:"YWfPnUJlPG0q3GiBmCOj2"},{url:"/_next/static/chunks/pages/settings-43124e461ede3ae6.js",revision:"YWfPnUJlPG0q3GiBmCOj2"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-924989b88285008e.js",revision:"YWfPnUJlPG0q3GiBmCOj2"},{url:"/_next/static/css/fac5a0f300e5b461.css",revision:"fac5a0f300e5b461"},{url:"/_next/static/media/FluentSystemIcons-Filled.cd54074e.ttf",revision:"cd54074e"},{url:"/_next/static/media/FluentSystemIcons-Regular.d8462c0c.ttf",revision:"d8462c0c"},{url:"/_next/static/media/Hauora-ExtraBold.d1b2438a.ttf",revision:"d1b2438a"},{url:"/_next/static/media/Hauora-Regular.b0cb4241.ttf",revision:"b0cb4241"},{url:"/_next/static/media/dark.682493e2.png",revision:"682493e2"},{url:"/_next/static/media/white.ac9eb76b.png",revision:"ac9eb76b"},{url:"/dark.png",revision:"334d51a8cb1829b9ec7d76066eaea2e2"},{url:"/favicon.ico",revision:"46f8166f8a4c6a6fd33fdfa333c36177"},{url:"/fonts/FluentSystemIcons-Filled.ttf",revision:"f8fccaa06c212c7c31fc56bcf96017e6"},{url:"/fonts/FluentSystemIcons-Regular.ttf",revision:"0f7cbde6838ba772cd85a488e6cebd88"},{url:"/fonts/Hauora-ExtraBold.ttf",revision:"ac6cb6e7f3223ef711de688ac29c61d6"},{url:"/fonts/Hauora-Regular.ttf",revision:"18a69d21a23b14744cfe0b8960724df7"},{url:"/images/icons/icon-128x128.png",revision:"777fa31991ae68b4b6da2547ea765973"},{url:"/images/icons/icon-144x144.png",revision:"0ddb0e4f1cef853ef3f1e926578502b5"},{url:"/images/icons/icon-152x152.png",revision:"eba1e161ef014f900c852ad1cbad92f5"},{url:"/images/icons/icon-192x192.png",revision:"b04d6bbad1351a920c12c2ba4fb8c3e9"},{url:"/images/icons/icon-384x384.png",revision:"f616fa18bd1f358fa132ab12615b1bf7"},{url:"/images/icons/icon-512x512.png",revision:"863f1ad61e7d3125e89ffa6f171b52e6"},{url:"/images/icons/icon-72x72.png",revision:"f5b750198b56dcd39026c7a0a0607a83"},{url:"/images/icons/icon-96x96.png",revision:"44915e9e398cd20cedf717a2e1e82cb0"},{url:"/images/social.png",revision:"fa81d25a2676b9d9a22d107eb59cb193"},{url:"/manifest.json",revision:"e24ea0a2aa746d5ed10e9e353dbc3586"},{url:"/white.png",revision:"29b8ca7f6c41e9c278350ac42a87d0fc"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
