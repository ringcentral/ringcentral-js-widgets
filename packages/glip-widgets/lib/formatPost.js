import isPicture from './isPicture';

export function fomatFistLineWithMentions(text, mentions) {
  if (text === undefined || text === null) {
    return null;
  }
  let firstLine = text.split('\n')[0];
  if (mentions && mentions.length > 0) {
    mentions.forEach((mention) => {
      firstLine = firstLine.replace(`![:${mention.type}](${mention.id})`, `@${mention.name}`);
    });
  }
  return firstLine;
}

export function getPostAbstract(post, members) {
  if (!post) {
    return null;
  }
  let formatedText;
  if (post.attachments && post.attachments.length > 0) {
    const attachment = post.attachments[0];
    if (isPicture(attachment.contentUri)) {
      formatedText = 'shared a picture';
    } else {
      formatedText = 'shared a file';
    }
  }
  if (post.type === 'PersonJoined') {
    formatedText = 'joined the team';
  }
  if (post.type === 'PersonsAdded') {
    const addedPersons = post.addedPersonIds.map((id) => {
      const member = members.find(m => m.id === id);
      let name = id;
      if (member) {
        name = `${member.firstName}${member.lastName ? ` ${member.lastName}` : ''}`;
      }
      return `@${name}`;
    });
    formatedText = `added ${addedPersons.join(' ')} to the team`;
  }
  if (!formatedText) {
    formatedText = fomatFistLineWithMentions(post.text, post.mentions);
  }
  return formatedText;
}
