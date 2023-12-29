"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordValidater = exports.newUserValidator = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _joi = _interopRequireDefault(require("@hapi/joi"));
var newUserValidator = exports.newUserValidator = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var schema, _schema$validate, error, value;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          schema = _joi["default"].object({
            firstName: _joi["default"].string().min(4).required(),
            lastName: _joi["default"].string().min(1).required(),
            email: _joi["default"].string().email().required(),
            password: _joi["default"].string().required(),
            confirmPassword: _joi["default"].string().valid(_joi["default"].ref('password')).required().error(new Error('Passwords do not match'))
          });
          _context.prev = 1;
          _schema$validate = schema.validate(req.body), error = _schema$validate.error, value = _schema$validate.value;
          if (!error) {
            _context.next = 5;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            status: 'error',
            message: error.message
          }));
        case 5:
          next();
          _context.next = 11;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          return _context.abrupt("return", res.status(500).json({
            status: 'error',
            message: _context.t0.message
          }));
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 8]]);
  }));
  return function newUserValidator(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var passwordValidater = exports.passwordValidater = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var schema, _schema$validate2, error, value;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          schema = _joi["default"].object({
            password: _joi["default"].string().required(),
            confirmPassword: _joi["default"].string().valid(_joi["default"].ref('password')).required().error(new Error('Passwords do not match'))
          });
          _context2.prev = 1;
          _schema$validate2 = schema.validate(req.body), error = _schema$validate2.error, value = _schema$validate2.value;
          if (!error) {
            _context2.next = 5;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            status: 'error',
            message: error.message
          }));
        case 5:
          next();
          _context2.next = 11;
          break;
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          return _context2.abrupt("return", res.status(500).json({
            status: 'error',
            message: _context2.t0.message
          }));
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 8]]);
  }));
  return function passwordValidater(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();