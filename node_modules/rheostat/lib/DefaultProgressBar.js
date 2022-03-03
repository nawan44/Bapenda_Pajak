"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _airbnbPropTypes = require("airbnb-prop-types");

var _react = _interopRequireDefault(require("react"));

var _reactWithStyles = require("react-with-styles");

var _SliderConstants = require("./constants/SliderConstants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var propTypes = (0, _airbnbPropTypes.forbidExtraProps)(_objectSpread({}, _reactWithStyles.withStylesPropTypes, {
  orientation: _propTypes["default"].string,
  disabled: _propTypes["default"].bool,
  style: _propTypes["default"].object
}));
var defaultProps = {
  orientation: _SliderConstants.HORIZONTAL,
  disabled: false,
  style: {}
};

function DefaultProgressBar(_ref) {
  var css = _ref.css,
      styles = _ref.styles,
      theme = _ref.theme,
      orientation = _ref.orientation,
      disabled = _ref.disabled,
      style = _ref.style,
      passProps = (0, _objectWithoutProperties2["default"])(_ref, ["css", "styles", "theme", "orientation", "disabled", "style"]);
  return _react["default"].createElement("div", (0, _extends2["default"])({}, css.apply(void 0, [styles.DefaultProgressBar_progressBar].concat((0, _toConsumableArray2["default"])(orientation === _SliderConstants.VERTICAL ? [styles.DefaultProgressBar__vertical, styles.DefaultProgressBar_background__vertical, styles.DefaultProgressBar_progressBar__vertical] : [styles.DefaultProgressBar_background__horizontal]), [disabled && styles.progressBar_disabled, style])), passProps));
}

DefaultProgressBar.propTypes = propTypes;
DefaultProgressBar.defaultProps = defaultProps;

var _default = (0, _reactWithStyles.withStyles)(function (_ref2) {
  var _ref2$rheostat = _ref2.rheostat,
      color = _ref2$rheostat.color,
      unit = _ref2$rheostat.unit;
  return {
    DefaultProgressBar__vertical: {
      width: 3 * unit,
      height: '100%'
    },
    DefaultProgressBar_progressBar: {
      backgroundColor: color.progressBar,
      position: 'absolute'
    },
    DefaultProgressBar_progressBar__vertical: {
      height: '100%',
      width: 3 * unit
    },
    DefaultProgressBar_background__vertical: {
      height: '100%',
      top: 0,
      width: 2 * unit - 1
    },
    DefaultProgressBar_background__horizontal: {
      height: 2 * unit - 3,
      top: 0
    }
  };
})(DefaultProgressBar);

exports["default"] = _default;