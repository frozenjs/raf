(function(buster, global, define) {
  'use strict';

  define(function(require){
    var raf = require('../main');

    var when = require('when');

    buster.spec.expose();

    var expect = buster.expect;

    var noop = function(){};

    describe('raf', function(){

      it('should make available requestAnimationFrame and cancelAnimationFrame methods on global', function(){
        expect(global.requestAnimationFrame).toBeDefined();
        expect(global.requestAnimationFrame).toBeFunction();
        expect(global.cancelAnimationFrame).toBeDefined();
        expect(global.cancelAnimationFrame).toBeFunction();
      });

      describe('requestAnimationFrame', function(){

        it('should call the callback once with elapsed time', function(){
          this.timeout = 5000;
          var defer = when.defer();

          global.requestAnimationFrame(function(time){
            expect(time).toBeDefined();
            defer.resolve();
          });

          return defer.promise;
        });

        it('should return an id for the current call', function(){
          var id = global.requestAnimationFrame(noop);

          expect(id).toBeDefined();
        });

        it('should loop when called recursively', function(){
          var defer = when.defer();
          var loopCount = 0;

          var callback = this.spy(function(time){
            if(loopCount === 3){
              expect(callback).toHaveBeenCalledThrice();
              defer.resolve();
            } else {
              loop();
            }
          });

          function loop(){
            loopCount++;
            global.requestAnimationFrame(callback);
          }

          loop();

          return defer.promise;
        });

      });

      describe('cancelAnimationFrame', function(){

        it('should cancel the current requestAnimationFrame call', function(){
          var callback = this.spy();

          var id = global.requestAnimationFrame(callback);
          global.cancelAnimationFrame(id);

          expect(callback).not.toHaveBeenCalled();
        });

      });

    });

  });

})(
  this.buster || require('buster'),
  typeof global == 'object' ? global : this.window || this.global,
  typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(require); }
);
