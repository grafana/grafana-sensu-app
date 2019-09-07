define(["app/core/utils/kbn","app/plugins/sdk","lodash"], function(__WEBPACK_EXTERNAL_MODULE_grafana_app_core_utils_kbn__, __WEBPACK_EXTERNAL_MODULE_grafana_app_plugins_sdk__, __WEBPACK_EXTERNAL_MODULE_lodash__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./datasource/sensu-core/module.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/tslib/tslib.es6.js":
/*!******************************************!*\
  !*** ../node_modules/tslib/tslib.es6.js ***!
  \******************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),

/***/ "./datasource/sensu-core/api/aggregate_converters.ts":
/*!***********************************************************!*\
  !*** ./datasource/sensu-core/api/aggregate_converters.ts ***!
  \***********************************************************/
/*! exports provided: convertAggregatesToDataPoints, convertEventDataToAggregateModeResults, convertEventDataToAggregateModeChecks, convertEventDataToAggregateModeClient, convertEventDataToAggregateModeList, convertToAggregateModeClientJSON, convertAggregatesToJSON */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertAggregatesToDataPoints", function() { return convertAggregatesToDataPoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertEventDataToAggregateModeResults", function() { return convertEventDataToAggregateModeResults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertEventDataToAggregateModeChecks", function() { return convertEventDataToAggregateModeChecks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertEventDataToAggregateModeClient", function() { return convertEventDataToAggregateModeClient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertEventDataToAggregateModeList", function() { return convertEventDataToAggregateModeList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertToAggregateModeClientJSON", function() { return convertToAggregateModeClientJSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertAggregatesToJSON", function() { return convertAggregatesToJSON; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./datasource/sensu-core/api/utils.ts");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



function convertAggregatesToDataPoints(aTarget, responses) {
  var response = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getResponseForTarget"])(aTarget, responses);

  if (response.data.length === undefined) {
    var singleData = response.data;
    response.data = [];
    response.data.push(singleData);
  }

  var newData = null;

  for (var i = 0; i < response.data.length; i++) {
    var anAggregate = response.data[i];

    if (anAggregate.checks !== undefined) {
      var checkType = _typeof(anAggregate.checks);

      switch (checkType) {
        case 'number':
          newData = convertEventDataToAggregateModeList(anAggregate, newData);
          break;

        case 'object':
          newData = convertEventDataToAggregateModeClient(anAggregate, newData);
          break;
      }

      continue;
    }

    if (anAggregate.clients !== undefined) {
      newData = convertEventDataToAggregateModeChecks(anAggregate, newData);
      continue;
    }

    if (anAggregate.summary !== undefined) {
      newData = convertEventDataToAggregateModeResults(anAggregate, newData);
      continue;
    }

    var datapoints = [];
    var timestamp = Math.floor(Date.now());
    datapoints[0] = [0, timestamp];
    anAggregate.datapoints = datapoints;
    anAggregate.target = anAggregate.name;
  }

  if (newData !== null) {
    response.data = newData;
  }

  return response;
}

function convertEventDataToAggregateModeResults(anEvent, dataSet) {
  var timestamp = Math.floor(Date.now());

  if (dataSet === null) {
    dataSet = [];
  }

  for (var i = 0; i < anEvent.summary.length; i++) {
    var aSummary = anEvent.summary[i];
    var checkData = {
      target: anEvent.check,
      clients: aSummary.clients,
      datapoints: [[aSummary.total, timestamp]]
    };
    dataSet.push(checkData);
  }

  return dataSet;
}

function convertEventDataToAggregateModeChecks(anEvent, dataSet) {
  var timestamp = Math.floor(Date.now());

  if (dataSet === null) {
    dataSet = [];
  }

  for (var i = 0; i < anEvent.clients.length; i++) {
    var clientName = anEvent.clients[i];
    var checkData = {
      target: anEvent.name,
      datapoints: [[clientName, timestamp]]
    };
    dataSet.push(checkData);
  }

  return dataSet;
}

function convertEventDataToAggregateModeClient(anEvent, dataSet) {
  var timestamp = Math.floor(Date.now());

  if (dataSet === null) {
    dataSet = [];
  }

  for (var i = 0; i < anEvent.checks.length; i++) {
    var checkName = anEvent.checks[i];
    var clientData = {
      target: anEvent.name,
      datapoints: [[checkName, timestamp]]
    };
    dataSet.push(clientData);
  }

  return dataSet;
}

function convertEventDataToAggregateModeList(anEvent, dataSet) {
  if (dataSet === null) {
    dataSet = [];
  }

  var timestamp = Math.floor(Date.now());
  var item = {
    target: 'checks',
    datapoints: [[anEvent.checks, timestamp]]
  };
  dataSet.push(item);
  item = {
    target: 'clients',
    datapoints: [[anEvent.clients, timestamp]]
  };
  dataSet.push(item);
  item = {
    target: 'critical',
    datapoints: [[anEvent.results.critical, timestamp]]
  };
  dataSet.push(item);
  item = {
    target: 'ok',
    datapoints: [[anEvent.results.ok, timestamp]]
  };
  dataSet.push(item);
  item = {
    target: 'stale',
    datapoints: [[anEvent.results.stale, timestamp]]
  };
  dataSet.push(item);
  item = {
    target: 'total',
    datapoints: [[anEvent.results.total, timestamp]]
  };
  dataSet.push(item);
  item = {
    target: 'unknown',
    datapoints: [[anEvent.results.unknown, timestamp]]
  };
  dataSet.push(item);
  item = {
    target: 'warning',
    datapoints: [[anEvent.results.warning, timestamp]]
  };
  dataSet.push(item);
  return dataSet;
}

function convertToAggregateModeClientJSON(data, dataSet) {
  var timestamp = Math.floor(Date.now());

  if (dataSet === null) {
    dataSet = [];
  }

  for (var i = 0; i < data.checks.length; i++) {
    var checkName = data.checks[i];
    var clientData = {
      target: data.name,
      datapoints: [[checkName, timestamp]]
    };
    dataSet.push(clientData);
  }

  return dataSet;
}

function convertAggregatesToJSON(aTarget, responses) {
  var response = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getResponseForTarget"])(aTarget, responses);
  var aggregateName = 'ALL';

  if (aTarget.dimensions.length > 0) {
    aggregateName = aTarget.dimensions[0].value;
  }

  for (var i = 0; i < response.data.length; i++) {
    var item = response.data[i];
    var datapoints = [];
    var data = {
      client: item.name,
      checks: item.checks,
      aggregate_name: aggregateName
    };
    datapoints.push(data);
    item.datapoints = datapoints;
    item.type = 'docs';
  }

  return response;
}



/***/ }),

/***/ "./datasource/sensu-core/api/aggregate_requests.ts":
/*!*********************************************************!*\
  !*** ./datasource/sensu-core/api/aggregate_requests.ts ***!
  \*********************************************************/
/*! exports provided: getAggregateURIs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAggregateURIs", function() { return getAggregateURIs; });
function getAggregateURIs(target, aggregateNames) {
  var uris = [];
  var dimensionURI = '/aggregates';
  var anAggregateName = null;

  if (aggregateNames.length) {
    for (var i = 0; i < aggregateNames.length; i++) {
      anAggregateName = aggregateNames[i];
      dimensionURI = '/aggregates/' + anAggregateName;

      switch (target.aggregateMode) {
        case 'checks':
          dimensionURI = '/aggregates/' + anAggregateName + '/checks';
          break;

        case 'clients':
          dimensionURI = '/aggregates/' + anAggregateName + '/clients';
          break;

        case 'list':
          dimensionURI = '/aggregates/' + anAggregateName;
          break;

        case 'results_critical':
          dimensionURI = '/aggregates/' + anAggregateName + '/results/critical';
          break;

        case 'results_ok':
          dimensionURI = '/aggregates/' + anAggregateName + '/results/ok';
          break;

        case 'results_unknown':
          dimensionURI = '/aggregates/' + anAggregateName + '/results/unknown';
          break;

        case 'results_warning':
          dimensionURI = '/aggregates/' + anAggregateName + '/results/warning';
          break;
      }

      uris.push(dimensionURI);
    }
  }

  if (uris.length === 0) {
    uris.push(dimensionURI);
  }

  return uris;
}



/***/ }),

/***/ "./datasource/sensu-core/api/client_converters.ts":
/*!********************************************************!*\
  !*** ./datasource/sensu-core/api/client_converters.ts ***!
  \********************************************************/
