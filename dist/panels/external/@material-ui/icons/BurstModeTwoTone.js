"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _createSvgIcon = _interopRequireDefault(require("./utils/createSvgIcon"));

var _default = (0, _createSvgIcon.default)(_react.default.createElement(_react.default.Fragment, null, _react.default.createElement("path", {
  d: "M11 17h10V7H11v10zm3-3.53l1.43 1.72 2-2.58L20 15.99h-8l2-2.52z",
  opacity: ".3"
}), _react.default.createElement("path", {
  d: "M1 5h2v14H1zM5 5h2v14H5zM22 5H10c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zm-1 12H11V7h10v10z"
}), _react.default.createElement("path", {
  d: "M17.43 12.62l-2 2.57L14 13.47l-2 2.52h8z"
})), 'BurstModeTwoTone');

exports.default = _default;