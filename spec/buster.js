var config = exports;

config.base = {
  rootPath: '../',
  tests: [
    'spec/*-spec.js'
  ]
};

config.node = {
  extends: 'base',
  environment: 'node'
};

config.browser = {
  extends: 'base',
  environment: 'browser',
  extensions: [require('buster-amd')],
  libs: [
    'node_modules/curl/src/curl.js',
    'spec/curl-config.js'
  ],
  resources: [
    '*.js',
    'node_modules/when/**/*.js'
  ],
  tests: [
  ]
};
