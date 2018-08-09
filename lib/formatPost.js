'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fomatFistLineWithMentions = fomatFistLineWithMentions;
exports.getPostAbstract = getPostAbstract;

var _isPicture = require('./isPicture');

var _isPicture2 = _interopRequireDefault(_isPicture);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fomatFistLineWithMentions(text, mentions) {
  if (text === undefined || text === null) {
    return null;
  }
  var firstLine = text.split('\n')[0];
  if (mentions && mentions.length > 0) {
    mentions.forEach(function (mention) {
      firstLine = firstLine.replace('![:' + mention.type + '](' + mention.id + ')', '@' + mention.name);
    });
  }
  return firstLine;
}

function getPostAbstract(post, members) {
  if (!post) {
    return null;
  }
  var formatedText = void 0;
  if (post.attachments && post.attachments.length > 0) {
    var attachment = post.attachments[0];
    if ((0, _isPicture2.default)(attachment.contentUri)) {
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
        name = '' + member.firstName + (member.lastName ? ' ' + member.lastName : '');
      }
      return '@' + name;
    });
    formatedText = 'added ' + addedPersons.join(' ') + ' to the team';
  }
  if (!formatedText) {
    formatedText = fomatFistLineWithMentions(post.text, post.mentions);
  }
  return formatedText;
}
//# sourceMappingURL=formatPost.js.map
