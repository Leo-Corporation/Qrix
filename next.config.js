/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
const nextTranslate = require("next-translate-plugin");

module.exports = nextTranslate(nextConfig);
