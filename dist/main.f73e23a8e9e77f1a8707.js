/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_main_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../style/main.less */ \"./style/main.less\");\n/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model */ \"./model.ts\");\n/* harmony import */ var _radioPrograms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./radioPrograms */ \"./radioPrograms.ts\");\n\n\n\nvar data = _model__WEBPACK_IMPORTED_MODULE_1__.getData();\n// функция принимает ставку чекбокса\nfunction updateResultsView(results) {\n  document.querySelector(\"#total-percent\").innerHTML = results.rate * 100 + \"%\";\n}\n//функция стоимости недвижимости\nfunction costInput(results) {\n  var input = document.querySelector(\"#input-cost\");\n  var input_ = document.querySelector(\"#input-downpayment\");\n  input.value = results.cost;\n  input.addEventListener(\"input\", function () {\n    input.value = input.value.replace(/\\D/g, \"\");\n  });\n  input.addEventListener('change', function () {\n    if (this.value < 350000) {\n      this.value = 350000;\n      input_.value = 52500;\n    }\n    if (this.value > 100000000) {\n      this.value = 100000000;\n      input_.value = 15000000;\n    }\n    this.value * 0.9 > input_.value ? input_.value = this.value * 0.9 : input_.value;\n    this.value * 0.15 < input_.value ? input_.value = this.value * 0.15 : input_.value;\n    results.firstPayment = input_.value;\n    results.cost = this.value;\n    sum(results);\n    payment(results);\n    overpay(results);\n  });\n}\n// //функция первоначального взноса\nfunction firstpayment(results) {\n  var input = document.querySelector(\"#input-downpayment\");\n  input.value > results.cost * 0.9 ? input.value = results.cost * 0.9 : input.value;\n  input.value < results.cost * 0.15 ? input.value = results.cost * 0.15 : input.value;\n  results.firstPayment = input.value;\n  if (results.rate === 0.12) {\n    input.value = 0;\n    results.firstPayment = 0;\n  }\n  results.firstPayment = input.value;\n  input.addEventListener(\"input\", function () {\n    input.value = input.value.replace(/\\D/g, \"\");\n  });\n  input.addEventListener('change', function () {\n    this.value > results.cost * 0.9 ? this.value = results.cost * 0.9 : this.value;\n    this.value < results.cost * 0.15 ? this.value = results.cost * 0.15 : this.value;\n    if (results.rate === 0.12) {\n      input.value = 0;\n      results.firstPayment = 0;\n    } else {\n      results.firstPayment = input.value;\n    }\n    sum(results);\n    payment(results);\n    overpay(results);\n  });\n}\n//Сумма кредита\nfunction sum(results) {\n  var total = document.querySelector(\"#total-cost\");\n  results.sum = results.cost - results.firstPayment;\n  total.innerHTML = results.sum + '¤';\n}\n\n//Ежемесячный платеж\nfunction payment(results) {\n  var input = document.querySelector('#input-term');\n  var show_payment = document.querySelector('#total-month-payment');\n  input.value = results.term;\n  var a = results.rate * 100 / 12 / 100;\n  var b = results.sum;\n  var c = Math.pow(1 + a, results.term * 12);\n  results.payment = (b * a * c / (c - 1)).toFixed(0);\n  show_payment.innerHTML = \"\".concat(results.payment, \"\\xA4\");\n  input.addEventListener('change', function () {\n    this.value > 30 || this.value < 1 ? this.value = 1 : this.value;\n    results.term = this.value;\n    var a = results.rate * 100 / 12 / 100;\n    var b = results.sum;\n    var c = Math.pow(1 + a, results.term * 12);\n    results.payment = (b * a * c / (c - 1)).toFixed(0);\n    show_payment.innerHTML = \"\".concat(results.payment, \"\\xA4\");\n    overpay(results);\n  });\n}\n//  переплата\nfunction overpay(results) {\n  var values = document.querySelector('#total-overpayment');\n  var pereplata = results.payment * (results.term * 12) - results.sum;\n  results.overpay = pereplata;\n  values.innerHTML = \"\".concat(pereplata.toFixed(0), \"\\xA4\");\n}\n\n//window.onload\nwindow.onload = function () {\n  var base_value = document.querySelector(\"#base-value\");\n  base_value.checked = true;\n  var results = _model__WEBPACK_IMPORTED_MODULE_1__.getResults();\n  var getData = _model__WEBPACK_IMPORTED_MODULE_1__.getData;\n  updateResultsView(results);\n  (0,_radioPrograms__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(getData);\n  costInput(results);\n  firstpayment(results);\n  sum(results);\n  payment(results);\n  overpay(results);\n\n  //handler, диспатч\n  document.addEventListener(\"updateForm\", function (e) {\n    _model__WEBPACK_IMPORTED_MODULE_1__.setData(e.detail);\n    var data = _model__WEBPACK_IMPORTED_MODULE_1__.getData();\n    var results = _model__WEBPACK_IMPORTED_MODULE_1__.getResults();\n    costInput(results);\n    firstpayment(results);\n    sum(results);\n    payment(results);\n    overpay(results);\n    if (results.rate === 0.12) {\n      var from = document.querySelector(\"#percents-from\");\n      from.innerHTML = \"0%\";\n    } else {\n      var _from = document.querySelector(\"#percents-from\");\n      _from.innerHTML = \"15%\";\n    }\n  });\n};\n\n//# sourceURL=webpack:///./index.ts?");

