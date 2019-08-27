import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../Button';
import { ThemeConsumer } from '../commons/themeContext';
import Checkbox from '../Checkbox';
import styles from './styles.scss';

function Footer(props) {
  const {
    saveAsDefault, onCheckboxChange, footerValues, onSubmit
  } = props;

  return (
    <div className={styles.footer}>
      <Checkbox
        size="default"
        className={styles.msCheckbox}
        onChange={onCheckboxChange}
        checked={saveAsDefault}
        label={footerValues.checkboxText}
      />
      <Button
        className={styles.newUiButton}
        disabledClassName={styles.isDisabled}
        onClick={onSubmit}
        dataSign="schedule"
      >
        {footerValues.saveButtonText}
      </Button>
    </div>
  );
}

Footer.propTypes = {
  saveAsDefault: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  footerValues: PropTypes.object.isRequired,
};

export default ThemeConsumer(Footer);