/*! exports provided: convertClientsToDataPoints, convertClientsToJSON, convertClientHistoryToDataPoints, convertClientSummaryMetricsToJSON, convertClientHealthToJSON, convertClientHealthMetricsToJSON */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertClientsToDataPoints", function() { return convertClientsToDataPoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertClientsToJSON", function() { return convertClientsToJSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertClientHistoryToDataPoints", function() { return convertClientHistoryToDataPoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertClientSummaryMetricsToJSON", function() { return convertClientSummaryMetricsToJSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertClientHealthToJSON", function() { return convertClientHealthToJSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertClientHealthMetricsToJSON", function() { return convertClientHealthMetricsToJSON; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./datasource/sensu-core/api/utils.ts");
/* harmony import */ var _client_filters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./client_filters */ "./datasource/sensu-core/api/client_filters.ts");



function convertClientsToDataPoints(aTarget, responses) {
  var response = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getResponseForTarget"])(aTarget, responses);

  if (response.data.length === undefined) {
    var singleData = response.data;
    response.data = [];
    response.data.push(singleData);
  }

  switch (aTarget.clientQueryMode) {
    case 'list':
      var filterData = [];
      var arrClientNames = [];

      if (aTarget.filters !== undefined && aTarget.filters.length > 0) {
        arrClientNames = Object(_client_filters__WEBPACK_IMPORTED_MODULE_1__["getClientsWithFilter"])(aTarget, response);

        for (var i = 0; i < response.data.length; i++) {
          if (arrClientNames.indexOf(response.data[i].name) >= 0) {
            filterData.push(response.data[i]);
          }
        }

        response.data = filterData;
      }

      for (var i = 0; i < response.data.length; i++) {
        var data = response.data[i];
        var datapoints = [];

        if (data.timestamp !== undefined) {
          datapoints[0] = [1, data.timestamp * 1000];
        }

        data.datapoints = datapoints;
        data.target = data.name;
      }

      break;

    case 'count':
      if (response.data.length > 0) {
        var data = response.data[0];
        var datapoints = [];
        var clientCount = 0;
        var arrClientNames_1 = [];

        if (aTarget.filters !== undefined && aTarget.filters.length > 0) {
          arrClientNames_1 = Object(_client_filters__WEBPACK_IMPORTED_MODULE_1__["getClientsWithFilter"])(aTarget, response);
          clientCount = arrClientNames_1.length;
        } else {
          clientCount = response.data.length;
        }

        if (data.timestamp !== undefined) {
          datapoints[0] = [clientCount, data.timestamp * 1000];
        }

        data.datapoints = datapoints;
        data.address = undefined;
        data.name = undefined;
        data.socket = undefined;
        data.subscriptions = undefined;
        data.version = undefined;
        data.target = 'ClientCount';

        if (aTarget.aliasReplaced) {
          data.target = aTarget.aliasReplaced;
        }

        response.data = [data];
      }

      break;
  }

  return response;
}

function convertClientsToJSON(aTarget, responses) {
  var response = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getResponseForTarget"])(aTarget, responses);

  if (response.data.length === undefined) {
    var data = response.data;
    response.data = [];
    response.data.push(data);
  }

  var newData = [];

  for (var i = 0; i < response.data.length; i++) {
    var pushItem = true;
    var item = JSON.parse(JSON.stringify(response.data[i]));
    item.datapoints = [];
    item.type = 'docs';
    var address = item.address;

    if (item.address === 'unknown') {
      item.address = 'JIT Client';
    }

    if (aTarget.filters !== undefined) {
      if (aTarget.filters.length !== undefined) {
        for (var j = 0; j < aTarget.filters.length; j++) {
          var aFilter = aTarget.filters[j];

          switch (aFilter.filterType) {
            case 'regex':
              try {
                var flags = aFilter.filterRegexFlags;
                var re = new RegExp(aFilter.filterRegex, flags);

                if (re.test(item.name)) {
                  aFilter.filterMessage = 'OK';
                } else {
                  pushItem = false;
                }
              } catch (err) {
                aFilter.filterMessage = 'Invalid Regular Expression';
                break;
              }

              break;

            case 'field':
              if (item.hasOwnProperty(aFilter.filterFieldName)) {
                var fieldVal = item[aFilter.filterFieldName];

                if (fieldVal !== aFilter.filterFieldValueReplaced) {
                  pushItem = false;
                }
              } else {
                pushItem = false;
              }

              break;
          }
        }
      }
    }

    if (pushItem) {
      var entry = {
        type: 'docs',
        datapoints: [item]
      };
      newData.push(entry);
    }
  }

  response.data = newData;
  return response;
}

function convertClientHistoryToDataPoints(aTarget, responses) {
  var response = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getResponseForTarget"])(aTarget, responses);

  for (var i = 0; i < response.data.length; i++) {
    var anEvent = response.data[i];
    var datapoints = [];
    var startingTimestamp = 0;

    if (anEvent.last_execution !== undefined) {
      startingTimestamp = anEvent.last_execution - 60 * anEvent.history.length;
    }

    if (anEvent.history !== undefined) {
      for (var y = 0; y < anEvent.history.length; y++) {
        datapoints[y] = [anEvent.history[y], (startingTimestamp + 60 * y) * 1000];
      }
    }

    anEvent.datapoints = datapoints;
    anEvent.target = 'unknown';

    if (anEvent.name !== undefined) {
      anEvent.target = anEvent.name;
    }

    if (anEvent.check !== undefined) {
      anEvent.target = anEvent.check;
    }
  }

  return response;
}

function convertClientSummaryMetricsToJSON(aTarget, responses) {
  var response = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getResponseForTarget"])(aTarget, responses);
}

function convertClientHealthToJSON(aTarget, responses) {
  var response = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getResponseForTarget"])(aTarget, responses);
  var filteredData = [];

  for (var i = 0; i < response.data.length; i++) {
    var anEvent = response.data[i];
    var datapoints = [];

    if (anEvent.check.issued !== undefined) {
      var data = {
        timestamp: anEvent.check.issued * 1000,
        check_name: anEvent.check.name,
        client: anEvent.client,
        check: anEvent.check,
        occurrences: anEvent.occurrences,
        occurrences_watermark: anEvent.occurrences_watermark,
        action: anEvent.action,
        id: anEvent.id,
        last_state_change: anEvent.last_state_change * 1000,
        last_ok: anEvent.last_ok * 1000,
        silenced: anEvent.silenced,
        silenced_by: anEvent.silenced_by
      };

      try {
        data.check.issued = data.check.issued * 1000;
        data.check.executed = data.check.executed * 1000;
      } catch (err) {}

      datapoints.push(data);
      anEvent.datapoints = datapoints;
      delete anEvent.check;
      delete anEvent.client;
      anEvent.type = 'docs';

      if (!anEvent.silenced) {
        filteredData.push(anEvent);
      }

      if (anEvent.silenced && !aTarget.hideSilencedEvents) {
        filteredData.push(anEvent);
      }
    }
  }

  response.data = filteredData;
  return response;
}

function convertClientHealthMetricsToJSON(aTarget, responses) {
  var response = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getResponseForTarget"])(aTarget, responses);
}



/***/ }),

/***/ "./datasource/sensu-core/api/client_filters.ts":
/*!*****************************************************!*\
  !*** ./datasource/sensu-core/api/client_filters.ts ***!
  \*****************************************************/
/*! exports provided: getClientsWithFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClientsWithFilter", function() { return getClientsWithFilter; });
function getClientsWithFilter(aTarget, response) {
  var arrClientNames = [];

  for (var i = 0; i < aTarget.filters.length; i++) {
    var aFilter = aTarget.filters[i];

    switch (aFilter.filterType) {
      case 'field':
        for (var j = 0; j < response.data.length; j++) {
          if (response.data[j].hasOwnProperty(aFilter.filterFieldName)) {
            var fieldVal = response.data[j][aFilter.filterFieldName];

            if (fieldVal === aFilter.filterFieldValueReplaced) {
              if (arrClientNames.indexOf(response.data[j].name) === -1) {
                arrClientNames.push(response.data[j].name);
              }
            }
          }
        }

        break;

      case 'fetch':
        for (var j = 0; j < response.data.length; j++) {
          if (aFilter.value === response.data[j].name) {
            if (arrClientNames.indexOf(response.data[j].name) === -1) {
              arrClientNames.push(response.data[j].name);
            }
          }
        }

        break;

      case 'regex':
        try {
          var flags = aFilter.filterRegexFlags;
          var re = new RegExp(aFilter.filterRegex, flags);

          for (var j = 0; j < response.data.length; j++) {
            if (re.test(response.data[j].name)) {
              if (arrClientNames.indexOf(response.data[j].name) === -1) {
                arrClientNames.push(response.data[j].name);
              }
            }
          }
        } catch (err) {
          aFilter.filterMessage = 'Invalid Regular Expression';
        }

        break;
    }
  }

  return arrClientNames;
}



/***/ }),

/***/ "./datasource/sensu-core/api/client_requests.ts":
/*!******************************************************!*\
  !*** ./datasource/sensu-core/api/client_requests.ts ***!
  \******************************************************/
/*! exports provided: getClientsURIs, getClientHealthURIs, getClientHistoryURIs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClientsURIs", function() { return getClientsURIs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClientHealthURIs", function() { return getClientHealthURIs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClientHistoryURIs", function() { return getClientHistoryURIs; });
function getClientsURIs(checkNames, clientNames) {
  var uris = [];
  var dimensionURI = '/clients';

  if (clientNames.length) {
    for (var i = 0; i < clientNames.length; i++) {
      var aClientName = clientNames[i];
      dimensionURI = '/clients/' + aClientName;
      uris.push(dimensionURI);
    }
  }

  if (uris.length === 0) {
    uris.push(dimensionURI);
  }

  uris.push('/events');
  uris.push('/results');
  return uris;
}

function getClientHealthURIs(clientNames) {
  var uris = [];

  if (clientNames.length) {
    for (var i = 0; i < clientNames.length; i++) {
      var aClientName = clientNames[i];
      var resultsURI = '/results/' + aClientName;
      uris.push(resultsURI);
      var eventsURI = '/events/' + aClientName;
      uris.push(eventsURI);
    }
  }

  if (uris.length === 0) {
    uris.push('/results');
    uris.push('/events');
  }

  return uris;
}

function getClientHistoryURIs(clientNames) {
  var uris = [];
  var dimensionURI = '/clients';

  if (clientNames.length) {
    for (var i = 0; i < clientNames.length; i++) {
      var aClientName = clientNames[i];
      dimensionURI = '/clients/' + aClientName + '/history';
      uris.push(dimensionURI);
    }
  }

  if (uris.length === 0) {
    uris.push(dimensionURI);
  }

  return uris;
}



/***/ }),

