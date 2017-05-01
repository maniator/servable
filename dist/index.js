(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Servable", [], factory);
	else if(typeof exports === 'object')
		exports["Servable"] = factory();
	else
		root["Servable"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Subscription; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Observable; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var noop = function noop() {};

var Subscription = function () {
  function Subscription(callback, observer) {
    _classCallCheck(this, Subscription);

    this.isComplete = false;
    this.dispose = noop;

    this.observer = this.wrapObserver(observer);

    this.callWithObserver(callback);
  }

  Subscription.prototype.unsubscribe = function unsubscribe() {
    var _this = this;

    this.catchErrors(function () {
      _this.dispose();

      _this.isComplete = true;
      _this.observer.next = noop;
      _this.observer.error = noop;
      _this.observer.complete = noop;
    })();
  };

  Subscription.prototype.catchErrors = function catchErrors(callback) {
    var _this2 = this;

    return function () {
      try {
        callback.apply(undefined, arguments);
      } catch (errors) {
        _this2.observer.error(errors);
      }
    };
  };

  Subscription.prototype.wrapObserver = function wrapObserver(observer) {
    var _this3 = this;

    var _observer$next = observer.next,
        next = _observer$next === undefined ? noop : _observer$next,
        _observer$error = observer.error,
        error = _observer$error === undefined ? noop : _observer$error,
        _observer$complete = observer.complete,
        complete = _observer$complete === undefined ? noop : _observer$complete;

    // assumes that an object was passed as first value to subscription

    if (next.next || next.error || next.complete) {
      return this.wrapObserver(next);
    }

    var returnObserver = {};

    returnObserver.next = this.catchErrors(function () {
      if (!_this3.isComplete) {
        next.apply(undefined, arguments);
      } else {
        // overwrite the next so it cannot run again if complete
        next = noop;
      }
    });

    returnObserver.error = this.catchErrors(function () {
      if (!_this3.isComplete) {
        error.apply(undefined, arguments);
      } else {
        // overwrite the error so it cannot run again if complete
        error = noop;
      }
    });

    returnObserver.complete = this.catchErrors(function () {
      if (!_this3.isComplete) {
        _this3.unsubscribe();
        complete();
      }

      // overwrite the complete so it doesnt run again
      complete = noop;
      _this3.isComplete = true;
    });

    return returnObserver;
  };

  Subscription.prototype.callWithObserver = function callWithObserver(callback) {
    var _this4 = this;

    this.catchErrors(function () {
      var response = callback(_this4.observer);

      if (typeof response === 'function') {
        _this4.dispose = response;
      }
    })();
  };

  return Subscription;
}();

var Observable = function () {
  function Observable(observerCallback) {
    _classCallCheck(this, Observable);

    this.observerCallback = observerCallback;
  }

  Observable.prototype.subscribe = function subscribe() {
    var next = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;
    var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    var complete = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;

    return new Subscription(this.observerCallback, { next: next, error: error, complete: complete });
  };

  return Observable;
}();

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__servable__ = __webpack_require__(0);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Subscription", function() { return __WEBPACK_IMPORTED_MODULE_0__servable__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Observable", function() { return __WEBPACK_IMPORTED_MODULE_0__servable__["b"]; });


/***/ })
/******/ ]);
});