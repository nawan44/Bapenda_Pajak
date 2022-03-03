"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _SliderConstants = require("../constants/SliderConstants");

var _default = _propTypes["default"].oneOf([_SliderConstants.HORIZONTAL, _SliderConstants.VERTICAL]);

exports["default"] = _default;