/***/ "./datasource/sensu-core/api/event_converters.ts":
/*!*******************************************************!*\
  !*** ./datasource/sensu-core/api/event_converters.ts ***!
  \*******************************************************/
/*! exports provided: convertEventsToJSON, convertEventsToDataPoints, convertEventsToEventMetrics, convertEventsToEventMetricsJSON */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertEventsToJSON", function() { return convertEventsToJSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertEventsToDataPoints", function() { return convertEventsToDataPoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertEventsToEventMetrics", function() { return convertEventsToEventMetrics; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertEventsToEventMetricsJSON", function() { return convertEventsToEventMetricsJSON; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./datasource/sensu-core/api/utils.ts");
/* harmony import */ var _event_filters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./event_filters */ "./datasource/sensu-core/api/event_filters.ts");



function convertEventsToDataPoints(aTarget, responses) {
  var response = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getResponseForTarget"])(aTarget, responses);

  if (response.data.length === undefined) {
    var singleData = response.data;
    response.data = [];
    response.data.push(singleData);
  }

  var filteredData = [];

  for (var i = 0; i < response.data.length; i++) {
    var anEvent = response.data[i];
    var datapoints = [];
    var startingTimestamp = 0;

    if (anEvent.timestamp !== undefined) {
      startingTimestamp = anEvent.timestamp - 60 * anEvent.check.history.length;
    }

    if (anEvent.last_execution !== undefined) {
      startingTimestamp = anEvent.last_execution - 60 * anEvent.history.length;
    }

    for (var y = 0; y < anEvent.check.history.length; y++) {
      datapoints[y] = [anEvent.check.history[y], (startingTimestamp + 60 * y) * 1000];
    }

    anEvent.datapoints = datapoints;
    anEvent.target = anEvent.client.name;
    anEvent.clientName = anEvent.client.name;

    if (Object(_event_filters__WEBPACK_IMPORTED_MODULE_1__["includeEventTarget"])(aTarget, anEvent)) {
      if (!anEvent.silenced) {
        filteredData.push(anEvent);
      }

      if (anEvent.silenced && !aTarget.hideSilencedEvents) {
        filteredData.push(anEvent);
      }
    }
  }

  var newResponse = {
    data: filteredData
  };
  return newResponse;
}

function convertEventsToJSON(aTarget, responses) {
  var response = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getResponseForTarget"])(aTarget, responses);
  var filteredData = [];

  for (var i = 0; i < response.data.length; i++) {
    var anEvent = response.data[i];
    var datapoints = [];

    if (anEvent.check.issued !== undefined && Object(_event_filters__WEBPACK_IMPORTED_MODULE_1__["includeEventTarget"])(aTarget, anEvent)) {
      var clientShortname = anEvent.client.name;
      var parts = anEvent.client.name.split('.');

      if (parts.length > 0) {
        clientShortname = parts[0];
      }

      anEvent.client.client_short_name = clientShortname;
      var statusText = 'UNKNOWN';

      if (anEvent.check !== undefined && anEvent.check.status !== undefined) {
        switch (anEvent.check.status) {
          case 0:
            statusText = 'OK';
            break;

          case 1:
            statusText = 'WARNING';
            break;

          case 2:
            statusText = 'CRITICAL';
            break;

          case 3:
            statusText = 'UNKNOWN';
            break;

          default:
            statusText = 'UNKNOWN';
            break;
        }
      }

      anEvent.check.status_text = statusText;
      var data = {
        timestamp: anEvent.check.issued * 1000,
        check_name: anEvent.check.name,
        client: anEvent.client,
        check: anEvent.check,
        occurrences: anEvent.occurrences,
        occurrences_watermark: anEvent.occurrences_watermark,
        action: anEvent.action,
        id: anEvent.id,
        last_state_change: anEvent.last_state_change * 1000,
        last_ok: anEvent.last_ok * 1000,
        silenced: anEvent.silenced,
        silenced_by: anEvent.silenced_by
      };

      try {
        data.check.issued = data.check.issued * 1000;
        data.check.executed = data.check.executed * 1000;
      } catch (err) {}

      datapoints.push(data);
      anEvent.datapoints = datapoints;
      delete anEvent.check;
      delete anEvent.client;
      anEvent.type = 'docs';

      if (!anEvent.silenced) {
        filteredData.push(anEvent);
      }

      if (anEvent.silenced && !aTarget.hideSilencedEvents) {
        filteredData.push(anEvent);
      }
    }
  }

  var newResponse = {
    data: filteredData
  };
  return newResponse;
}

function convertEventsToEventMetricsJSON(aTarget, responses) {
  var response = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getResponseForTarget"])(aTarget, responses);
  var timestamp = 0;

  try {
    timestamp = response.data[0].check.issued * 1000;
  } catch (err) {}

  var eventMetrics = {
    target: 'allEvents',
    timestamp: timestamp,
    numEvents: 0,
    numSilenced: 0,
    numClientsSilenced: 0,
    numChecksSilenced: 0,
    numWarningEvents: 0,
    numWarningEventsSilenced: 0,
    numCriticalEvents: 0,
    numCriticalEventsSilenced: 0,
    numUnknownEvents: 0,
    numUnknownEventsSilenced: 0
  };
  var clientNames = [];
  var checkNames = [];

  for (var i = 0; i < response.data.length; i++) {
    var anEvent = response.data[i];

    if (anEvent.check.issued !== undefined) {
      if (anEvent.check !== undefined && anEvent.check.status !== undefined && Object(_event_filters__WEBPACK_IMPORTED_MODULE_1__["includeEventTarget"])(aTarget, anEvent)) {
        eventMetrics.numEvents += 1;

        switch (anEvent.check.status) {
          case 1:
            eventMetrics.numWarningEvents += 1;

            if (anEvent.silenced) {
              eventMetrics.numWarningEventsSilenced += 1;
              eventMetrics.numSilenced += 1;
            }

            break;

          case 2:
            eventMetrics.numCriticalEvents += 1;

            if (anEvent.silenced) {
              eventMetrics.numCriticalEventsSilenced += 1;
              eventMetrics.numSilenced += 1;
            }

            break;

          default:
            eventMetrics.numUnknownEvents += 1;

            if (anEvent.silenced) {
              eventMetrics.numUnknownEventsSilenced += 1;
              eventMetrics.numSilenced += 1;
            }

            break;
        }
      }

      if (clientNames.indexOf(anEvent.client.name) < 0) {
        clientNames.push(anEvent.client.name);
      }

      if (checkNames.indexOf(anEvent.check.name) < 0) {
        checkNames.push(anEvent.check.name);
      }

      for (var i_1 = 0; i_1 < anEvent.silenced_by.length; i_1++) {
        if (anEvent.silenced_by[i_1].indexOf('*') >= 0) {
          eventMetrics.numClientsSilenced += 1;
        } else {
          eventMetrics.numChecksSilenced += 1;
        }
      }
    }
  }

  eventMetrics.numClientsSilenced = clientNames.length;
  eventMetrics.numChecksSilenced = checkNames.length;
  response.data = [{
    target: 'allEvents',
    timestamp: timestamp,
    type: 'docs',
    datapoints: [eventMetrics]
  }];
  return response;
}

function convertEventsToEventMetrics(aTarget, responses) {
  var response = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getResponseForTarget"])(aTarget, responses);
  var newResponse = {
    data: []
  };
  var timestamp = 0;

  try {
    timestamp = response.data[0].check.issued * 1000;
  } catch (err) {}

  var eventMetrics = {
    target: 'allEvents',
    timestamp: timestamp,
    numEvents: 0.0,
    numSilenced: 0.0,
    numClientsSilenced: 0.0,
    numChecksSilenced: 0.0,
    numWarningEvents: 0.0,
    numWarningEventsSilenced: 0.0,
    numCriticalEvents: 0.0,
    numCriticalEventsSilenced: 0.0,
    numUnknownEvents: 0.0,
    numUnknownEventsSilenced: 0.0
  };
  var clientNames = [];
  var checkNames = [];

  for (var i = 0; i < response.data.length; i++) {
    var anEvent = response.data[i];

    if (anEvent.check.issued !== undefined) {
      if (anEvent.check !== undefined && anEvent.check.status !== undefined && Object(_event_filters__WEBPACK_IMPORTED_MODULE_1__["includeEventTarget"])(aTarget, anEvent)) {
        eventMetrics.numEvents += 1.0;

        switch (anEvent.check.status) {
          case 1:
            eventMetrics.numWarningEvents += 1.0;

            if (anEvent.silenced) {
              eventMetrics.numWarningEventsSilenced += 1.0;
              eventMetrics.numSilenced += 1.0;
            }

            break;

          case 2:
            eventMetrics.numCriticalEvents += 1.0;

            if (anEvent.silenced) {
              eventMetrics.numCriticalEventsSilenced += 1.0;
              eventMetrics.numSilenced += 1.0;
            }

            break;

          default:
            eventMetrics.numUnknownEvents += 1.0;

            if (anEvent.silenced) {
              eventMetrics.numUnknownEventsSilenced += 1.0;
              eventMetrics.numSilenced += 1.0;
            }

            break;
        }
      }

      if (clientNames.indexOf(anEvent.client.name) < 1.0) {
        clientNames.push(anEvent.client.name);
      }

      if (checkNames.indexOf(anEvent.check.name) < 1.0) {
        checkNames.push(anEvent.check.name);
      }

      for (var i_2 = 0; i_2 < anEvent.silenced_by.length; i_2++) {
        if (anEvent.silenced_by[i_2].indexOf('*') >= 0) {
          eventMetrics.numClientsSilenced += 1.0;
        } else {
          eventMetrics.numChecksSilenced += 1.0;
        }
      }
    }
  }

  var targetName = null;

  if (aTarget.name !== undefined) {
    targetName = aTarget.name;
  }

  if (aTarget.aliasReplaced !== undefined) {
    targetName = aTarget.aliasReplaced;
  }

  newResponse.data = [{
    target: targetName,
    datapoints: [[0.0, timestamp]]
  }];

  switch (aTarget.eventMetricMode) {
    case 'all_events_count':
      if (targetName === null) {
        newResponse.data[0].target = 'all_events_count';
      }

      newResponse.data[0].datapoints = [[eventMetrics.numEvents, timestamp]];
      break;

    case 'active_events_count':
      if (targetName === null) {
        newResponse.data[0].target = 'active_events_count';
      }

      newResponse.data[0].datapoints = [[eventMetrics.numEvents - eventMetrics.numSilenced, timestamp]];
      break;

    case 'critical_count':
      if (targetName === null) {
        newResponse.data[0].target = 'critical_events_count';
      }

      newResponse.data[0].datapoints = [[eventMetrics.numCriticalEvents, timestamp]];
      break;

    case 'critical_active_count':
      if (targetName === null) {
        newResponse.data[0].target = 'critical_active_count';
      }

      newResponse.data[0].datapoints = [[eventMetrics.numCriticalEvents - eventMetrics.numCriticalEventsSilenced, timestamp]];
      break;

    case 'critical_silenced_count':
      if (targetName === null) {
        newResponse.data[0].target = 'critical_silenced_count';
      }

      newResponse.data[0].datapoints = [[eventMetrics.numCriticalEventsSilenced, timestamp]];
      break;

    case 'warning_count':
      if (targetName === null) {
        newResponse.data[0].target = 'warning_events_count';
      }

      newResponse.data[0].datapoints = [[eventMetrics.numWarningEvents, timestamp]];
      break;

    case 'warning_active_count':
      if (targetName === null) {
        newResponse.data[0].target = 'warning_active_count';
      }

      newResponse.data[0].datapoints = [[eventMetrics.numWarningEvents - eventMetrics.numWarningEventsSilenced, timestamp]];
      break;

    case 'warning_silenced_count':
      if (targetName === null) {
        newResponse.data[0].target = 'warning_silenced_count';
      }

      newResponse.data[0].datapoints = [[eventMetrics.numWarningEventsSilenced, timestamp]];
      break;

    case 'unknown_count':
      if (targetName === null) {
        newResponse.data[0].target = 'unknown_events_count';
      }

      newResponse.data[0].datapoints = [[eventMetrics.numUnknownEvents, timestamp]];
      break;

    case 'unknown_active_count':
      if (targetName === null) {
        newResponse.data[0].target = 'unknown_active_count';
      }

      newResponse.data[0].datapoints = [[eventMetrics.numUnknownEvents - eventMetrics.numUnknownEventsSilenced, timestamp]];
      break;

    case 'unknown_silenced_count':
      if (targetName === null) {
        newResponse.data[0].target = 'unknown_silenced_count';
      }

      newResponse.data[0].datapoints = [[eventMetrics.numUnknownEventsSilenced, timestamp]];
      break;

    case 'silenced_count':
      if (targetName === null) {
        newResponse.data[0].target = 'silenced_events_count';
      }

      newResponse.data[0].datapoints = [[eventMetrics.numSilenced, timestamp]];
      break;

    case 'clients_silenced_count':
      if (targetName === null) {
        newResponse.data[0].target = 'clients_silenced_count';
      }

      newResponse.data[0].datapoints = [[eventMetrics.numClientsSilenced, timestamp]];
      break;

    case 'checks_silenced_count':
      if (targetName === null) {
        newResponse.data[0].target = 'checks_silenced_count';
      }

      newResponse.data[0].datapoints = [[eventMetrics.numChecksSilenced, timestamp]];
      break;

    default:
      if (targetName === null) {
        newResponse.data[0].target = 'all_events_count';
      }

      newResponse.data[0].datapoints = [[eventMetrics.numEvents, timestamp]];
      break;
  }

  return newResponse;
}



/***/ }),

