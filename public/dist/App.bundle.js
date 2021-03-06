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

// removed by extract-text-webpack-plugin

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

    // $('.change-theme').click(() => {
    //     document.documentElement.style.setProperty('--bgColor', '#212425');
    //     document.documentElement.style.setProperty('--bgColor2', '#181A1B');
    //     document.documentElement.style.setProperty('--defaultTextColor', '#E8E6E3');
    //     document.documentElement.style.setProperty('--borderColor', '#3E4345');
    // });

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