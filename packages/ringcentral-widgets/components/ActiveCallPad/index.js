import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import recordStatus from 'ringcentral-integration/modules/Webphone/recordStatus';
import { isObject } from 'ringcentral-integration/lib/di/utils/is_type';

import CircleButton from '../CircleButton';
import Tooltip from '../Tooltip';
import ActiveCallButton from '../ActiveCallButton';
import MuteIcon from '../../assets/images/Mute.svg';
import UnmuteIcon from '../../assets/images/Unmute.svg';
import KeypadIcon from '../../assets/images/Dialpad.svg';
import HoldIcon from '../../assets/images/Hold.svg';
// import ParkIcon from '../../assets/images/Park.svg';
import RecordIcon from '../../assets/images/Record.svg';
// import AddIcon from '../../assets/images/AddCall.svg';
import MoreIcon from '../../assets/images/MoreIcon.svg';
import TransferIcon from '../../assets/images/Transfer.svg';
import FlipIcon from '../../assets/images/Flip.svg';
import EndIcon from '../../assets/images/End.svg';
import CombineIcon from '../../assets/images/Combine.svg';
import MergeIcon from '../../assets/images/MergeIntoConferenceIcon.svg';
import callCtrlLayouts from '../../enums/callCtrlLayouts';
import styles from './styles.scss';
import i18n from './i18n';

const DisplayButtonNumber = 6;

function MoreActionItem({
  title,
  icon: Icon,
  disabled,
  onClick,
}) {
  const iconClassName = classnames(
    styles.buttonIcon,
    disabled ? styles.buttonDisabled : styles.buttonActive
  );
  return (
    <div
      className={styles.buttonItem}
      onClick={disabled ? null : onClick}>
      <div className={iconClassName}>
        {<Icon />}
      </div>
      <div className={styles.buttonName}>
        {title}
      </div>
    </div>
  );
}

MoreActionItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

class ActiveCallPad extends Component {
  constructor(props) {
    super(props);
    this.moreButton = createRef();
    this.dropdown = createRef();
    this.onClick = this:: this.onClick;
    this.toggleMore = this:: this.toggleMore;
    this.state = {
      expandMore: props.expandMore,
      moreButton: this.moreButton && this.moreButton.current,
    };
  }

  onClick(e) {
    if (isObject(this.dropdown) && isObject(this.dropdown.current)) {
      const { dom: { current } } = this.dropdown.current;

      if (
        !current.contains(e.target)
        && !this.moreButton.current.contains(e.target)
        && this.state.expandMore
      ) {
        this.setState({
          expandMore: false,
        });
      }
    }
  }

  toggleMore() {
    this.setState(prevState => ({
      expandMore: !prevState.expandMore
    }));
  }

  componentDidMount() {
    document.body.addEventListener('click', this.onClick);
    this.setState({
      moreButton: this.moreButton && this.moreButton.current,
    });
  }