/***/ "./datasource/sensu-core/api/event_filters.ts":
/*!****************************************************!*\
  !*** ./datasource/sensu-core/api/event_filters.ts ***!
  \****************************************************/
/*! exports provided: includeEventTarget */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "includeEventTarget", function() { return includeEventTarget; });
function includeEventTarget(target, anEvent) {
  if (target.filters === undefined) {
    return true;
  }

  if (target.filters.length === 0) {
    return true;
  }

  for (var i = 0; i < target.filters.length; i++) {
    var aFilter = target.filters[i];

    switch (aFilter.filterType) {
      case 'field':
        if (anEvent.client.hasOwnProperty(aFilter.filterFieldName)) {
          var aVal = anEvent.client[aFilter.filterFieldName];

          if (aVal === aFilter.filterFieldValueReplaced) {
            return true;
          }
        }

        break;
    }
  }

  return false;
}



/***/ }),

/***/ "./datasource/sensu-core/api/event_requests.ts":
/*!*****************************************************!*\
  !*** ./datasource/sensu-core/api/event_requests.ts ***!
  \*****************************************************/
/*! exports provided: getEventsURIs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEventsURIs", function() { return getEventsURIs; });
function getEventsURIs(checkNames, clientNames) {
  var uris = [];
  var dimensionURI = '/events';
  var aClientName = null;
  var aCheckName = null;
  var anAggregateName = null;

  if (clientNames.length) {
    for (var i = 0; i < clientNames.length; i++) {
      aClientName = clientNames[i];
      dimensionURI = '/events/' + aClientName;
      uris.push(dimensionURI);
    }
  }

  if (checkNames.length && clientNames.length) {
    for (var i = 0; i < clientNames.length; i++) {
      aClientName = clientNames[i];

      for (var j = 0; j < checkNames.length; j++) {
        aCheckName = checkNames[i];
        dimensionURI = '/events/' + aClientName + '/' + aCheckName;
        uris.push(dimensionURI);
      }
    }
  }

  if (uris.length === 0) {
    uris.push(dimensionURI);
  }

  return uris;
}



/***/ }),

/***/ "./datasource/sensu-core/api/result_converters.ts":
/*!********************************************************!*\
  !*** ./datasource/sensu-core/api/result_converters.ts ***!
  \********************************************************/
/*! exports provided: convertResultsToTable, convertResultsToDataPoints, convertResultsToJSON */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertResultsToTable", function() { return convertResultsToTable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertResultsToDataPoints", function() { return convertResultsToDataPoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertResultsToJSON", function() { return convertResultsToJSON; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./datasource/sensu-core/api/utils.ts");


function convertResultsToTable(aTarget, responses) {
  var response = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getResponseForTarget"])(aTarget, responses);

  if (response.data.length === undefined) {
    var singleData = response.data;
    response.data = [];
    response.data.push(singleData);
  }

  var rowData = [];

  for (var i = 0; i < response.data.length; i++) {
    var rowInfo = response.data[i];
    var aRow = [rowInfo.check.issued * 1000, rowInfo.client, rowInfo.check.name, rowInfo.check.status, rowInfo.check.issued * 1000, rowInfo.check.executed * 1000, rowInfo.check.output, rowInfo.check.type, rowInfo.check.thresholds.warning, rowInfo.check.thresholds.critical];
    rowData.push(aRow);
  }

  var anEvent = response.data[0];
  var datapoints = [];
  datapoints[0] = [anEvent.check.status, anEvent.check.issued * 1000];
  anEvent.datapoints = datapoints;
  anEvent.type = 'table';
  anEvent.columns = [{
    text: 'Time',
    type: 'date'
  }, {
    text: 'client'
  }, {
    text: 'check.name'
  }, {
    text: 'check.status'
  }, {
    text: 'check.issued',
    type: 'date'
  }, {
    text: 'check.executed',
    type: 'date'
  }, {
    text: 'check.output'
  }, {
    text: 'check.type'
  }, {
    text: 'check.thresholds.warning'
  }, {
    text: 'check.thresholds.critical'
  }];
  anEvent.rows = rowData;
  response.data = [anEvent];
  return response;
}