/***/ }),

/***/ "./model.ts":
/*!******************!*\
  !*** ./model.ts ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getData\": () => (/* binding */ getData),\n/* harmony export */   \"getResults\": () => (/* binding */ getResults),\n/* harmony export */   \"setData\": () => (/* binding */ setData)\n/* harmony export */ });\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nvar data = {\n  selectedProgram: 0.1,\n  programs: {\n    base: 0.1,\n    it: 0.05,\n    gov: 0.06,\n    zero: 0.12\n  }\n};\n\n//значение чекбокса\nvar results = {\n  rate: data.selectedProgram,\n  cost: 5000000,\n  firstPayment: 750000,\n  sum: 4250000,\n  term: 1,\n  payment: 0,\n  overpay: 0\n};\n// получаем объект\nvar getData = function getData() {\n  return _objectSpread({}, data);\n};\n// получаем значение чекбокса\nvar getResults = function getResults() {\n  return _objectSpread({}, results);\n};\n// Обновляем объект data новыми данными\nvar setData = function setData(newData) {\n  data = _objectSpread(_objectSpread({}, data), newData);\n  results = {\n    rate: data.selectedProgram,\n    cost: 5000000,\n    firstPayment: 750000,\n    sum: 4250000,\n    term: 1,\n    payment: 0,\n    overpay: 0\n  };\n};\n\n\n//# sourceURL=webpack:///./model.ts?");

/***/ }),

/***/ "./radioPrograms.ts":
/*!**************************!*\
  !*** ./radioPrograms.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction init(getData) {\n  //получаем процентную ставку\n  var _getData$programs = getData().programs,\n    base = _getData$programs.base,\n    it = _getData$programs.it,\n    gov = _getData$programs.gov,\n    zero = _getData$programs.zero;\n\n  //прописываем процентную ставку\n  var base_value = document.querySelector(\"#base-value\");\n  if (base_value) {\n    base_value.value = base;\n  }\n  var it_value = document.querySelector(\"#it-value\");\n  if (it_value) {\n    it_value.value = it;\n  }\n  var gov_value = document.querySelector(\"#gov-value\");\n  if (gov_value) {\n    gov_value.value = gov;\n  }\n  var zero_value = document.querySelector(\"#zero-value\");\n  if (zero_value) {\n    zero_value.value = zero;\n  }\n  //Выводим значения\n  var base_text = document.querySelector(\"#base-text\");\n  if (base_text) {\n    base_text.innerText = base * 100 + \"%\";\n  }\n  var it_text = document.querySelector(\"#it-text\");\n  if (it_text) {\n    it_text.innerHTML = it * 100 + \"%\";\n  }\n  var gov_text = document.querySelector(\"#gov-text\");\n  if (gov_text) {\n    gov_text.innerHTML = gov * 100 + \"%\";\n  }\n  var zero_text = document.querySelector(\"#zero-text\");\n  if (zero_text) {\n    zero_text.innerHTML = zero * 100 + \"%\";\n  }\n\n  //Процентная ставка при загрузке (исправляем баг)\n  var total_percent = document.querySelector(\"#total-percent\");\n  total_percent.innerHTML = getData().selectedProgram * 100 + \"%\";\n\n  //выбор программы по процентной ставке\n  var radioBtns = document.querySelectorAll('input[name=\"program\"]');\n  radioBtns.forEach(function (x) {\n    x.addEventListener(\"change\", function () {\n      //!!!\n      this.dispatchEvent(new CustomEvent(\"updateForm\", {\n        bubbles: true,\n        // Глобал\n        detail: {\n          // пользовательские данные\n          selectedProgram: parseFloat(this.value),\n          onUpdate: \"radioProgram\",\n          id: this.id\n        }\n      }));\n    });\n  });\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (init);\n\n//# sourceURL=webpack:///./radioPrograms.ts?");

/***/ }),

/***/ "./style/main.less":
/*!*************************!*\
  !*** ./style/main.less ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///./style/main.less?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["vendors-node_modules_babel_polyfill_lib_index_js"], () => (__webpack_require__("../node_modules/@babel/polyfill/lib/index.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_babel_polyfill_lib_index_js"], () => (__webpack_require__("./index.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;