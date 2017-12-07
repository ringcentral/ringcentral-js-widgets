import React from 'react';
import PropTypes from 'prop-types';
import { parse as parseDoctrine } from 'doctrine';

import Markdown from '../Markdown';

import styles from './styles.scss';

function generatePropType(type) {
  let values;
  switch (type.name) {
    case 'func':
      return 'function';

    case 'custom':
      return type.raw;

    case 'enum':
    case 'union':
      values = type.value.map(v => v.value || v.name).join('<br>&nbsp;');
      return `${type.name}:<br>&nbsp;${values}<br>`;

    default:
      return type.name;
  }
}

function generateDescription(required, description, type) {
  const parsed = parseDoctrine(description);

  const jsDocText = parsed.description.replace(/\n\n/g, '<br>').replace(/\n/g, ' ');

  if (parsed.tags.some(tag => tag.title === 'ignore')) return null;
  let signature = '';

  if (type.name === 'func' && parsed.tags.length > 0) {
    // Remove new lines from tag descriptions to avoid markdown errors.
    parsed.tags.forEach((tag) => {
      if (tag.description) {
        tag.description = tag.description.replace(/\n/g, ' ');
      }
    });

    const parsedLength = parsed.tags.length;
    let parsedArgs = [];
    let parsedReturns;

    if (parsed.tags[parsedLength - 1].title === 'returns') {
      parsedArgs = parsed.tags.slice(0, parsedLength - 1);
      parsedReturns = parsed.tags[parsedLength - 1];
    } else {
      parsedArgs = parsed.tags;
      parsedReturns = { type: { name: 'void' } };
    }

    signature += '<br><br>**Signature:**<br>`function(';
    signature += parsedArgs.map(tag => `${tag.name}: ${tag.type.name}`).join(', ');
    signature += `) => ${parsedReturns.type.name}\`<br>`;
    signature += parsedArgs.map(tag => `*${tag.name}:* ${tag.description}`).join('<br>');
    if (parsedReturns.description) {
      signature += `<br> *returns* (${parsedReturns.type.name}): ${parsedReturns.description}`;
    }
  }

  return `${jsDocText}${signature}`;
}

function PropTypeDescription(props) {
  const {
    componentInfo,
    header,
  } = props;
  if (!componentInfo.props) {
    return null;
  }
  let requiredProps = 0;

  let text = `${header}
| Name | Type | Default | Description |
|:-----|:-----|:-----|:-----|\n`;

  Object.keys(componentInfo.props).forEach((key) => {
    const prop = componentInfo.props[key];
    const description = generateDescription(prop.required, prop.description, prop.type);

    if (description === null) {
      return;
    }

    let defaultValue = '';

    if (prop.defaultValue) {
      defaultValue = prop.defaultValue.value.replace(/\n/g, '');
    }

    if (prop.required) {
      key = `<span style="color: #31a148">${key} *</span>`;
      requiredProps += 1;
    }

    text += `| ${key} | ${generatePropType(prop.type)} | ${defaultValue} | ${description} |\n`;
  });

  text += 'Other properties (not documented) are applied to the root element.';

  let requiredPropFootnote = '';
  if (requiredProps === 1) {
    requiredPropFootnote = '* required property';
  } else if (requiredProps > 1) {
    requiredPropFootnote = '* required properties';
  }

  return (
    <div className={styles.propTypeDescription}>
      <Markdown text={text} />
      <div className={styles.footnote}>
        {requiredPropFootnote}
      </div>
    </div>
  );
}

PropTypeDescription.propTypes = {
  componentInfo: PropTypes.object.isRequired,
  header: PropTypes.string.isRequired,
};

PropTypeDescription.defaultProps = {
  header: '### Properties',
};

export default PropTypeDescription;
