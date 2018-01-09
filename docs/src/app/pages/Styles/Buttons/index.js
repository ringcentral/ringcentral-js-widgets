import React from 'react';

import Markdown from '../../../components/Markdown';
import styles from './styles.scss';

function ButtonsWrapper(props) {
  const style = {
    width: `${props.width}px`,
    height: `${props.height}px`,
    lineHeight: `${props.height}px`,
    borderRadius: `${props.cornerRadius}px`,
    color: props.textColor,
    fontSize: `${props.textSize}px`,
  };
  const buttons = ['normal', 'hover', 'pressed', 'disable'].map((type) => {
    let buttonStyle = { ...style };
    if (props[`${type}Style`]) {
      buttonStyle = {
        ...style,
        ...(props[`${type}Style`])
      };
    }
    return (
      <div
        key={type}
        className={styles.button}
        style={buttonStyle}
      >
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </div>
    );
  });
  const fillDesriptions = ['normal', 'hover', 'pressed', 'disable'].map((type) => {
    const typeStyle = props[`${type}Style`];
    const name = type.charAt(0).toUpperCase() + type.slice(1);
    return (
      <div>
        <div className={styles.descriptionLine} key={type}>
          {name} fill color: {typeStyle.backgroundName} {typeStyle.background}
        </div>
        {
          typeStyle.borderColorName && (
            <div className={styles.descriptionLine}>
              {name} border color: {typeStyle.borderColorName}
            </div>
          )
        }
        {
          typeStyle.colorName && (
            <div className={styles.descriptionLine}>
              {name} Text: {props.textSize} {typeStyle.colorName} {typeStyle.color}
            </div>
          )
        }
      </div>
    );
  });
  return (
    <div className={styles.buttonsWrapperRoot}>
      <div className={styles.wrapperTitle}>{props.title}</div>
      <div className={styles.wrapperButtonList}>
        {buttons}
      </div>
      <div className={styles.description}>
        <div className={styles.descriptionLine}>
          Minumum width: {props.width}
        </div>
        <div className={styles.descriptionLine}>
          Height: {props.height}
        </div>
        <div className={styles.descriptionLine}>
          Corner radius: {props.cornerRadius}
        </div>
        {
          props.textColor && (
            <div className={styles.descriptionLine}>
              Text: {props.textSize} {props.textColorName} {props.textColor}
            </div>
          )
        }
        { fillDesriptions }
      </div>
    </div>
  );
}

const primaryButtonInPage = {
  title: 'Primary button in the page',
  width: 260,
  height: 35,
  cornerRadius: 100,
  textSize: 13,
  textColor: '#FFFFFF',
  textColorName: 'Regular Snow',
  normalStyle: {
    background: '#0684BD',
    backgroundName: 'RC Blue'
  },
  hoverStyle: {
    background: '#389DCA',
    backgroundName: 'Sea'
  },
  pressedStyle: {
    background: '#0570A1',
    backgroundName: 'Marine'
  },
  disableStyle: {
    background: '#C7C7C7',
    backgroundName: 'Smoke'
  }
};

const secondaryButtonInPage = {
  title: 'Secondary button in the page',
  width: 260,
  height: 35,
  cornerRadius: 100,
  textSize: 13,
  normalStyle: {
    background: 'transparent',
    color: '#0684BD',
    border: 'solid 1px rgba(6, 132, 189, 0.5)',
    borderColorName: '50% RC Blue #0684BD'
  },
  hoverStyle: {
    color: '#FFFFFF',
    background: '#389DCA',
    backgroundName: 'Sea'
  },
  pressedStyle: {
    color: '#FFFFFF',
    background: '#0570A1',
    backgroundName: 'Marine'
  },
  disableStyle: {
    background: '#FFFFFF',
    backgroundName: 'Snow',
    color: '#C7C7C7',
    colorName: 'Smoke',
    border: 'solid 1px #C7C7C7',
    borderColorName: '50% Smoke #C7C7C7'
  }
};

const primaryButtonInPopup = {
  title: 'Primary button in the popup',
  width: 70,
  height: 28,
  cornerRadius: 100,
  textSize: 13,
  textColor: '#FFFFFF',
  textColorName: 'Regular Snow',
  normalStyle: {
    background: '#0684BD',
    backgroundName: 'RC Blue'
  },
  hoverStyle: {
    background: '#389DCA',
    backgroundName: 'Sea'
  },
  pressedStyle: {
    background: '#0570A1',
    backgroundName: 'Marine'
  },
  disableStyle: {
    background: '#C7C7C7',
    backgroundName: 'Smoke'
  }
};

const secondaryButtonInPopup = {
  title: 'Secondary button in the popup',
  width: 70,
  height: 28,
  cornerRadius: 100,
  textSize: 13,
  normalStyle: {
    background: 'transparent',
    color: '#0684BD',
    colorName: 'RC Blue',
    border: 'solid 1px rgba(6, 132, 189, 0.5)',
    borderColorName: '50% RC Blue #0684BD'
  },
  hoverStyle: {
    color: '#FFFFFF',
    background: '#389DCA',
    backgroundName: 'Sea'
  },
  pressedStyle: {
    color: '#FFFFFF',
    background: '#0570A1',
    backgroundName: 'Marine'
  },
  disableStyle: {
    background: '#FFFFFF',
    backgroundName: 'Snow',
    color: '#C7C7C7',
    colorName: 'Smoke',
    border: 'solid 1px #C7C7C7'
  }
};

function ButtonsPage() {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        Button
      </div>
      <div className={styles.subHeader}>Size & Specs</div>
      <div className={styles.buttonListGroup}>
        <div className={styles.buttonList}>
          <ButtonsWrapper {...primaryButtonInPage} />
        </div>
        <div className={styles.buttonList}>
          <ButtonsWrapper {...secondaryButtonInPage} />
        </div>
      </div>
      <div className={styles.clearLine} />
      <div className={styles.buttonListGroup}>
        <div className={styles.buttonList}>
          <div
            className={styles.button}
            style={{
              width: 260,
              height: 35,
              lineHeight: 35,
              borderRadius: 100,
              fontSize: 13,
              color: '#FFFFFF',
              background: '#0684BD',
            }}
          >
            Normal
          </div>
        </div>
        <div className={styles.buttonList}>
          Test
        </div>
      </div>
      <div className={styles.clearLine} />
      <div className={styles.buttonListGroup}>
        <div className={styles.buttonList}>
          <ButtonsWrapper {...primaryButtonInPopup} />
        </div>
        <div className={styles.buttonList}>
          <ButtonsWrapper {...secondaryButtonInPopup} />
        </div>
      </div>
    </div>
  );
}

export default ButtonsPage;
