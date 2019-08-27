import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import MeetingPanel from '../MeetingPanel';
import ConferencePanel from '../ConferencePanel';
import Header from '../Header';
import Footer from '../Footer';
import meetingEnum from '../constants/meetingEnum';
import meetingModeEnum from '../constants/meetingModeEnum';
import styles from './styles.scss';
import { ThemeConsumer } from '../commons/themeContext';

class PopupModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveAsDefault: false,
    };
  }

  onChange = (checked) => {
    this.setState({
      saveAsDefault: checked,
    });
  }

  onSubmit = async () => {
    const datas = this.refPanel.getDatas();
    if (!datas) {
      return false;
    }

    await this.onClose();
    const {
      meetingType,
      meeting,
      _saved,
      mode,
      submit,
    } = this.props;
    let notShowAgain = (meetingType === meetingEnum.videoCall) ? meeting._saved : _saved;
    const { saveAsDefault } = this.state;
    if (saveAsDefault && mode === meetingModeEnum.add) {
      notShowAgain = true;
    }
    const data = Object.assign(datas, this.state);
     // eslint-disable-line
    return submit({
      ...data,
      notShowAgain,
    });
  }

  onClose = (args) => {
    this.props.close(args); // eslint-disable-line
  }

  render() {
    const {
      i18n, mode, meetingType, updateEnableJoinBeforeHost,
    } = this.props;

    const { saveAsDefault } = this.state;

    const footerValues = {
      [meetingModeEnum.add]: {
        checkboxText: i18n.saveAsDefaultAndNotShowAgain,
        saveButtonText: i18n.done
      },
      [meetingModeEnum.edit]: {
        checkboxText: i18n.saveAsDefault,
        saveButtonText: i18n.update
      },
    }[mode];

    return (
      <div className={styles.outter}>
        <div className={styles.mask} />
        <div className={styles.wrapper}>
          <div
            className={classnames(styles.container, {
              [styles.meeting]: meetingType === meetingEnum.videoCall,
              [styles.conference]: meetingType === meetingEnum.conferenceCall,
            })}
            data-sign="popupModalContainer"
          >
            <Header onClose={() => this.onClose({ cancel: true })} i18n={i18n} />
            {meetingType === meetingEnum.videoCall && (
              <MeetingPanel
                {...this.props}
                ref={(c) => { this.refPanel = c; }}
              />
            )}
            {meetingType === meetingEnum.conferenceCall && (
              <ConferencePanel
                {...this.props}
                ref={(c) => { this.refPanel = c; }}
                updateEnableJoinBeforeHost={updateEnableJoinBeforeHost}
              />
            )}
            <Footer
              onCheckboxChange={this.onChange}
              saveAsDefault={saveAsDefault}
              footerValues={footerValues}
              onSubmit={this.onSubmit}
            />
          </div>
        </div>
      </div>
    );
  }
}

PopupModal.propTypes = {
  theme: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  meetingType: PropTypes.string.isRequired,
  meeting: PropTypes.object,
  mode: PropTypes.string,
  submit: PropTypes.func,
  updateEnableJoinBeforeHost: PropTypes.func,
  _saved: PropTypes.bool,
};

PopupModal.defaultProps = {
  meeting: {},
  mode: meetingModeEnum.add,
  submit: i => i,
  updateEnableJoinBeforeHost: i => i,
  _saved: false,
};

export default ThemeConsumer(PopupModal);