  componentWillReceiveProps() {
    this.setState({
      moreButton: this.moreButton && this.moreButton.current,
    });
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.onClick);
  }

  render() {
    const buttons = [];

    /* --------------------- Mute/Unmute --------------------------- */
    buttons.push(this.props.isOnMute
      ? {
        icon: MuteIcon,
        title: i18n.getString('unmute', this.props.currentLocale),
        disabled: this.props.isOnHold,
        onClick: this.props.onUnmute,
      }
      : {
        icon: UnmuteIcon,
        title: i18n.getString('mute', this.props.currentLocale),
        disabled: this.props.isOnHold,
        onClick: this.props.onMute,
      }
    );

    /* --------------------- keyPad --------------------------- */
    buttons.push(
      {
        icon: KeypadIcon,
        title: i18n.getString('keypad', this.props.currentLocale),
        onClick: this.props.onShowKeyPad,
      }
    );

    /* --------------------- Hold/Unhold --------------------------- */
    buttons.push(
      {
        icon: HoldIcon,
        iconWidth: 120,
        iconHeight: 160,
        iconX: 190,
        iconY: 165,
        title: this.props.isOnHold
          ? i18n.getString('onHold', this.props.currentLocale)
          : i18n.getString('hold', this.props.currentLocale),
        active: this.props.isOnHold,
        onClick: this.props.isOnHold
          ? this.props.onUnhold
          : this.props.onHold,
      }
    );

    /* --------------------- Add/Merge --------------------------- */
    if (this.props.conferenceCallEquipped) {
      const showMerge = (
        this.props.layout === callCtrlLayouts.mergeCtrl ||
        (this.props.layout === callCtrlLayouts.normalCtrl && this.props.hasConferenceCall)
      );
      buttons.push(showMerge
        ? {
          icon: MergeIcon,
          title: i18n.getString('mergeToConference', this.props.currentLocale),
          disabled: this.props.mergeDisabled,
          onClick: this.props.onMerge,
          showRipple: !this.props.mergeDisabled,
        }
        : {
          icon: CombineIcon,
          title: i18n.getString('add', this.props.currentLocale),
          disabled: this.props.addDisabled,
          onClick: this.props.onAdd,
        }
      );
    }

    /* --------------------- Record/Stop --------------------------- */
    buttons.push(
      {
        icon: RecordIcon,
        title: this.props.recordStatus === recordStatus.recording
          ? i18n.getString('stopRecord', this.props.currentLocale)
          : i18n.getString('record', this.props.currentLocale),
        active: this.props.recordStatus === recordStatus.recording,
        disabled: (
          this.props.isOnHold
          || this.props.recordStatus === recordStatus.pending
          || this.props.layout === callCtrlLayouts.mergeCtrl
        ),
        onClick: this.props.recordStatus === recordStatus.recording
          ? this.props.onStopRecord
          : this.props.onRecord,
      }
    );

    /* --------------------- Transfer --------------------------- */
    const disabledTransfer = (
      this.props.layout === callCtrlLayouts.mergeCtrl
    );
    buttons.push(
      {
        icon: TransferIcon,
        title: i18n.getString('transfer', this.props.currentLocale),
        disabled: disabledTransfer,
        onClick: this.props.onToggleTransferPanel,
      }
    );

    /* --------------------- Flip --------------------------- */
    const disabledFlip = (
      this.props.flipNumbers.length === 0
      || this.props.isOnHold
      || this.props.layout === callCtrlLayouts.mergeCtrl
    );
    buttons.push(
      {
        icon: FlipIcon,
        title: i18n.getString('flip', this.props.currentLocale),
        disabled: disabledFlip,
        onClick: this.props.onShowFlipPanel,
      }
    );

    /* --------------------- More Actions --------------------------- */
    let moreActions = null;
    if (buttons.length > DisplayButtonNumber) {
      moreActions = (
        <span
          className={styles.moreButtonContainer}
          ref={this.moreButton}
        >
          <ActiveCallButton
            onClick={this.toggleMore}
            title={i18n.getString('more', this.props.currentLocale)}
            active={this.state.expandMore}
            className={classnames(styles.moreButton, styles.callButton)}
            disabled={disabledFlip && disabledTransfer}
            icon={MoreIcon} />
          <Tooltip
            fixed={false}
            open={this.state.expandMore}
            direction="top"
            ref={this.dropdown}
            triggerElm={this.state.moreButton}>
            <div className={styles.buttonPopup}>
              {
                buttons.slice(DisplayButtonNumber - 1).map(({
                  title,
                  ...opts
                }) => (<MoreActionItem
                  key={title}
                  title={title}
                  {...opts}
                />))
              }
            </div>
          </Tooltip>
        </span>
      );
    }

    return (
      <div className={classnames(styles.root, this.props.className)}>
        <div className={styles.callCtrlButtonGroup}>
          <div className={styles.buttonRow}>
            {
              buttons.slice(0, DisplayButtonNumber - (moreActions ? 1 : 0)).map(opts => (
                <ActiveCallButton
                  key={opts.title}
                  className={styles.callButton}
                  {...opts}
                />
              ))
            }
            {moreActions}
          </div>
        </div>
        <div className={classnames(styles.buttonRow, styles.stopButtonGroup)}>
          <div className={styles.button}>
            <CircleButton
              className={styles.stopButton}
              onClick={this.props.onHangup}
              icon={EndIcon}
              showBorder={false}
              iconWidth={250}
              iconX={125}
            />
          </div>
        </div>
      </div>
    );
  }
}

ActiveCallPad.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  className: PropTypes.string,
  isOnMute: PropTypes.bool,
  isOnHold: PropTypes.bool,
  recordStatus: PropTypes.string.isRequired,
  onMute: PropTypes.func.isRequired,
  onUnmute: PropTypes.func.isRequired,
  onHold: PropTypes.func.isRequired,
  onUnhold: PropTypes.func.isRequired,
  onRecord: PropTypes.func.isRequired,
  onStopRecord: PropTypes.func.isRequired,
  onHangup: PropTypes.func.isRequired,
  // onPark: PropTypes.func.isRequired,
  onShowKeyPad: PropTypes.func.isRequired,
  onAdd: PropTypes.func,
  onMerge: PropTypes.func,
  onShowFlipPanel: PropTypes.func.isRequired,
  onToggleTransferPanel: PropTypes.func.isRequired,
  flipNumbers: PropTypes.array.isRequired,
  layout: PropTypes.string,
  addDisabled: PropTypes.bool,
  mergeDisabled: PropTypes.bool,
  conferenceCallEquipped: PropTypes.bool,
  hasConferenceCall: PropTypes.bool,
  expandMore: PropTypes.bool,
};

ActiveCallPad.defaultProps = {
  className: null,
  isOnMute: false,
  isOnHold: false,
  layout: callCtrlLayouts.normalCtrl,
  addDisabled: false,
  mergeDisabled: false,
  conferenceCallEquipped: false,
  hasConferenceCall: false,
  onAdd: undefined,
  onMerge: undefined,
  expandMore: false,
};

export default ActiveCallPad;
