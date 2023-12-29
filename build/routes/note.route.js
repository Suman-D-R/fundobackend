"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var noteController = _interopRequireWildcard(require("../controllers/note.controller"));
var _auth = require("../middlewares/auth.middleware");
var _cache = _interopRequireDefault(require("../middlewares/cache.middleware"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var router = _express["default"].Router();

//route to create a new note
router.post('', _auth.userAuth, noteController.addNote);

//route to getallnotes note
router.get('', _auth.userAuth, _cache["default"], noteController.getAllNotes);

//route to getnotes note
router.get('/:_id', _auth.userAuth, _cache["default"], noteController.getNotes);

//route to update note
router.put('/:_id', _auth.userAuth, noteController.updateNote);

//route to deleteForEver a note
router["delete"]('/:_id', _auth.userAuth, _cache["default"], noteController.deleteforever);

//route to delete a note
router.put('/:_id/deleteNote', _auth.userAuth, noteController.deleteNote);

//route to achive a note
router.put('/:_id/achiveNote', _auth.userAuth, noteController.achiveNote);

//add color
router.put('/:_id/color', _auth.userAuth, noteController.colorNote);
var _default = exports["default"] = router;