function convertResultsToJSON(aTarget, responses) {
  var response = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getResponseForTarget"])(aTarget, responses);

  for (var i = 0; i < response.data.length; i++) {
    var anEvent = response.data[i];
    var datapoints = [];

    if (anEvent.check.issued !== undefined) {
      var data = {
        timestamp: anEvent.check.issued * 1000,
        message: anEvent.check.name,
        client: anEvent.client,
        check: {
          name: anEvent.check.name,
          issued: anEvent.check.issued * 1000,
          executed: anEvent.check.executed * 1000,
          output: anEvent.check.output,
          status: anEvent.check.status,
          type: anEvent.check.type
        }
      };
      datapoints.push(data);
      anEvent.datapoints = datapoints;
      delete anEvent.check;
      delete anEvent.client;
      anEvent.type = 'docs';
    }
  }

  return response;
}

function convertResultsToDataPoints(aTarget, responses) {
  var response = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getResponseForTarget"])(aTarget, responses);

  if (response.data.length === undefined) {
    var singleData = response.data;
    response.data = [];
    response.data.push(singleData);
  }

  for (var i = 0; i < response.data.length; i++) {
    var anEvent = response.data[i];
    var datapoints = [];

    if (anEvent.check.issued !== undefined) {
      datapoints[0] = [anEvent.check.status, anEvent.check.issued * 1000];
    }

    anEvent.datapoints = datapoints;

    if (anEvent.check.name !== undefined) {
      anEvent.target = anEvent.check.name;
    } else {
      anEvent.target = anEvent.check;
    }
  }

  return response;
}



/***/ }),

/***/ "./datasource/sensu-core/api/result_requests.ts":
/*!******************************************************!*\
  !*** ./datasource/sensu-core/api/result_requests.ts ***!
  \******************************************************/
/*! exports provided: getResultURIs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResultURIs", function() { return getResultURIs; });
function getResultURIs(checkNames, clientNames) {
  var uris = [];
  var dimensionURI = '/results';
  var aClientName = null;
  var aCheckName = null;
  var anAggregateName = null;

  if (clientNames.length) {
    for (var i = 0; i < clientNames.length; i++) {
      aClientName = clientNames[i];
      dimensionURI = '/results/' + aClientName;
      uris.push(dimensionURI);
    }
  }

  if (checkNames.length && clientNames.length) {
    for (var i = 0; i < clientNames.length; i++) {
      aClientName = clientNames[i];

      for (var j = 0; j < checkNames.length; j++) {
        aCheckName = checkNames[i];
        dimensionURI = '/results/' + aClientName + '/' + aCheckName;
        uris.push(dimensionURI);
      }
    }
  }

  if (uris.length === 0) {
    uris.push(dimensionURI);
  }

  return uris;
}



/***/ }),

/***/ "./datasource/sensu-core/api/utils.ts":
/*!********************************************!*\
  !*** ./datasource/sensu-core/api/utils.ts ***!
  \********************************************/
/*! exports provided: getResponseForTarget */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResponseForTarget", function() { return getResponseForTarget; });
function getResponseForTarget(aTarget, responses) {
  var response = {
    data: []
  };

  for (var i = 0; i < responses.data.length; i++) {
    if (responses.data[i].target === aTarget) {
      response.data = responses.data[i].response.data;
      break;
    }
  }

  return response;
}



/***/ }),

/***/ "./datasource/sensu-core/config.ts":
/*!*****************************************!*\
  !*** ./datasource/sensu-core/config.ts ***!
  \*****************************************/
/*! exports provided: ConfigCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigCtrl", function() { return ConfigCtrl; });
var ConfigCtrl = function () {
  function ConfigCtrl() {}

  ConfigCtrl.templateUrl = 'datasource/sensu-core/partials/config.html';
  return ConfigCtrl;
}();



/***/ }),

/***/ "./datasource/sensu-core/datasource.ts":
/*!*********************************************!*\
  !*** ./datasource/sensu-core/datasource.ts ***!
  \*********************************************/
/*! exports provided: SensuCoreDatasource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SensuCoreDatasource", function() { return SensuCoreDatasource; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var grafana_app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! grafana/app/core/utils/kbn */ "grafana/app/core/utils/kbn");
/* harmony import */ var grafana_app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(grafana_app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_aggregate_requests__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api/aggregate_requests */ "./datasource/sensu-core/api/aggregate_requests.ts");
/* harmony import */ var _api_aggregate_converters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./api/aggregate_converters */ "./datasource/sensu-core/api/aggregate_converters.ts");
/* harmony import */ var _api_client_requests__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./api/client_requests */ "./datasource/sensu-core/api/client_requests.ts");
/* harmony import */ var _api_client_converters__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./api/client_converters */ "./datasource/sensu-core/api/client_converters.ts");
/* harmony import */ var _api_event_requests__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./api/event_requests */ "./datasource/sensu-core/api/event_requests.ts");
/* harmony import */ var _api_event_converters__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./api/event_converters */ "./datasource/sensu-core/api/event_converters.ts");
/* harmony import */ var _api_result_requests__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./api/result_requests */ "./datasource/sensu-core/api/result_requests.ts");
/* harmony import */ var _api_result_converters__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./api/result_converters */ "./datasource/sensu-core/api/result_converters.ts");











