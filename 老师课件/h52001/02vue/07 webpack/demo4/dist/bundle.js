/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/bar.js":
/*!********************!*\
  !*** ./src/bar.js ***!
  \********************/
/*! exports provided: a, b, arr, add */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return a; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"b\", function() { return b; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"arr\", function() { return arr; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"add\", function() { return add; });\n// node 模块化编程, 导出函数:暴露.模块化开发是有必要的，但是浏览器不支持\r\n//webpack可以帮我们打包模块资源，变成浏览器支持的形式\r\n// module.exports = function () { //node的语法：后端语言的模块化\r\n//     console.log('我是 bar 模块666777')\r\n// }\r\n\r\n\r\n//1.导出默认成员 ：前端的模块化 ES6新增的方法。用网页的方式打开;默认成员只能有一个\r\n// export default function () {\r\n//     console.log('我是 bar 模块---ES6')\r\n// }\r\n\r\n// export default {\r\n//     name: '小乔'\r\n// }\r\n\r\n//2.导出非默认成员：可以一次性导出多个数据\r\nlet a = 666;\r\nlet b = '777';\r\nlet arr = [1, 2, 3];\r\nfunction add(a, b) {\r\n    return a + b;\r\n}\r\n\n\n//# sourceURL=webpack:///./src/bar.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bar */ \"./src/bar.js\");\n// let bar = require('./bar.js');//导入\r\n// bar();\r\n\r\n//1、导入默认的成员\r\n\r\n// import bar from './bar'\r\n\r\n// console.log(bar);\r\n// bar();\r\n\r\n// import obj from './bar';\r\n// console.log(obj);\r\n\r\n//2.导入非默认的成员\r\n\r\n// let obj = {\r\n//     name: '妲己',\r\n//     age: '16'\r\n// }\r\n\r\n// let { name, age } = obj;//解构\r\n\r\n// console.log(name, age);\r\n\r\n\r\nconsole.log(_bar__WEBPACK_IMPORTED_MODULE_0__[\"a\"], _bar__WEBPACK_IMPORTED_MODULE_0__[\"b\"], _bar__WEBPACK_IMPORTED_MODULE_0__[\"arr\"]);\r\n\r\nconsole.log(Object(_bar__WEBPACK_IMPORTED_MODULE_0__[\"add\"])(3, 5));\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ })

/******/ });