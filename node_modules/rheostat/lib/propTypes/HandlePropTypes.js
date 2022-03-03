"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleDefaultProps = exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _default = {
  'aria-valuemax': _propTypes["default"].number,
  'aria-valuemin': _propTypes["default"].number,
  'aria-valuenow': _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  'aria-disabled': _propTypes["default"].bool,
  'data-handle-key': _propTypes["default"].node,
  orientation: _propTypes["default"].string,
  disabled: _propTypes["default"].bool,
  onClick: _propTypes["default"].func,
  onKeyDown: _propTypes["default"].func,
  onMouseDown: _propTypes["default"].func,
  onTouchStart: _propTypes["default"].func,
  handleRef: _propTypes["default"].func,
  role: _propTypes["default"].string,
  style: _propTypes["default"].object,
  tabIndex: _propTypes["default"].oneOf([-1, 0])
};
exports["default"] = _default;
var handleDefaultProps = {
  handleRef: null,
  orientation: 'horizontal',
  disabled: false,
  'aria-valuenow': undefined,
  'data-handle-key': undefined,
  'aria-valuemax': undefined,
  'aria-valuemin': undefined,
  'aria-disabled': undefined,
  onClick: undefined,
  onKeyDown: undefined,
  onMouseDown: undefined,
  onTouchStart: undefined,
  role: undefined,
  tabIndex: undefined
};
exports.handleDefaultProps = handleDefaultProps;