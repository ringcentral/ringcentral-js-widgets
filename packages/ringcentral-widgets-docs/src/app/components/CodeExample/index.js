import React from 'react';
import PropTypes from 'prop-types';
import { parse } from 'react-docgen';

import Collapse from '../Collapse';
import Markdown from '../Markdown';

import styles from './styles.scss';

function CodeBlock(props) {
  const text = `\`\`\`js\n${props.code}\n\`\`\``;
  return (
    <Collapse
      className={styles.codeBlock}
      button={
        <div className={styles.codeTitle}>
          {props.title}
          <span className={styles.codeIcon}>{'< >'}</span>
        </div>
      }
    >
      <Markdown className={styles.markdown} text={text} />
    </Collapse>
  );
}

CodeBlock.propTypes = {
  code: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

function CodeExample(props) {
  const docs = parse(props.code);
  return (
    <div className={styles.root}>
      <CodeBlock code={props.code} title={props.title} />
      <Markdown className={styles.description} text={docs.description} />
      <div className={styles.showCase}>
        <div className={styles.clearFix} />
        {props.children}
        <div className={styles.clearFix} />
      </div>
    </div>
  );
}

CodeExample.propTypes = {
  code: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default CodeExample;
