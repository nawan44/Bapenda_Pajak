"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var core = {
  black: 'black',
  white: '#fcfcfc',
  grey: '#d8d8d8',
  teal: '#abc4e8',
  lightgrey: '#dbdbdb'
};
var DefaultTheme = {
  rheostat: {
    unit: 8,
    responsive: {
      mediumAndAbove: '@media (min-width: 744px)',
      largeAndAbove: '@media (min-width: 1128px)'
    },
    constants: {
      DEFAULT_HANDLE_WIDTH: 1.5,
      BACKGROUND_HEIGHT: 0.25
    },
    color: _objectSpread({}, core, {
      progressBar: core.teal,
      focus: core.teal,
      textDisabled: core.lightgrey,
      buttons: {
        defaultDisabledColor: core.lightgrey
      }
    })
  }
};
var _default = DefaultTheme;
exports["default"] = _default;