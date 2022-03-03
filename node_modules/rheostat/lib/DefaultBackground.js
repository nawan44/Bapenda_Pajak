"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _airbnbPropTypes = require("airbnb-prop-types");

var _reactWithStyles = require("react-with-styles");

var _SliderConstants = require("./constants/SliderConstants");

var _OrientationPropType = _interopRequireDefault(require("./propTypes/OrientationPropType"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var propTypes = (0, _airbnbPropTypes.forbidExtraProps)(_objectSpread({}, _reactWithStyles.withStylesPropTypes, {
  orientation: _OrientationPropType["default"]
}));
var defaultProps = {
  orientation: _SliderConstants.HORIZONTAL
};

function DefaultBackground(_ref) {
  var css = _ref.css,
      orientation = _ref.orientation,
      styles = _ref.styles;
  return _react["default"].createElement("div", css(styles.DefaultBackground, orientation === _SliderConstants.VERTICAL ? styles.DefaultBackground_background__vertical : styles.DefaultBackground_background__horizontal));
}

DefaultBackground.propTypes = propTypes;
DefaultBackground.defaultProps = defaultProps;

var _default = (0, _reactWithStyles.withStyles)(function (_ref2) {
  var _ref2$rheostat = _ref2.rheostat,
      color = _ref2$rheostat.color,
      unit = _ref2$rheostat.unit;
  return {
    DefaultBackground: {
      backgroundColor: color.white,
      height: 2 * unit - 1,
      width: '100%',
      border: "1px solid ".concat(color.grey),
      position: 'relative'
    },
    DefaultBackground_background__horizontal: {
      height: 2 * unit - 1,
      top: -2,
      left: -2,
      bottom: 4,
      width: '100%'
    },
    DefaultBackground_background__vertical: {
      width: 2 * unit - 1,
      top: 0,
      height: '100%'
    }
  };
})(DefaultBackground);

exports["default"] = _default;