curl.config({
  baseUrl: './',
  apiName: 'require',
  packages: [
    { name: 'meld', location: 'node_modules/meld', main: 'meld' },
    { name: 'when', location: 'node_modules/when', main: 'when' },
    { name: 'curl', location: 'node_modules/curl/src/curl', main: 'curl' }
  ]
});
