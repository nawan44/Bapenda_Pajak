"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  getPosition: function getPosition(x, min, max) {
    return Math.pow(max / (max - min), 0.5) * Math.pow((x - min) / max, 0.5) * 100;
  },
  getValue: function getValue(x, min, max) {
    return Math.round(Math.pow(x / 100, 2) * (max - min)) + min;
  }
};
exports["default"] = _default;