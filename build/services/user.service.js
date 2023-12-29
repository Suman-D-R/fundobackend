"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRegistration = exports.resetPassword = exports.loginUser = exports.getUserDetails = exports.forgetpassword = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _user = _interopRequireDefault(require("../models/user.model"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var userUtils = _interopRequireWildcard(require("../utils/user.util"));
var _sender = require("../utils/sender");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
//login

var loginUser = exports.loginUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userDetails) {
    var user, passwordMatch, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _user["default"].findOne({
            email: userDetails.email
          });
        case 2:
          user = _context.sent;
          if (user) {
            _context.next = 5;
            break;
          }
          throw new Error('User not found');
        case 5:
          _context.next = 7;
          return _bcrypt["default"].compare(userDetails.password, user.password);
        case 7:
          passwordMatch = _context.sent;
          if (passwordMatch) {
            _context.next = 10;
            break;
          }
          throw new Error('Password not matched');
        case 10:
          token = _jsonwebtoken["default"].sign({
            _id: user._id,
            email: user.email
          }, process.env.SECRET_KEY); // sender(userDetails.email);
          return _context.abrupt("return", token);
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function loginUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

//create new user
var userRegistration = exports.userRegistration = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
    var email, hashedPassword, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _user["default"].findOne({
            email: body.email
          });
        case 2:
          email = _context2.sent;
          if (!email) {
            _context2.next = 5;
            break;
          }
          throw new Error('user alrady have an account');
        case 5:
          _context2.next = 7;
          return _bcrypt["default"].hash(body.password, 10);
        case 7:
          hashedPassword = _context2.sent;
          body.password = hashedPassword;
          _context2.next = 11;
          return _user["default"].create(body);
        case 11:
          data = _context2.sent;
          return _context2.abrupt("return", data);
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function userRegistration(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

//forget password
var forgetpassword = exports.forgetpassword = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(body) {
    var email, user, token;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          email = body.email;
          _context3.next = 4;
          return _user["default"].findOne({
            email: email
          });
        case 4:
          user = _context3.sent;
          if (user) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 7:
          token = _jsonwebtoken["default"].sign({
            userId: user._id
          }, process.env.SECRET_KEY_FORGET, {
            expiresIn: '1h'
          });
          return _context3.abrupt("return", userUtils.sendEmail(token, email));
        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            message: 'Internal server error'
          });
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 11]]);
  }));
  return function forgetpassword(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

//reset password
var resetPassword = exports.resetPassword = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(userDetails) {
    var password, _id, hashedPassword, user;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          password = userDetails.password;
          _id = userDetails._id;
          _context4.next = 5;
          return _bcrypt["default"].hash(password, 10);
        case 5:
          hashedPassword = _context4.sent;
          // Find the user by ID
          console.log(userDetails);
          _context4.next = 9;
          return _user["default"].findByIdAndUpdate(_id, {
            password: hashedPassword
          }, {
            "new": true
          });
        case 9:
          user = _context4.sent;
          if (user) {
            _context4.next = 12;
            break;
          }
          throw new Error('User not found');
        case 12:
          return _context4.abrupt("return", {
            message: 'Password reset successfully'
          });
        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](0);
          throw new Error('Internal server error: ' + _context4.t0.message);
        case 18:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 15]]);
  }));
  return function resetPassword(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
var getUserDetails = exports.getUserDetails = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(user_id) {
    var data;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _user["default"].findOne({
            _id: user_id
          });
        case 3:
          data = _context5.sent;
          console.log(data);
          return _context5.abrupt("return", data);
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          throw new Error('get userdetails error');
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 8]]);
  }));
  return function getUserDetails(_x5) {
    return _ref5.apply(this, arguments);
  };
}();