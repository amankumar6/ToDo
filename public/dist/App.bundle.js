/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: Node Sass does not yet support your current environment: Windows 64-bit with Unsupported runtime (88)\nFor more information on which environments are supported please see:\nhttps://github.com/sass/node-sass/releases/tag/v4.14.1\n    at module.exports (D:\\VS\\WEB\\Project\\ToDo\\node_modules\\node-sass\\lib\\binding.js:13:13)\n    at Object.<anonymous> (D:\\VS\\WEB\\Project\\ToDo\\node_modules\\node-sass\\lib\\index.js:14:35)\n    at Module._compile (node:internal/modules/cjs/loader:1092:14)\n    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1121:10)\n    at Module.load (node:internal/modules/cjs/loader:972:32)\n    at Function.Module._load (node:internal/modules/cjs/loader:813:14)\n    at Module.require (node:internal/modules/cjs/loader:996:19)\n    at require (node:internal/modules/cjs/helpers:92:18)\n    at Object.<anonymous> (D:\\VS\\WEB\\Project\\ToDo\\node_modules\\sass-loader\\lib\\loader.js:3:14)\n    at Module._compile (node:internal/modules/cjs/loader:1092:14)\n    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1121:10)\n    at Module.load (node:internal/modules/cjs/loader:972:32)\n    at Function.Module._load (node:internal/modules/cjs/loader:813:14)\n    at Module.require (node:internal/modules/cjs/loader:996:19)\n    at require (node:internal/modules/cjs/helpers:92:18)\n    at loadLoader (D:\\VS\\WEB\\Project\\ToDo\\node_modules\\loader-runner\\lib\\loadLoader.js:18:17)\n    at iteratePitchingLoaders (D:\\VS\\WEB\\Project\\ToDo\\node_modules\\loader-runner\\lib\\LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (D:\\VS\\WEB\\Project\\ToDo\\node_modules\\loader-runner\\lib\\LoaderRunner.js:165:10)\n    at D:\\VS\\WEB\\Project\\ToDo\\node_modules\\loader-runner\\lib\\LoaderRunner.js:176:18\n    at loadLoader (D:\\VS\\WEB\\Project\\ToDo\\node_modules\\loader-runner\\lib\\loadLoader.js:47:3)\n    at iteratePitchingLoaders (D:\\VS\\WEB\\Project\\ToDo\\node_modules\\loader-runner\\lib\\LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (D:\\VS\\WEB\\Project\\ToDo\\node_modules\\loader-runner\\lib\\LoaderRunner.js:165:10)\n    at D:\\VS\\WEB\\Project\\ToDo\\node_modules\\loader-runner\\lib\\LoaderRunner.js:176:18\n    at loadLoader (D:\\VS\\WEB\\Project\\ToDo\\node_modules\\loader-runner\\lib\\loadLoader.js:47:3)\n    at iteratePitchingLoaders (D:\\VS\\WEB\\Project\\ToDo\\node_modules\\loader-runner\\lib\\LoaderRunner.js:169:2)\n    at runLoaders (D:\\VS\\WEB\\Project\\ToDo\\node_modules\\loader-runner\\lib\\LoaderRunner.js:365:2)\n    at NormalModule.doBuild (D:\\VS\\WEB\\Project\\ToDo\\node_modules\\webpack\\lib\\NormalModule.js:129:2)\n    at NormalModule.build (D:\\VS\\WEB\\Project\\ToDo\\node_modules\\webpack\\lib\\NormalModule.js:180:15)\n    at Compilation.buildModule (D:\\VS\\WEB\\Project\\ToDo\\node_modules\\webpack\\lib\\Compilation.js:142:10)\n    at D:\\VS\\WEB\\Project\\ToDo\\node_modules\\webpack\\lib\\Compilation.js:424:9\n    at D:\\VS\\WEB\\Project\\ToDo\\node_modules\\webpack\\lib\\NormalModule.js:141:35\n    at D:\\VS\\WEB\\Project\\ToDo\\node_modules\\loader-runner\\lib\\LoaderRunner.js:367:11\n    at D:\\VS\\WEB\\Project\\ToDo\\node_modules\\loader-runner\\lib\\LoaderRunner.js:172:11\n    at loadLoader (D:\\VS\\WEB\\Project\\ToDo\\node_modules\\loader-runner\\lib\\loadLoader.js:32:11)\n    at iteratePitchingLoaders (D:\\VS\\WEB\\Project\\ToDo\\node_modules\\loader-runner\\lib\\LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (D:\\VS\\WEB\\Project\\ToDo\\node_modules\\loader-runner\\lib\\LoaderRunner.js:165:10)\n    at D:\\VS\\WEB\\Project\\ToDo\\node_modules\\loader-runner\\lib\\LoaderRunner.js:176:18\n    at loadLoader (D:\\VS\\WEB\\Project\\ToDo\\node_modules\\loader-runner\\lib\\loadLoader.js:47:3)\n    at iteratePitchingLoaders (D:\\VS\\WEB\\Project\\ToDo\\node_modules\\loader-runner\\lib\\LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (D:\\VS\\WEB\\Project\\ToDo\\node_modules\\loader-runner\\lib\\LoaderRunner.js:165:10)\n    at D:\\VS\\WEB\\Project\\ToDo\\node_modules\\loader-runner\\lib\\LoaderRunner.js:176:18\n    at loadLoader (D:\\VS\\WEB\\Project\\ToDo\\node_modules\\loader-runner\\lib\\loadLoader.js:47:3)\n    at iteratePitchingLoaders (D:\\VS\\WEB\\Project\\ToDo\\node_modules\\loader-runner\\lib\\LoaderRunner.js:169:2)\n    at runLoaders (D:\\VS\\WEB\\Project\\ToDo\\node_modules\\loader-runner\\lib\\LoaderRunner.js:365:2)\n    at NormalModule.doBuild (D:\\VS\\WEB\\Project\\ToDo\\node_modules\\webpack\\lib\\NormalModule.js:129:2)\n    at NormalModule.build (D:\\VS\\WEB\\Project\\ToDo\\node_modules\\webpack\\lib\\NormalModule.js:180:15)\n    at Compilation.buildModule (D:\\VS\\WEB\\Project\\ToDo\\node_modules\\webpack\\lib\\Compilation.js:142:10)\n    at D:\\VS\\WEB\\Project\\ToDo\\node_modules\\webpack\\lib\\Compilation.js:424:9\n    at D:\\VS\\WEB\\Project\\ToDo\\node_modules\\webpack\\lib\\NormalModuleFactory.js:242:4\n    at D:\\VS\\WEB\\Project\\ToDo\\node_modules\\webpack\\lib\\NormalModuleFactory.js:93:13\n    at D:\\VS\\WEB\\Project\\ToDo\\node_modules\\tapable\\lib\\Tapable.js:268:11\n    at NormalModuleFactory.<anonymous> (D:\\VS\\WEB\\Project\\ToDo\\node_modules\\webpack\\lib\\CompatibilityPlugin.js:52:5)\n    at NormalModuleFactory.applyPluginsAsyncWaterfall (D:\\VS\\WEB\\Project\\ToDo\\node_modules\\tapable\\lib\\Tapable.js:272:13)\n    at onDoneResolving (D:\\VS\\WEB\\Project\\ToDo\\node_modules\\webpack\\lib\\NormalModuleFactory.js:68:11)\n    at onDoneResolving (D:\\VS\\WEB\\Project\\ToDo\\node_modules\\webpack\\lib\\NormalModuleFactory.js:189:6)\n    at processTicksAndRejections (node:internal/process/task_queues:76:11)");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

