"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var userController = _interopRequireWildcard(require("../controllers/user.controller"));
var userUtils = _interopRequireWildcard(require("../utils/user.util"));
var _user3 = require("../validators/user.validator");
var _auth = require("../middlewares/auth.middleware");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var router = _express["default"].Router();
router.get('', _auth.userAuth, userController.getUserDetails);

//route to create a new user
router.post('', _user3.newUserValidator, userController.userRegistration);

//route to login user
router.post('/login', userController.loginUser);

//route to forget password
router.post('/forgetpassword', userController.forgetpassword);

//route to reset password
router.post('/resetpassword', _user3.passwordValidater, _auth.userForgetAuth, userController.resetPassword);
var _default = exports["default"] = router;