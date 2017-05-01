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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Subscription__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Observable; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var noop = function noop() {};

var Observable = function () {
  function Observable(observerCallback) {
    _classCallCheck(this, Observable);

    this.observerCallback = observerCallback;
  }

  Observable.prototype.subscribe = function subscribe() {
    var next = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;
    var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    var complete = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;

    return new __WEBPACK_IMPORTED_MODULE_0__Subscription__["a" /* Subscription */](this.observerCallback, { next: next, error: error, complete: complete });
  };

  return Observable;
}();

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return passThroughNext; });


var noop = function noop() {};

var passThroughNext = function passThroughNext(source$, nextFunction) {
  var _this = this;

  var dispose = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;

  return new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */](function (observer) {
    var subscription = source$.subscribe({
      next: nextFunction.bind(_this, observer),
      error: observer.error,
      complete: observer.complete
    });

    return function () {
      dispose();

      subscription.unsubscribe();
    };
  });
};

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Subscription; });
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
      _this.dispose = noop;
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

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fromEvent; });


var fromEvent = function fromEvent(eventName, element) {
  return new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */](function (_ref) {
    var next = _ref.next;

    var listener = function listener(event) {
      next(event, element);
    };

    element.addEventListener(eventName, listener, false);

    return function () {
      element.removeEventListener(eventName, listener, false);
    };
  });
};

__WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */].fromEvent = fromEvent;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return interval; });


var interval = function interval(time) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var count = start;

  return new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */](function (_ref) {
    var next = _ref.next;

    var id = setInterval(function () {
      var nextNumber = count++;

      next(nextNumber);
    }, time);

    return function () {
      return clearInterval(id);
    };
  });
};

__WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */].interval = interval;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return range; });


var range = function range(start) {
  var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  // if no end is given assume start at 0 until start number
  if (!end) {
    end = start;
    start = 0;
  }

  return new __WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */](function (_ref) {
    var next = _ref.next,
        complete = _ref.complete;

    for (var current = start; current <= end; ++current) {
      next(current);
    }

    complete();
  });
};

__WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */].range = range;

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__passThroughNext__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return debounceTime; });



var debounceTime = function debounceTime(source$, time) {
  var timerId = void 0;

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__passThroughNext__["a" /* passThroughNext */])(source$, function (_ref) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var next = _ref.next;

    clearTimeout(timerId);
    timerId = setTimeout(function () {
      next.apply(undefined, args);
    }, time);
  }, function () {
    clearTimeout(timerId);
  });
};

__WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */].prototype.debounceTime = function (time) {
  return debounceTime(this, time);
};

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__passThroughNext__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return doStuff; });



var doStuff = function doStuff(source$, runCallback) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__passThroughNext__["a" /* passThroughNext */])(source$, function (_ref) {
    var next = _ref.next;

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    runCallback.apply(undefined, args);

    next.apply(undefined, args);
  });
};

__WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */].prototype.do = function (runCallback) {
  return doStuff(this, runCallback);
};

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__passThroughNext__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return filter; });



var filter = function filter(source$, mapCallback) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__passThroughNext__["a" /* passThroughNext */])(source$, function (_ref) {
    var next = _ref.next;

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (mapCallback.apply(undefined, args)) {
      next.apply(undefined, args);
    }
  });
};

__WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */].prototype.filter = function (filterCallback) {
  return filter(this, filterCallback);
};

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__passThroughNext__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return map; });



var map = function map(source$, mapCallback) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__passThroughNext__["a" /* passThroughNext */])(source$, function (_ref) {
    var next = _ref.next;

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    next(mapCallback.apply(undefined, args));
  });
};

__WEBPACK_IMPORTED_MODULE_0__Observable__["a" /* Observable */].prototype.map = function (mapCallback) {
  return map(this, mapCallback);
};

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Subscription__ = __webpack_require__(2);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Subscription", function() { return __WEBPACK_IMPORTED_MODULE_0__Subscription__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Observable__ = __webpack_require__(0);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Observable", function() { return __WEBPACK_IMPORTED_MODULE_1__Observable__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__operators_map__ = __webpack_require__(9);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "map", function() { return __WEBPACK_IMPORTED_MODULE_2__operators_map__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__operators_filter__ = __webpack_require__(8);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "filter", function() { return __WEBPACK_IMPORTED_MODULE_3__operators_filter__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__operators_do__ = __webpack_require__(7);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "doStuff", function() { return __WEBPACK_IMPORTED_MODULE_4__operators_do__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__operators_debounceTime__ = __webpack_require__(6);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "debounceTime", function() { return __WEBPACK_IMPORTED_MODULE_5__operators_debounceTime__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__observables_fromEvent__ = __webpack_require__(3);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "fromEvent", function() { return __WEBPACK_IMPORTED_MODULE_6__observables_fromEvent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__observables_range__ = __webpack_require__(5);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "range", function() { return __WEBPACK_IMPORTED_MODULE_7__observables_range__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__observables_interval__ = __webpack_require__(4);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "interval", function() { return __WEBPACK_IMPORTED_MODULE_8__observables_interval__["a"]; });



// add on operators





// add on observable types




/***/ })
/******/ ]);
});