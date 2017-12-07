import React from 'react';

import Markdown from '../../../components/Markdown';
import styles from './styles.scss';

function ButtonItem({
  text,
  position,
  fillColor,
  fillColorName,
  height,
  cornerRadius,
  textSize,
  textColor,
  textColorName,
  borderColor,
  borderColorName,
}) {
  const style = {
    background: fillColor,
    height: `${height}px`,
    lineHeight: `${height}px`,
    borderRadius: `${cornerRadius}px`,
    color: textColor,
    fontSize: `${textSize}px`,
  };
  let borderText;
  if (borderColor) {
    style.border = `solid 1px ${borderColor}`;
    borderText = <p>Border: {borderColorName} {borderColor}</p>;
  }
  if (position === 'popup') {
    style.width = '65px';
  }
  return (
    <div className={styles.buttonItem}>
      <div className={styles.button} style={style}>{text}</div>
      <div className={styles.styleText}>
        <p>Fill Color: {fillColorName} {fillColor}</p>
        {borderText}
        <p>Height: {height}</p>
        <p>Corner radius: {cornerRadius}</p>
        <p>Text: {textSize} {textColorName} {textColor}</p>
      </div>
    </div>
  );
}

const pagePrimaryButtons = [{
  text: 'Normal',
  position: 'page',
  fillColor: '#0684BD',
  fillColorName: 'RC Bule',
  height: 35,
  cornerRadius: 100,
  textSize: 13,
  textColor: '#FFFFFF',
  textColorName: 'Regular Snow',
}, {
  text: 'Hover',
  position: 'page',
  fillColor: '#389DCA',
  fillColorName: 'Sea',
  height: 35,
  cornerRadius: 100,
  textSize: 13,
  textColor: '#FFFFFF',
  textColorName: 'Regular Snow',
}, {
  text: 'Pressed',
  position: 'page',
  fillColor: '#0570A1',
  fillColorName: 'Marine',
  height: 35,
  cornerRadius: 100,
  textSize: 13,
  textColor: '#FFFFFF',
  textColorName: 'Regular Snow',
}, {
  text: 'Disable',
  position: 'page',
  fillColor: '#C7C7C7',
  fillColorName: 'Smoke',
  height: 35,
  cornerRadius: 100,
  textSize: 13,
  textColor: '#FFFFFF',
  textColorName: 'Regular Snow',
}];

const pageSecondaryButtons = [{
  text: 'Normal',
  position: 'page',
  fillColor: '#FFFFFF',
  fillColorName: 'Regular Snow',
  borderColor: '#9BCEE5',
  borderColorName: 'Water',
  height: 35,
  cornerRadius: 100,
  textSize: 13,
  textColor: '#0684BD',
  textColorName: 'Regular RC Bule',
}, {
  text: 'Hover',
  position: 'page',
  fillColor: '#389DCA',
  fillColorName: 'Sea',
  height: 35,
  cornerRadius: 100,
  textSize: 13,
  textColor: '#FFFFFF',
  textColorName: 'Regular Snow',
}, {
  text: 'Pressed',
  position: 'page',
  fillColor: '#0570A1',
  fillColorName: 'Marine',
  height: 35,
  cornerRadius: 100,
  textSize: 13,
  textColor: '#FFFFFF',
  textColorName: 'Regular Snow',
}, {
  text: 'Disable',
  position: 'page',
  fillColor: '#FFFFFF',
  fillColorName: 'Regular Snow',
  height: 35,
  cornerRadius: 100,
  textSize: 13,
  textColor: '#C7C7C7',
  textColorName: 'Regular Smoke',
  borderColor: '#C7C7C7',
  borderColorName: 'Smoke',
}];

const popupPrimaryButtons = [{
  text: 'Normal',
  position: 'popup',
  fillColor: '#0684BD',
  fillColorName: 'RC Bule',
  height: 28,
  cornerRadius: 100,
  textSize: 13,
  textColor: '#FFFFFF',
  textColorName: 'Regular Snow',
}, {
  text: 'Hover',
  position: 'popup',
  fillColor: '#389DCA',
  fillColorName: 'Sea',
  height: 28,
  cornerRadius: 100,
  textSize: 13,
  textColor: '#FFFFFF',
  textColorName: 'Regular Snow',
}, {
  text: 'Pressed',
  position: 'popup',
  fillColor: '#0570A1',
  fillColorName: 'Marine',
  height: 28,
  cornerRadius: 100,
  textSize: 13,
  textColor: '#FFFFFF',
  textColorName: 'Regular Snow',
}, {
  text: 'Disable',
  position: 'popup',
  fillColor: '#C7C7C7',
  fillColorName: 'Smoke',
  height: 28,
  cornerRadius: 100,
  textSize: 13,
  textColor: '#FFFFFF',
  textColorName: 'Regular Snow',
}];

const popupSecondaryButtons = [{
  text: 'Normal',
  position: 'popup',
  fillColor: '#FFFFFF',
  fillColorName: 'Regular Snow',
  borderColor: '#9BCEE5',
  borderColorName: 'Water',
  height: 28,
  cornerRadius: 100,
  textSize: 13,
  textColor: '#0684BD',
  textColorName: 'Regular RC Bule',
}, {
  text: 'Hover',
  position: 'popup',
  fillColor: '#389DCA',
  fillColorName: 'Sea',
  height: 28,
  cornerRadius: 100,
  textSize: 13,
  textColor: '#FFFFFF',
  textColorName: 'Regular Snow',
}, {
  text: 'Pressed',
  position: 'popup',
  fillColor: '#0570A1',
  fillColorName: 'Marine',
  height: 28,
  cornerRadius: 100,
  textSize: 13,
  textColor: '#FFFFFF',
  textColorName: 'Regular Snow',
}, {
  text: 'Disable',
  position: 'popup',
  fillColor: '#FFFFFF',
  fillColorName: 'Regular Snow',
  height: 28,
  cornerRadius: 100,
  textSize: 13,
  textColor: '#C7C7C7',
  textColorName: 'Regular Smoke',
  borderColor: '#C7C7C7',
  borderColorName: 'Smoke',
}];
function ButtonsPage() {
  return (
    <div className={styles.root}>
      <Markdown
        text={'# Buttons\n'}
      />
      <div className={styles.header}>Page</div>
      <div className={styles.buttonListGroup}>
        <div className={styles.buttonList}>
          <div className={styles.subHeader}>Primary Button</div>
          {pagePrimaryButtons.map(button => <ButtonItem {...button} key={button.text} />)}
        </div>
        <div className={styles.buttonList}>
          <div className={styles.subHeader}>Secondary Button</div>
          {pageSecondaryButtons.map(button => <ButtonItem {...button} key={button.text} />)}
        </div>
      </div>
      <div className={styles.header}>Popup</div>
      <div className={styles.buttonListGroup}>
        <div className={styles.buttonList}>
          <div className={styles.subHeader}>Primary Button</div>
          {popupPrimaryButtons.map(button => <ButtonItem {...button} key={button.text} />)}
        </div>
        <div className={styles.buttonList}>
          <div className={styles.subHeader}>Secondary Button</div>
          {popupSecondaryButtons.map(button => <ButtonItem {...button} key={button.text} />)}
        </div>
      </div>
    </div>
  );
}

export default ButtonsPage;
