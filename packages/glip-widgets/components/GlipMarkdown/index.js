import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ReactMarkdown from 'react-markdown';
import Emojify from 'react-emojione';
import emojiones from '../../assets/images/emojione.png';

import styles from './styles.scss';

function ImageRender(props) {
  if (props.alt === ':Person' || props.alt === ':Team') {
    if (typeof props.atRender === 'function') {
      const AtRender = props.atRender;
      return <AtRender id={props.src} type={props.alt.replace(':', '')} />;
    }
    return <a href={`#${props.src}`}>@{props.src}</a>;
  }
  return <img src={props.src} alt={props.alt} />;
}

ImageRender.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  atRender: PropTypes.func,
};

ImageRender.defaultProps = {
  alt: undefined,
  atRender: undefined,
};

function LinkRender(props) {
  return (
    <a target="_blank" rel="noopener noreferrer" href={props.href} title={props.title}>
      {props.children}
    </a>
  );
}

LinkRender.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

LinkRender.defaultProps = {
  title: undefined,
};

function TextRender(props) {
  const children = props.children.map((child) => {
    if (child && child.split) {
      return child.split('\n').reduce((lines, line) => {
        if (lines.length > 0) {
          lines.push(<br />);
        }
        lines.push(line);
        return lines;
      }, []);
    }
    return child;
  });
  return (
    <p>
      <Emojify
        style={{
          backgroundImage: `url("${emojiones}")`,
        }}
      >
        {children}
      </Emojify>
    </p>
  );
}

TextRender.propTypes = {
  children: PropTypes.node.isRequired,
};

function Markdown({
  className,
  text,
  atRender,
}) {
  const renderers = {
    image: props => <ImageRender {...props} atRender={atRender} />,
    link: LinkRender,
    paragraph: TextRender,
  };
  return (
    <div className={classnames(styles.root, className)}>
      <ReactMarkdown
        className={styles['markdown-body']}
        source={text}
        renderers={renderers}
      />
    </div>
  );
  /* eslint-enable */
}

Markdown.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  atRender: PropTypes.func,
};

Markdown.defaultProps = {
  className: undefined,
  atRender: undefined,
};

export default Markdown;
