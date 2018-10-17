import React from 'react';
import PropTypes from 'prop-types';

export default function GlipGroupName({
  group,
  showNumber,
}) {
  let name = group.name;
  if (!name && group.detailMembers) {
    let noMes = group.detailMembers.filter(m => !m.isMe);
    if (noMes.length === 0) {
      noMes = group.detailMembers;
    }
    const names = noMes.map(p =>
      `${p.firstName ? p.firstName : ''} ${p.lastName ? p.lastName : ''}`
    );
    name = names.join(', ');
  }
  let number;
  if (showNumber && group.members && group.members.length > 2) {
    number = ` (${group.members.length})`;
  }
  return (
    <span>{name}{number}</span>
  );
}

GlipGroupName.propTypes = {
  group: PropTypes.object.isRequired,
  showNumber: PropTypes.bool,
};

GlipGroupName.defaultProps = {
  showNumber: false,
};
