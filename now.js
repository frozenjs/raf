(function(global, define){
  'use strict';

  define(function(require){

    // based on https://github.com/meryn/performance-now

    var loadTime;

    function getNanoSeconds(){
      var hr = global.process.hrtime();
      return hr[0] * 1e9 + hr[1];
    }

    if(global.performance && global.performance.now){
      return global.performance.now;
    }

    if(global.process && global.process.hrtime){
      loadTime = getNanoSeconds();
      return function(){
        return (getNanoSeconds() - loadTime) / 1e6;
      };
    }

    if(Date.now){
      loadTime = Date.now();
      return function(){
        return Date.now() - loadTime;
      };
    }

    loadTime = new Date().getTime();
    return function(){
      return new Date().getTime() - loadTime;
    };

  });

}(
  typeof global == 'object' ? global : this.window || this.global,
  typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(require); }
  // Boilerplate for AMD and Node
));
