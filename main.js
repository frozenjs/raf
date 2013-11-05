(function(global, define){
  'use strict';

  define(function(require){

    var now = require('./now');

    var lastTime = 0;
    var vendors = ['moz', 'webkit'];

    for(var x = 0; x < vendors.length && !global.requestAnimationFrame; ++x) {
      global.requestAnimationFrame = global[vendors[x]+'RequestAnimationFrame'];
      global.cancelAnimationFrame = global[vendors[x]+'CancelAnimationFrame'] || global[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!global.requestAnimationFrame){
      global.requestAnimationFrame = function(callback) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = global.setTimeout(function() { callback(now()); }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }

    if (!global.cancelAnimationFrame){
      global.cancelAnimationFrame = function(id) {
        global.clearTimeout(id);
      };
    }

  });

}(
  typeof global == 'object' ? global : this.window || this.global,
  typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(require); }
  // Boilerplate for AMD and Node
));
