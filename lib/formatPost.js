"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.find");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.join");
require("core-js/modules/es.array.map");
require("core-js/modules/es.function.name");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.replace");
require("core-js/modules/es.string.split");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fomatFistLineWithMentions = fomatFistLineWithMentions;
exports.getPostAbstract = getPostAbstract;
var _isPicture = _interopRequireDefault(require("./isPicture"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function fomatFistLineWithMentions(text, mentions) {
  if (text === undefined || text === null) {
    return null;
  }
  var firstLine = text.split('\n')[0];
  if (mentions && mentions.length > 0) {
    mentions.forEach(function (mention) {
      firstLine = firstLine.replace("![:".concat(mention.type, "](").concat(mention.id, ")"), "@".concat(mention.name));
    });
  }
  return firstLine;
}
function getPostAbstract(post, members) {
  if (!post) {
    return null;
  }
  var formatedText;
  if (post.attachments && post.attachments.length > 0) {
    var attachment = post.attachments[0];
    if ((0, _isPicture["default"])(attachment.contentUri)) {
      formatedText = 'shared a picture';
    } else {
      formatedText = 'shared a file';
    }
  }
  if (post.type === 'PersonJoined') {
    formatedText = 'joined the team';
  }
  if (post.type === 'PersonsAdded') {
    var addedPersons = post.addedPersonIds.map(function (id) {
      var member = members.find(function (m) {
        return m.id === id;
      });
      var name = id;
      if (member) {
        name = "".concat(member.firstName).concat(member.lastName ? " ".concat(member.lastName) : '');
      }
      return "@".concat(name);
    });
    formatedText = "added ".concat(addedPersons.join(' '), " to the team");
  }
  if (!formatedText) {
    formatedText = fomatFistLineWithMentions(post.text, post.mentions);
  }
  return formatedText;
}
//# sourceMappingURL=formatPost.js.map
