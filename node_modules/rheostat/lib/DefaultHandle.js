"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.propTypes = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _airbnbPropTypes = require("airbnb-prop-types");

var _reactWithStyles = require("react-with-styles");

var _SliderConstants = require("./constants/SliderConstants");

var _HandlePropTypes = _interopRequireWildcard(require("./propTypes/HandlePropTypes"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var propTypes = (0, _airbnbPropTypes.forbidExtraProps)(_objectSpread({}, _reactWithStyles.withStylesPropTypes, {}, _HandlePropTypes["default"], {
  'aria-valuetext': _propTypes["default"].string,
  'aria-label': _propTypes["default"].string
}));
exports.propTypes = propTypes;

var defaultProps = _objectSpread({}, _HandlePropTypes.handleDefaultProps, {
  'aria-valuetext': undefined,
  'aria-label': undefined
});

function DefaultHandle(_ref) {
  var css = _ref.css,
      styles = _ref.styles,
      orientation = _ref.orientation,
      disabled = _ref.disabled,
      handleRef = _ref.handleRef,
      theme = _ref.theme,
      style = _ref.style,
      passProps = (0, _objectWithoutProperties2["default"])(_ref, ["css", "styles", "orientation", "disabled", "handleRef", "theme", "style"]);
  return _react["default"].createElement("button", (0, _extends2["default"])({
    type: "button",
    ref: handleRef
  }, css(styles.DefaultHandle_handle, orientation === _SliderConstants.VERTICAL ? styles.DefaultHandle_handle__vertical : styles.DefaultHandle_handle__horizontal, disabled && styles.DefaultHandle_handle__disabled, style), passProps));
}

DefaultHandle.propTypes = propTypes;
DefaultHandle.defaultProps = defaultProps;

var _default = (0, _reactWithStyles.withStyles)(function (_ref2) {
  var _ref2$rheostat = _ref2.rheostat,
      color = _ref2$rheostat.color,
      unit = _ref2$rheostat.unit,
      constants = _ref2$rheostat.constants;
  return {
    DefaultHandle_handle: {
      width: 2 * constants.DEFAULT_HANDLE_WIDTH * unit,
      height: 2 * constants.DEFAULT_HANDLE_WIDTH * unit,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: color.grey,
      backgroundColor: color.white,
      borderRadius: '20%',
      outline: 'none',
      zIndex: 2,
      boxShadow: "0 ".concat(unit / 4, "px ").concat(unit / 4, "px ").concat(color.textDisabled),
      ':focus': {
        boxShadow: "".concat(color.focus, " 0 0 1px 1px")
      },
      ':after': {
        content: '""',
        display: 'block',
        position: 'absolute',
        backgroundColor: '#dadfe8'
      },
      ':before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        backgroundColor: '#dadfe8'
      }
    },
    DefaultHandle_handle__horizontal: {
      marginLeft: -12,
      top: -5,
      ':before': {
        top: 7,
        height: 10,
        width: 1,
        left: 10
      },
      ':after': {
        top: 7,
        height: 10,
        width: 1,
        left: 13
      }
    },
    DefaultHandle_handle__vertical: {
      marginTop: -constants.DEFAULT_HANDLE_WIDTH * unit,
      left: (constants.BACKGROUND_HEIGHT - constants.DEFAULT_HANDLE_WIDTH) * unit,
      ':before': {
        top: 10
      },
      ':after': {
        top: 13,
        left: 8,
        height: 1,
        width: 10
      }
    },
    DefaultHandle_handle__disabled: {
      borderColor: color.buttons.defaultDisabledColor
    }
  };
})(DefaultHandle);

exports["default"] = _default;