var SensuCoreDatasource = function () {
  function SensuCoreDatasource(instanceSettings, $q, backendSrv, templateSrv, uiSegmentSrv) {
    this.url = instanceSettings.url;
    this.name = instanceSettings.name;
    this.basicAuth = instanceSettings.basicAuth;
    this.withCredentials = instanceSettings.withCredentials;
    this.q = $q;
    this.backendSrv = backendSrv;
    this.templateSrv = templateSrv;
    this.uiSegmentSrv = uiSegmentSrv;
    this.minimumInterval = 60000;
  }

  SensuCoreDatasource.prototype.metricFindQuery = function (options) {
    var isClientTags = false;
    var isClientTagValue = false;
    var aQuery = '/clients';
    var tagToValue = '';
    options = this.templateSrv.replaceWithText(options);

    if (options !== undefined && options !== '') {
      switch (true) {
        case /clienttags/.test(options):
          aQuery = '/clients';
          isClientTags = true;
          break;

        case /clienttagvalue/.test(options):
          aQuery = '/clients';
          isClientTagValue = true;
          tagToValue = options.split('tag=')[1];
          break;

        default:
          aQuery = options;
      }

      if (!aQuery.startsWith('/', 0)) {
        aQuery = '/' + aQuery;
      }
    }

    var thisRef = this;
    return this.backendSrv.datasourceRequest({
      url: this.url + aQuery,
      data: options,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.basicAuth
      }
    }).then(function (response) {
      if (isClientTags) {
        return thisRef.generateClientQueryTags(response);
      }

      if (isClientTagValue) {
        return thisRef.getClientQueryTagValue(response, tagToValue);
      }

      return thisRef.mapToClientNameAndVersion(response);
    });
  };

  SensuCoreDatasource.prototype.generateClientQueryTags = function (response) {
    var clientQueryTags = [];
    var allTags = [];
    var excludedTags = ['name', 'socket', 'address', 'subscriptions', 'timestamp', 'keepalive', 'keepalives', 'redact', 'version'];

    for (var i = 0; i < response.data.length; i++) {
      var keys = Object.keys(response.data[i]);

      for (var j = 0; j < keys.length; j++) {
        var keyName = keys[j];

        if (excludedTags.indexOf(keyName) === -1) {
          var tagValue = response.data[i][keyName];
          var fullKeyName = keyName + '=' + tagValue;

          if (allTags.indexOf(fullKeyName) < 0) {
            allTags.push(fullKeyName);
          }
        }
      }
    }

    if (allTags.length > 0) {
      allTags.sort();

      for (var i = 0; i < allTags.length; i++) {
        clientQueryTags.push({
          text: allTags[i],
          expandable: true
        });
      }
    }

    return clientQueryTags;
  };

  SensuCoreDatasource.prototype.getClientQueryTagValue = function (response, tag) {
    var tagSplit = tag.split('=');
    var tagToMatch = tagSplit[0];
    var tagValueToMatch = tagSplit[1];
    var clientQueryTags = [];
    var allTagValues = [];

    for (var i = 0; i < response.data.length; i++) {
      var keys = Object.keys(response.data[i]);

      for (var j = 0; j < keys.length; j++) {
        var keyName = keys[j];

        if (tagToMatch === keyName) {
          if (typeof response.data[i][tagToMatch] !== 'string') {
            for (var z = 0; z < response.data[i][tagToMatch].length; z++) {
              if (response.data[i][tagToMatch][z] === tagValueToMatch) {
                var tagValue = response.data[i].name;

                if (allTagValues.indexOf(tagValue) < 0) {
                  allTagValues.push(tagValue);
                }
              }
            }
          } else {
            if (response.data[i][tagToMatch] === tagValueToMatch) {
              var tagValue = response.data[i].name;

              if (allTagValues.indexOf(tagValue) < 0) {
                allTagValues.push(tagValue);
              }
            }
          }
        }
      }
    }

    if (allTagValues.length > 0) {
      for (var i = 0; i < allTagValues.length; i++) {
        clientQueryTags.push({
          text: allTagValues[i]
        });
      }
    }

    return clientQueryTags;
  };

  SensuCoreDatasource.prototype.mapToClientNameAndVersion = function (result) {
    if (result.data.length === 0) {
      return {};
    }

    return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(result.data, function (d) {
      var x = {
        text: '',
        expandable: true
      };

      try {
        x = {
          text: d.name,
          expandable: true
        };
      } catch (e) {
        console.log('bad data');
      }

      return x;
    });
  };

  SensuCoreDatasource.prototype.getClientNames = function (dimensions) {
    var values = [];

    for (var i = 0; i < dimensions.length; i++) {
      if (dimensions[i].dimensionType === 'clientName') {
        var aDimension = dimensions[i].value;

        if (this.templateSrv.getVariableName(aDimension)) {
          var templateVar = this.templateSrv.replace(aDimension);

          if (templateVar.length > 0) {
            if (templateVar.startsWith('{')) {
              templateVar = templateVar.slice(1, -1);
              var templateVars = templateVar.split(',');
              values.push.apply(values, templateVars);
            } else {
              values.push(templateVar);
            }
          }
        } else {
          values.push(aDimension);
        }
      }
    }

    return values;
  };

  SensuCoreDatasource.prototype.getCheckNames = function (dimensions) {
    var values = [];

    for (var i = 0; i < dimensions.length; i++) {
      if (dimensions[i].dimensionType === 'checkName') {
        var aDimension = dimensions[i].value;

        if (this.templateSrv.getVariableName(aDimension)) {
          var templateVar = this.templateSrv.replace(aDimension);

          if (templateVar.length > 0) {
            if (templateVar.startsWith('{')) {
              templateVar = templateVar.slice(1, -1);
              var templateVars = templateVar.split(',');
              values.push.apply(values, templateVars);
            } else {
              values.push(templateVar);
            }
          }
        } else {
          values.push(aDimension);
        }
      }
    }

    return values;
  };

  SensuCoreDatasource.prototype.getAggregateNames = function (dimensions) {
    var values = [];

    for (var i = 0; i < dimensions.length; i++) {
      if (dimensions[i].dimensionType === 'aggregateName') {
        var aDimension = dimensions[i].value;

        if (this.templateSrv.getVariableName(aDimension)) {
          var templateVar = this.templateSrv.replace(aDimension);

          if (templateVar.length > 0) {
            if (templateVar.startsWith('{')) {
              templateVar = templateVar.slice(1, -1);
              var templateVars = templateVar.split(',');
              values.push.apply(values, templateVars);
            } else {
              values.push(templateVar);
            }
          }
        } else {
          values.push(aDimension);
        }
      }
    }

    return values;
  };

  SensuCoreDatasource.prototype.replaceFilterValues = function (filters) {
    for (var i = 0; i < filters.length; i++) {
      var aFilter = filters[i];

      switch (aFilter.filterType) {
        case 'field':
          var aFieldValue = aFilter.filterFieldValue;
          var templatedValue = this.templateSrv.replace(aFieldValue);
          aFilter.filterFieldValueReplaced = templatedValue;
          break;
      }
    }

    return filters;
  };

  SensuCoreDatasource.prototype.getQueryURIByType = function (target) {
    var uris = [];
    var dimensionURI = '/events';
    var clientNames = null;
    var checkNames = null;
    var aggregateNames = null;

    if (target.dimensions !== undefined) {
      clientNames = this.getClientNames(target.dimensions);
      checkNames = this.getCheckNames(target.dimensions);
      aggregateNames = this.getAggregateNames(target.dimensions);
    }

    if (target.filters !== undefined) {
      this.replaceFilterValues(target.filters);
    }

    if (target.alias !== undefined) {
      target.aliasReplaced = this.templateSrv.replace(target.alias);
    }

    switch (target.sourceType) {
      case 'aggregates':
      case 'aggregates_json':
        uris = Object(_api_aggregate_requests__WEBPACK_IMPORTED_MODULE_2__["getAggregateURIs"])(target, aggregateNames);
        break;

      case 'check_subscriptions':
        break;

      case 'client_health_json':
        uris = Object(_api_client_requests__WEBPACK_IMPORTED_MODULE_4__["getClientHealthURIs"])(clientNames);
        break;

      case 'clients':
      case 'clients_json':
        uris = Object(_api_client_requests__WEBPACK_IMPORTED_MODULE_4__["getClientsURIs"])(checkNames, clientNames);
        break;

      case 'clienthistory':
        uris = Object(_api_client_requests__WEBPACK_IMPORTED_MODULE_4__["getClientHistoryURIs"])(clientNames);
        break;

      case 'event_metrics':
      case 'event_metrics_json':
      case 'events':
      case 'events_json':
        uris = Object(_api_event_requests__WEBPACK_IMPORTED_MODULE_6__["getEventsURIs"])(checkNames, clientNames);
        break;

      case 'results_json':
      case 'results_table':
        uris = Object(_api_result_requests__WEBPACK_IMPORTED_MODULE_8__["getResultURIs"])(checkNames, clientNames);
        break;

      case 'sensu_health_json':
        break;

      case 'silenced_entries_json':
        break;

      case 'stashes_json':
        break;
    }

    return uris;
  };

  SensuCoreDatasource.prototype.getBuckets = function (responses) {
    var buckets = {};

    for (var i = 0; i < responses.data.length; i++) {
      var refId = responses.data[i].target.refId;

      if (buckets.hasOwnProperty(refId)) {
        buckets[refId].push(responses.data[i]);
      } else {
        buckets[refId] = [responses.data[i]];
      }
    }

    return buckets;
  };

  SensuCoreDatasource.prototype.processConversions = function (sourceType, aTarget, responses) {
    var result = {
      data: []
    };

    switch (sourceType) {
      case 'aggregates':
        result = Object(_api_aggregate_converters__WEBPACK_IMPORTED_MODULE_3__["convertAggregatesToDataPoints"])(aTarget, responses);
        break;

      case 'aggregates_json':
        result = Object(_api_aggregate_converters__WEBPACK_IMPORTED_MODULE_3__["convertAggregatesToJSON"])(aTarget, responses);
        return result;

      case 'clients':
        result = Object(_api_client_converters__WEBPACK_IMPORTED_MODULE_5__["convertClientsToDataPoints"])(aTarget, responses);
        return result;

      case 'clients_json':
        result = Object(_api_client_converters__WEBPACK_IMPORTED_MODULE_5__["convertClientsToJSON"])(aTarget, responses);
        return result;

      case 'client_health_json':
        result = Object(_api_client_converters__WEBPACK_IMPORTED_MODULE_5__["convertClientHealthToJSON"])(aTarget, responses);
        return result;

      case 'clienthistory':
        result = Object(_api_client_converters__WEBPACK_IMPORTED_MODULE_5__["convertClientHistoryToDataPoints"])(aTarget, responses);
        break;

      case 'events':
        result = Object(_api_event_converters__WEBPACK_IMPORTED_MODULE_7__["convertEventsToDataPoints"])(aTarget, responses);
        break;

      case 'events_json':
        result = Object(_api_event_converters__WEBPACK_IMPORTED_MODULE_7__["convertEventsToJSON"])(aTarget, responses);
        break;

      case 'event_metrics':
        result = Object(_api_event_converters__WEBPACK_IMPORTED_MODULE_7__["convertEventsToEventMetrics"])(aTarget, responses);
        break;

      case 'event_metrics_json':
        result = Object(_api_event_converters__WEBPACK_IMPORTED_MODULE_7__["convertEventsToEventMetricsJSON"])(aTarget, responses);
        break;

      case 'results_json':
        result = Object(_api_result_converters__WEBPACK_IMPORTED_MODULE_9__["convertResultsToJSON"])(aTarget, responses);
        break;

      case 'results_table':
        result = Object(_api_result_converters__WEBPACK_IMPORTED_MODULE_9__["convertResultsToTable"])(aTarget, responses);
        break;

      default:
        console.log('Unknown source type');
        break;
    }

    return result;
  };

  SensuCoreDatasource.prototype.setRawTargets = function (aTarget, result) {
    for (var i = 0; i < result.data.length; i++) {
      result.data[i].rawTarget = result.data[i].target;
    }

    return result;
  };

  SensuCoreDatasource.prototype.processFilters = function (aTarget, result) {
    if (aTarget.filters !== undefined && aTarget.filters.length > 0) {
      var filterData = [];

      for (var i = 0; i < aTarget.filters.length; i++) {
        var aFilter = aTarget.filters[i];

        for (var j = 0; j < result.data.length; j++) {
          var aRawTarget = result.data[j].rawTarget;

          if (aFilter.filterType === aRawTarget) {
            if (aTarget.aliasReplaced) {
              result.data[j].target = aTarget.aliasReplaced + ' ' + aRawTarget;
            }

            filterData.push(result.data[j]);
          }
        }
      }

      if (filterData.length > 0) {
        result.data = filterData;
      }
    } else {
      if (aTarget.aliasReplaced) {
        for (var i = 0; i < result.data.length; i++) {
          result.data[i].target = aTarget.aliasReplaced;
        }
      }
    }

    return result;
  };

  SensuCoreDatasource.prototype.parseQueryResult = function (responses) {
    var allResults = {
      data: []
    };

    if (!responses || !responses.data) {
      return allResults;
    }

    var buckets = this.getBuckets(responses);
    var bucketKeys = Object.keys(buckets);

    for (var i = 0; i < bucketKeys.length; i++) {
      var aKey = bucketKeys[i];
      var sourceType = buckets[aKey][0].target.sourceType;
      var aTarget = buckets[aKey][0].target;
      var result = this.processConversions(sourceType, aTarget, responses);
      result = this.setRawTargets(aTarget, result);
      result = this.processFilters(aTarget, result);

      for (var i_1 = 0; i_1 < result.data.length; i_1++) {
        allResults.data.push(result.data[i_1]);
      }
    }

    return allResults;
  };

  SensuCoreDatasource.prototype.getCheckInterval = function (client, checkName) {};

  SensuCoreDatasource.prototype.dimensionFindValues = function (target, dimension) {
    var dimensionURI = '/clients';

    switch (dimension.dimensionType) {
      case 'clientName':
        dimensionURI = '/clients';
        break;

      case 'checkName':
        dimensionURI = '/checks';
        break;

      case 'aggregateName':
        dimensionURI = '/aggregates';
        break;
    }

    return this.backendSrv.datasourceRequest({
      url: this.url + dimensionURI,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.basicAuth
      }
    }).then(this.mapToTextValue);
  };

  SensuCoreDatasource.prototype.mapToTextValue = function (result) {
    return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(result.data, function (d, i) {
      return {
        text: d.name,
        value: d.name
      };
    });
  };

  SensuCoreDatasource.prototype.filterFindValues = function (target, filter) {
    var filterURI = '/clients';

    switch (filter.filterType) {
      case 'clientName':
        filterURI = '/clients';
        break;

      case 'checkName':
        filterURI = '/checks';
        break;

      case 'aggregateName':
        filterURI = '/aggregates';
        break;
    }

    return this.backendSrv.datasourceRequest({
      url: this.url + filterURI,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.basicAuth
      }
    }).then(this.mapToTextValue);
  };

  SensuCoreDatasource.prototype.query = function (options) {
    var queries = [];
    var thisRef = this;
    var singleTarget = null;
    options.targets.forEach(function (target) {
      queries.push(target);
    });
    var interval = options.interval;
    var zz = Object(grafana_app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_1__["interval_to_ms"])(interval);

    if (Object(grafana_app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_1__["interval_to_ms"])(interval) < this.minimumInterval) {
      interval = Object(grafana_app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_1__["secondsToHms"])(this.minimumInterval / 1000);
    }

    var deferred = this.q.defer();

    if (queries.length === 0) {
      deferred.resolve({
        data: []
      });
      return deferred.promise;
    }

    var allQueries = this.q.all({
      first: thisRef.multipleDataQueries(queries)
    });
    allQueries.then(function (results) {
      deferred.resolve(results.first);
    });
    return deferred.promise;
  };

  SensuCoreDatasource.prototype.singleDataQuery = function (singleTarget, uriType) {
    var deferred = this.q.defer();
    var params = {};
    var httpOptions = {
      method: 'GET',
      url: this.url + uriType,
      params: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.basicAuth
      }
    };
    this.backendSrv.datasourceRequest(httpOptions).then(function (response) {
      var anError = null;

      if (response.status !== 200) {
        console.log('error...');
        anError = new Error('Bad Status: ' + response.status);
        deferred.reject(anError);
      }

      if (!response.data) {
        anError = new Error('No data');
        deferred.reject(anError);
      }

      deferred.resolve({
        target: singleTarget,
        response: response
      });
    }, function (response) {
      console.error('Unable to load data. Response: %o', response.data ? response.data.message : response);
      var error = new Error('Unable to load data');
      deferred.reject(error);
    });
    return deferred.promise;
  };

  SensuCoreDatasource.prototype.multiDone = function (responses) {
    return this.parseQueryResult(responses);
  };

  SensuCoreDatasource.prototype.multipleDataQueries = function (pendingQueries) {
    var deferred = this.q.defer();
    var dataCalls = [];
    var thisRef = this;
    var index = 0;

    while (index < pendingQueries.length) {
      var aTarget = pendingQueries[index];
      var uriList = this.getQueryURIByType(aTarget);

      for (var i = 0; i < uriList.length; i++) {
        dataCalls.push(thisRef.singleDataQuery(aTarget, uriList[i]));
      }

      index++;
    }

    this.q.all(dataCalls).then(function (results) {
      var response = {
        data: []
      };
      var i = 0;

      while (i < results.length) {
        response.data.push(results[i]);
        i++;
      }

      deferred.resolve(thisRef.multiDone(response));
    }, function (errors) {
      deferred.reject(errors);
    }, function (updates) {
      deferred.update(updates);
    });
    return deferred.promise;
  };

  SensuCoreDatasource.prototype.getServerInfo = function () {
    return this.backendSrv.datasourceRequest({
      url: this.url + '/info',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.basicAuth
      },
      method: 'GET'
    }).then(function (response) {
      return response.data;
    });
  };

  SensuCoreDatasource.prototype.testDatasource = function () {
    return this.backendSrv.datasourceRequest({
      url: this.url + '/info',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.basicAuth
      },
      method: 'GET'
    }).then(function (response) {
      if (response.status === 200) {
        return {
          status: 'success',
          message: 'Data source is working',
          title: 'Success'
        };
      }

      return {
        status: 'error',
        message: 'Data source is not working',
        title: 'Error'
      };
    });
  };

  return SensuCoreDatasource;
}();



