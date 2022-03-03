"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  getPosition: function getPosition(value, min, max) {
    return (value - min) / (max - min) * 100;
  },
  getValue: function getValue(pos, min, max) {
    var decimal = pos / 100;

    if (pos === 0) {
      return min;
    }

    if (pos === 100) {
      return max;
    }

    return Math.round((max - min) * decimal + min);
  }
};
exports["default"] = _default;