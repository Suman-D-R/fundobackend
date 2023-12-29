"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateNote = exports.getNotes = exports.getAllNotes = exports.deleteforever = exports.deleteNote = exports.colorNote = exports.addNote = exports.achiveNote = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _note = _interopRequireDefault(require("../models/note.model"));
var _redis = require("../config/redis");
var addNote = exports.addNote = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(noteData, userId) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          noteData.user_id = userId;
          _context.next = 4;
          return _note["default"].create(noteData);
        case 4:
          data = _context.sent;
          if (data) {
            _context.next = 7;
            break;
          }
          throw new Error('Error creating note. Note data may be invalid.');
        case 7:
          return _context.abrupt("return", data);
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          throw new Error('Add note error: ' + _context.t0.message);
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 10]]);
  }));
  return function addNote(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getAllNotes = exports.getAllNotes = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(userId) {
    var data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _note["default"].find({
            user_id: userId
          });
        case 3:
          data = _context2.sent;
          return _context2.abrupt("return", data);
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          throw new Error('Error fetching all notes: ' + _context2.t0.message);
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function getAllNotes(_x3) {
    return _ref2.apply(this, arguments);
  };
}();
var getNotes = exports.getNotes = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(noteId, userId) {
    var data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _note["default"].findById(noteId);
        case 3:
          data = _context3.sent;
          return _context3.abrupt("return", data);
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          throw new Error('Error fetching all notes: ' + _context3.t0.message);
        case 10:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function getNotes(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();
var updateNote = exports.updateNote = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(noteId, updatedData, userId) {
    var data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _note["default"].findByIdAndUpdate(noteId, updatedData, {
            "new": true
          });
        case 3:
          data = _context4.sent;
          return _context4.abrupt("return", data);
        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          throw new Error('Error  updating note: ' + _context4.t0.message);
        case 10:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return function updateNote(_x6, _x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var deleteNote = exports.deleteNote = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(noteId, userId) {
    var currentNote, updatedData;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _note["default"].findById(noteId);
        case 3:
          currentNote = _context5.sent;
          if (currentNote) {
            _context5.next = 6;
            break;
          }
          throw new Error('Note not found');
        case 6:
          _context5.next = 8;
          return _note["default"].findByIdAndUpdate(noteId, {
            isDeleted: !currentNote.isDeleted
          }, {
            "new": true
          });
        case 8:
          updatedData = _context5.sent;
          return _context5.abrupt("return", updatedData);
        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](0);
          throw new Error('Error  deleting note: ' + _context5.t0.message);
        case 15:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 12]]);
  }));
  return function deleteNote(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var achiveNote = exports.achiveNote = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(noteId, userId) {
    var currentNote, updatedData;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _note["default"].findById(noteId);
        case 3:
          currentNote = _context6.sent;
          if (currentNote) {
            _context6.next = 6;
            break;
          }
          throw new Error('Note not found');
        case 6:
          console.log('hello', currentNote);
          _context6.next = 9;
          return _note["default"].findOneAndUpdate({
            _id: noteId
          }, {
            $set: {
              isAchive: !currentNote.isAchive
            }
          }, {
            "new": true
          });
        case 9:
          updatedData = _context6.sent;
          return _context6.abrupt("return", updatedData);
        case 13:
          _context6.prev = 13;
          _context6.t0 = _context6["catch"](0);
          throw new Error('Error  achiving note: ' + _context6.t0.message);
        case 16:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 13]]);
  }));
  return function achiveNote(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var colorNote = exports.colorNote = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(noteId, data) {
    var currentNote, updatedData;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return _note["default"].findById(noteId);
        case 3:
          currentNote = _context7.sent;
          if (currentNote) {
            _context7.next = 6;
            break;
          }
          throw new Error('Note not found');
        case 6:
          _context7.next = 8;
          return _note["default"].findOneAndUpdate({
            _id: noteId
          }, {
            $set: {
              color: data.color
            }
          }, {
            "new": true
          });
        case 8:
          updatedData = _context7.sent;
          return _context7.abrupt("return", updatedData);
        case 12:
          _context7.prev = 12;
          _context7.t0 = _context7["catch"](0);
          throw new Error('Error  achiving note: ' + _context7.t0.message);
        case 15:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 12]]);
  }));
  return function colorNote(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var deleteforever = exports.deleteforever = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(noteId, userId) {
    var data;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _note["default"].findByIdAndDelete(noteId);
        case 3:
          data = _context8.sent;
          return _context8.abrupt("return", data);
        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          throw new Error('Error  achiving note: ' + _context8.t0.message);
        case 10:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 7]]);
  }));
  return function deleteforever(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();