/***/ }),

/***/ "./datasource/sensu-core/module.ts":
/*!*****************************************!*\
  !*** ./datasource/sensu-core/module.ts ***!
  \*****************************************/
/*! exports provided: Datasource, QueryCtrl, QueryOptionsCtrl, ConfigCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryOptionsCtrl", function() { return SensuCoreQueryOptionsCtrl; });
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datasource */ "./datasource/sensu-core/datasource.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Datasource", function() { return _datasource__WEBPACK_IMPORTED_MODULE_0__["SensuCoreDatasource"]; });

/* harmony import */ var _query_ctrl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query_ctrl */ "./datasource/sensu-core/query_ctrl.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QueryCtrl", function() { return _query_ctrl__WEBPACK_IMPORTED_MODULE_1__["SensuCoreDatasourceQueryCtrl"]; });

/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config */ "./datasource/sensu-core/config.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConfigCtrl", function() { return _config__WEBPACK_IMPORTED_MODULE_2__["ConfigCtrl"]; });





var SensuCoreQueryOptionsCtrl = function () {
  function SensuCoreQueryOptionsCtrl() {}

  SensuCoreQueryOptionsCtrl.templateUrl = 'datasource/sensu-core/partials/query.options.html';
  return SensuCoreQueryOptionsCtrl;
}();



/***/ }),

/***/ "./datasource/sensu-core/query_ctrl.ts":
/*!*********************************************!*\
  !*** ./datasource/sensu-core/query_ctrl.ts ***!
  \*********************************************/
/*! exports provided: SensuCoreDatasourceQueryCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SensuCoreDatasourceQueryCtrl", function() { return SensuCoreDatasourceQueryCtrl; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! grafana/app/plugins/sdk */ "grafana/app/plugins/sdk");
/* harmony import */ var grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_1__);



