"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _redis = require("../config/redis");
var cacheMiddleware = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var uniqueKey, cachedData;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          uniqueKey = req.body.user_id;
          console.log(uniqueKey);
          _context.prev = 2;
          _context.next = 5;
          return _redis.client.get(uniqueKey);
        case 5:
          cachedData = _context.sent;
          if (!cachedData) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", res.json({
            code: HttpStatus.OK,
            data: JSON.parse(cachedData),
            message: 'Data retrieved from cache'
          }));
        case 8:
          next();
          _context.next = 15;
          break;
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](2);
          console.error('Error retrieving data from cache', _context.t0);
          next();
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 11]]);
  }));
  return function cacheMiddleware(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var _default = exports["default"] = cacheMiddleware;