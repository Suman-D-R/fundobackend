"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var noteSchema = new _mongoose.Schema({
  user_id: {
    type: String
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  isAchive: {
    type: Boolean,
    "default": false
  },
  isDeleted: {
    type: Boolean,
    "default": false
  },
  color: {
    type: String
  }
});
var _default = exports["default"] = (0, _mongoose.model)('Note', noteSchema);