var SensuCoreDatasourceQueryCtrl = function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SensuCoreDatasourceQueryCtrl, _super);

  function SensuCoreDatasourceQueryCtrl($scope, $injector, templateSrv, uiSegmentSrv) {
    var _this = _super.call(this, $scope, $injector) || this;

    _this.scope = $scope;
    _this.uiSegmentSrv = uiSegmentSrv;
    _this.templateSrv = templateSrv;
    _this.sourceTypes = [{
      text: 'Aggregates',
      value: 'aggregates'
    }, {
      text: 'Aggregates as JSON',
      value: 'aggregates_json'
    }, {
      text: 'Check Subscriptions',
      value: 'check_subscriptions'
    }, {
      text: 'Clients',
      value: 'clients'
    }, {
      text: 'Clients as JSON',
      value: 'clients_json'
    }, {
      text: 'Client Health as JSON',
      value: 'client_health_json'
    }, {
      text: 'Client History',
      value: 'client_history'
    }, {
      text: 'Events',
      value: 'events'
    }, {
      text: 'Events as JSON',
      value: 'events_json'
    }, {
      text: 'Event Metrics',
      value: 'event_metrics'
    }, {
      text: 'Event Metrics JSON',
      value: 'event_metrics_json'
    }, {
      text: 'Results as JSON',
      value: 'results_json'
    }, {
      text: 'Results as Table',
      value: 'results_table'
    }, {
      text: 'Sensu Health',
      value: 'sensu_health_json'
    }, {
      text: 'Silenced Entries',
      value: 'silenced_entries_json'
    }, {
      text: 'Stashes',
      value: 'stashes_json'
    }];
    _this.dimensionTypes = {
      aggregates: [{
        text: 'Aggregate Name',
        value: 'aggregateName'
      }],
      aggregates_json: [{
        text: 'Aggregate Name',
        value: 'aggregateName'
      }],
      check_subscriptions: [{
        text: 'Aggregate Name',
        value: 'aggregateName'
      }, {
        text: 'Check Name',
        value: 'checkName'
      }, {
        text: 'Check Type',
        value: 'checkType'
      }, {
        text: 'Source (JIT Client)',
        value: 'sourceName'
      }],
      clients: [{
        text: 'Client Name',
        value: 'clientName'
      }, {
        text: 'Check Name',
        value: 'checkName'
      }],
      client_health_json: [{
        text: 'Client Name',
        value: 'clientName'
      }],
      client_history: [{
        text: 'Client Name',
        value: 'clientName'
      }],
      clients_json: [{
        text: 'Client Name',
        value: 'clientName'
      }, {
        text: 'Check Name',
        value: 'checkName'
      }],
      events: [{
        text: 'Client Name',
        value: 'clientName'
      }, {
        text: 'Check Name',
        value: 'checkName'
      }],
      events_json: [{
        text: 'Client Name',
        value: 'clientName'
      }, {
        text: 'Check Name',
        value: 'checkName'
      }],
      event_metrics: [{
        text: 'Client Name',
        value: 'clientName'
      }, {
        text: 'Check Name',
        value: 'checkName'
      }],
      event_metrics_json: [{
        text: 'Client Name',
        value: 'clientName'
      }, {
        text: 'Check Name',
        value: 'checkName'
      }],
      results_json: [{
        text: 'Client Name',
        value: 'clientName'
      }, {
        text: 'Check Name',
        value: 'checkName'
      }],
      results_table: [{
        text: 'Client Name',
        value: 'clientName'
      }, {
        text: 'Check Name',
        value: 'checkName'
      }],
      sensu_health_json: [{
        text: 'Client Name',
        value: 'clientName'
      }, {
        text: 'Check Name',
        value: 'checkName'
      }],
      silenced_entries_json: [{
        text: 'Client Name',
        value: 'clientName'
      }, {
        text: 'Check Name',
        value: 'checkName'
      }],
      stashes_json: [{
        text: 'Client Name',
        value: 'clientName'
      }, {
        text: 'Check Name',
        value: 'checkName'
      }]
    };
    _this.filterTypes = {
      aggregates: [{
        text: 'Number of Checks',
        value: 'checks',
        type: 'value'
      }, {
        text: 'Number of Clients',
        value: 'clients',
        type: 'value'
      }, {
        text: 'State Critical',
        value: 'critical',
        type: 'value'
      }, {
        text: 'State OK',
        value: 'ok',
        type: 'value'
      }, {
        text: 'State Stale',
        value: 'stale',
        type: 'value'
      }, {
        text: 'State Unknown',
        value: 'unknown',
        type: 'value'
      }, {
        text: 'State Warning',
        value: 'warning',
        type: 'value'
      }, {
        text: 'Total Checks',
        value: 'total',
        type: 'value'
      }],
      client_health_json: [{
        text: 'Client Name',
        value: 'fetch'
      }, {
        text: 'Client Name RegEx',
        value: 'regex'
      }],
      clients: [{
        text: 'Client Name',
        value: 'fetch'
      }, {
        text: 'Client Name RegEx',
        value: 'regex'
      }, {
        text: 'Field',
        value: 'field'
      }],
      clients_json: [{
        text: 'Client Name',
        value: 'fetch'
      }, {
        text: 'Client Name RegEx',
        value: 'regex'
      }, {
        text: 'Field',
        value: 'field'
      }],
      events: [{
        text: 'Client Name',
        value: 'fetch'
      }, {
        text: 'Client Name RegEx',
        value: 'regex'
      }, {
        text: 'Check Name RegEx',
        value: 'regex'
      }, {
        text: 'Field',
        value: 'field'
      }],
      events_json: [{
        text: 'Client Name',
        value: 'fetch'
      }, {
        text: 'Client Name RegEx',
        value: 'regex'
      }, {
        text: 'Check Name RegEx',
        value: 'regex'
      }, {
        text: 'Field',
        value: 'field'
      }],
      event_metrics: [{
        text: 'Client Name',
        value: 'fetch'
      }, {
        text: 'Client Name RegEx',
        value: 'regex'
      }, {
        text: 'Check Name RegEx',
        value: 'regex'
      }, {
        text: 'Field',
        value: 'field'
      }],
      event_metrics_json: [{
        text: 'Client Name',
        value: 'fetch'
      }, {
        text: 'Client Name RegEx',
        value: 'regex'
      }, {
        text: 'Check Name RegEx',
        value: 'regex'
      }, {
        text: 'Field',
        value: 'field'
      }],
      results_json: [{
        text: 'Client Name',
        value: 'fetch'
      }, {
        text: 'Client Name RegEx',
        value: 'regex'
      }, {
        text: 'Check Name RegEx',
        value: 'regex'
      }, {
        text: 'Field',
        value: 'field'
      }]
    };
    _this.aggregateModes = [{
      text: 'List',
      value: 'list'
    }, {
      text: 'Clients',
      value: 'clients'
    }, {
      text: 'Checks',
      value: 'checks'
    }, {
      text: 'Results Critical',
      value: 'results_critical'
    }, {
      text: 'Results OK',
      value: 'results_ok'
    }, {
      text: 'Results Unknown',
      value: 'results_unknown'
    }, {
      text: 'Results Warning',
      value: 'results_warning'
    }];
    _this.clientQueryModes = [{
      text: 'List',
      value: 'list'
    }, {
      text: 'Count',
      value: 'count'
    }];
    _this.eventMetricModes = [{
      text: 'All Events',
      value: 'all_events_count'
    }, {
      text: 'Active Events',
      value: 'active_events_count'
    }, {
      text: 'Critical Total Count',
      value: 'critical_count'
    }, {
      text: 'Critical Active Count',
      value: 'critical_active_count'
    }, {
      text: 'Critical Silenced Count',
      value: 'critical_silenced_count'
    }, {
      text: 'Warning Total Count',
      value: 'warning_count'
    }, {
      text: 'Warning Silenced Count',
      value: 'warning_silenced_count'
    }, {
      text: 'Warning Active Count',
      value: 'warning_active_count'
    }, {
      text: 'Unknown Total Count',
      value: 'unknown_count'
    }, {
      text: 'Unknown Active Count',
      value: 'unknown_active_count'
    }, {
      text: 'Unknown Silenced Count',
      value: 'unknown_silenced_count'
    }, {
      text: 'Silenced Total Count',
      value: 'silenced_count'
    }, {
      text: 'Clients Silenced Count',
      value: 'clients_silenced_count'
    }, {
      text: 'Checks Silenced Count',
      value: 'checks_silenced_count'
    }];
    _this.target.clientQueryMode = _this.target.clientQueryMode || 'count';
    _this.target.eventMetricMode = _this.target.eventMetricMode || 'all_events_count';
    _this.target.aggregateMode = _this.target.aggregateMode || 'list';
    _this.target.sourceType = _this.target.sourceType || 'events';
    _this.target.dimensions = _this.target.dimensions || [];
    return _this;
  }

  SensuCoreDatasourceQueryCtrl.prototype.removeDimension = function (dimension) {
    if (this.target.dimensions) {
      this.target.dimensions.splice(this.target.dimensions.indexOf(dimension), 1);
      this.panelCtrl.refresh();
    }
  };

  SensuCoreDatasourceQueryCtrl.prototype.addDimension = function () {
    if (!this.target.dimensions) {
      this.target.dimensions = [];
    }

    var dimensionsForSourceType = this.dimensionTypes[this.target.sourceType];
    var defaultDimensionType = dimensionsForSourceType[0].value;
    this.target.dimensions.push({
      name: null,
      value: null,
      dimensionType: defaultDimensionType
    });
  };

  SensuCoreDatasourceQueryCtrl.prototype.getDimensionValues = function (dimension) {
    if (dimension) {
      return this.datasource.dimensionFindValues(this.target, dimension).then(this.uiSegmentSrv.transformToSegments(true));
    }
  };

  SensuCoreDatasourceQueryCtrl.prototype.removeFilter = function (filter) {
    if (this.target.filters) {
      this.target.filters.splice(this.target.filters.indexOf(filter), 1);
      this.panelCtrl.refresh();
    }
  };

  SensuCoreDatasourceQueryCtrl.prototype.addFilter = function () {
    if (!this.target.filters) {
      this.target.filters = [];
    }

    var filtersForSourceType = this.filterTypes[this.target.sourceType];
    var defaultFilterType = filtersForSourceType[0].type;
    this.target.filters.push({
      name: null,
      value: null,
      filterType: defaultFilterType
    });
  };

  SensuCoreDatasourceQueryCtrl.prototype.getFilterValues = function (filter) {
    if (filter) {
      return this.datasource.filterFindValues(this.target, filter).then(this.uiSegmentSrv.transformToSegments(true));
    }
  };

  SensuCoreDatasourceQueryCtrl.prototype.getOptions = function () {
    return this.datasource.metricFindQuery(this.target).then(this.uiSegmentSrv.transformToSegments(true));
  };

  SensuCoreDatasourceQueryCtrl.prototype.sourceTypeChanged = function () {
    if (this.target.dimensions) {
      this.target.dimensions = [];
    }

    this.onChangeInternal();
  };

  SensuCoreDatasourceQueryCtrl.prototype.modeChanged = function () {
    this.onChangeInternal();
  };

  SensuCoreDatasourceQueryCtrl.prototype.onChangeInternal = function () {
    this.panelCtrl.refresh();
  };

  SensuCoreDatasourceQueryCtrl.templateUrl = 'datasource/sensu-core/partials/query.editor.html';
  return SensuCoreDatasourceQueryCtrl;
}(grafana_app_plugins_sdk__WEBPACK_IMPORTED_MODULE_1__["QueryCtrl"]);



/***/ }),

/***/ "grafana/app/core/utils/kbn":
/*!*************************************!*\
  !*** external "app/core/utils/kbn" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_core_utils_kbn__;

/***/ }),

/***/ "grafana/app/plugins/sdk":
/*!**********************************!*\
  !*** external "app/plugins/sdk" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_grafana_app_plugins_sdk__;

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash__;

/***/ })

/******/ })});;
//# sourceMappingURL=module.js.map