$(document).ready(function () {
    // baffel is for text reveal animation 
    var text = baffle('.user--quotes p');
    text.set({
        characters: '▓░▒ ▒/░▒░ ▓██░ /▓░ /▒█░> ▓░▓▒ ░<▓ █░█▒ /░██',
        speed: 60
    });
    text.start();
    text.reveal(1200);

    // Materialize Initialization
    $('.modal').modal();
    $('.datepicker').datepicker();
    $('.timepicker').timepicker();
    $('.add--todo').click(function () {
        return $('.add--todo--form').trigger('reset');
    });
    $('.carousel').carousel({
        numVisible: 3,
        indicators: true
    });

    // listning for change event on checkbox
    $('.todo--checkbox').change(function () {
        var audio = document.querySelector('.audio');
        if (this.checked) audio.play();

        // posting the checkbox status in the API
        $.ajax({
            url: '/todo/' + $(this).data('value'),
            type: 'POST',
            data: {
                done: this.checked
            },
            success: setTimeout(function () {
                return location.reload();
            }, 200)
        });
    });

    // listning for click event for deleting the todo 
    $('.todo--delete').click(function () {
        $.ajax({
            url: '/deleteTodo/' + $(this).data('del'),
            type: 'POST',
            success: setTimeout(function () {
                return location.reload();
            }, 200)
        });
    });

    // hamBurger eventListner 
    $('.hamBurger').click(function () {
        $('.hamBurger').toggleClass('toggleCancel');
        $('.left--block').toggleClass('left--block--active');
    });

    // reloading the current time every minute 
    setInterval(function () {
        return $(".today--time").load(location.href + " .today--time");
    }, 60000);

    // reloading date every hour
    setInterval(function () {
        return $("h5.header").load(location.href + " h5.header");
    }, 3600000);
});

// fetching random quotes from API
$.get('https://api.quotable.io/random', function (data) {
    $('.random--quotes').text(data.content);
    $('.author').text('- ' + data.author);
    var _ref = [baffle('.random--quotes'), baffle('.author')],
        quotes = _ref[0],
        author = _ref[1],
        characters = 'abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()',
        speed = 60;

    quotes.set({
        characters: characters,
        speed: speed
    });
    author.set({
        characters: characters,
        speed: speed
    });
    quotes.start();
    author.start();
    quotes.reveal(1000);
    author.reveal(1000);
    $('.thoughts').addClass('card-panel');
});

/***/ })
/******/ ]);
//# sourceMappingURL=App.bundle.js.map