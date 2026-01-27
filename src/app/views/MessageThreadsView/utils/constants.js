"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assignmentOptions = exports.assignmentOptionMap = void 0;
var assignmentOptionMap = exports.assignmentOptionMap = {
  currentUser: {
    value: '__CURRENT_USER__',
    labelKey: 'assignedToMe',
    dataSign: 'assignmentMenuAssignedToMe'
  },
  assignedToOthers: {
    value: '__ASSIGNED_TO_OTHERS__',
    labelKey: 'assignedToOthers',
    dataSign: 'assignmentMenuAssignedToOthers'
  },
  unassigned: {
    value: '__UNASSIGNED__',
    labelKey: 'unassigned',
    dataSign: 'assignmentMenuUnassigned'
  }
};
var assignmentOptions = exports.assignmentOptions = [assignmentOptionMap.currentUser, assignmentOptionMap.assignedToOthers, assignmentOptionMap.unassigned];
//# sourceMappingURL=constants.js.map
