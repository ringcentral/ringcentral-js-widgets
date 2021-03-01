import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { recordStatus as recordStatuses } from 'ringcentral-integration/modules/Webphone/recordStatus';
import { isObject } from 'ringcentral-integration/lib/di/utils/is_type';

import CircleButton from '../CircleButton';
import Tooltip from '../Tooltip';
import ActiveCallButton from '../ActiveCallButton';
import MuteIcon from '../../assets/images/Mute.svg';
import UnmuteIcon from '../../assets/images/Unmute.svg';
import KeypadIcon from '../../assets/images/Dialpad.svg';
import HoldIcon from '../../assets/images/Hold.svg';
import ParkIcon from '../../assets/images/Park.svg';
import RecordIcon from '../../assets/images/Record.svg';
// import AddIcon from '../../assets/images/AddCall.svg';
import MoreIcon from '../../assets/images/MoreIcon.svg';
import TransferIcon from '../../assets/images/Transfer.svg';
import FlipIcon from '../../assets/images/Flip.svg';
import EndIcon from '../../assets/images/End.svg';
import CombineIcon from '../../assets/images/Combine.svg';
import MergeIcon from '../../assets/images/MergeIntoConferenceIcon.svg';
import callCtrlLayouts from '../../enums/callCtrlLayouts';
import { pickElements } from './utils';

import MoreActionItem from './MoreActionItem';

import styles from './styles.scss';
import i18n from './i18n';

const DisplayButtonNumber = 6;

export const ACTIONS_CTRL_MAP = {
  muteCtrl: 'muteCtrl',
  keypadCtrl: 'keypadCtrl',
  holdCtrl: 'holdCtrl',
  mergeOrAddCtrl: 'mergeOrAddCtrl',
  recordCtrl: 'recordCtrl',
  transferCtrl: 'transferCtrl',
  flipCtrl: 'flipCtrl',
  parkCtrl: 'parkCtrl',
  completeTransferCtrl: 'completeTransferCtrl',
};

class ActiveCallPad extends Component {
  constructor(props) {
    super(props);
    this.moreButton = createRef();
    this.dropdown = createRef();
    this.onClick = this.onClick.bind(this);
    this.toggleMore = this.toggleMore.bind(this);
    this.state = {
      expandMore: props.expandMore,
      moreButton: this.moreButton && this.moreButton.current,
    };
  }

  onClick(e) {
    if (isObject(this.dropdown) && isObject(this.dropdown.current)) {
      const {
        dom: { current },
      } = this.dropdown.current;

      if (
        !current.contains(e.target) &&
        !this.moreButton.current.contains(e.target) &&
        this.state.expandMore
      ) {
        this.setState({
          expandMore: false,
        });
      }
    }
  }

  toggleMore() {
    this.setState((prevState) => ({
      expandMore: !prevState.expandMore,
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

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState !== this.state) {
      return true;
    }

    let showUpdate = false;

    for (const p in nextProps) {
      if (Object.prototype.hasOwnProperty.call(nextProps, p)) {
        const val = nextProps[p];

        if (val !== this.props[p] && typeof val !== 'function') {
          showUpdate = true;
          break;
        }
      }
    }
    return showUpdate;
  }

  render() {
    const {
      controlBusy,
      actions,
      currentLocale,
      isOnWaitingTransfer,
      onHangup,
      onCompleteTransfer,
      conferenceCallEquipped,
      isOnMute,
      isOnHold,
      onUnmute,
      onMute,
      onShowKeyPad,
      layout,
      onUnhold,
      onHold,
      hasConferenceCall,
      mergeDisabled,
      onMerge,
      addDisabled,
      onAdd,
      recordStatus,
      onStopRecord,
      onRecord,
      onTransfer,
      disableFlip,
      onFlip,
      showPark,
      onPark,
      className,
      isOnTransfer,
    } = this.props;

    let buttons = [];
    /* --------------------- Mute/Unmute --------------------------- */
    buttons.push(
      isOnMute
        ? {
            icon: MuteIcon,
            id: ACTIONS_CTRL_MAP.muteCtrl,
            dataSign: 'mute',
            title: i18n.getString('unmute', currentLocale),
            disabled: isOnHold || controlBusy,
            onClick: onUnmute,
          }
        : {
            icon: UnmuteIcon,
            id: ACTIONS_CTRL_MAP.muteCtrl,
            dataSign: 'unmute',
            title: i18n.getString('mute', currentLocale),
            disabled: isOnHold || controlBusy,
            onClick: onMute,
          },
    );

    /* --------------------- keyPad --------------------------- */
    buttons.push({
      icon: KeypadIcon,
      id: ACTIONS_CTRL_MAP.keypadCtrl,
      dataSign: 'keypad',
      title: i18n.getString('keypad', currentLocale),
      onClick: onShowKeyPad,
      disabled: layout === callCtrlLayouts.conferenceCtrl,
    });

    /* --------------------- Hold/Unhold --------------------------- */
    buttons.push({
      icon: HoldIcon,
      id: ACTIONS_CTRL_MAP.holdCtrl,
      iconWidth: 120,
      iconHeight: 160,
      iconX: 190,
      iconY: 165,
      dataSign: isOnHold ? 'onHold' : 'hold',
      title: isOnHold
        ? i18n.getString('onHold', currentLocale)
        : i18n.getString('hold', currentLocale),
      active: isOnHold,
      onClick: isOnHold ? onUnhold : onHold,
      disabled: controlBusy,
    });

    if (isOnWaitingTransfer) {
      buttons.push({
        icon: TransferIcon,
        id: ACTIONS_CTRL_MAP.completeTransferCtrl,
        dataSign: 'completeTransfer',
        title: i18n.getString('completeTransfer', currentLocale),
        disabled: isOnTransfer || controlBusy,
        onClick: onCompleteTransfer,
        showRipple: true,
      });
    }
    /* --------------------- Add/Merge --------------------------- */
    if (!isOnWaitingTransfer && conferenceCallEquipped) {
      const showMerge =
        layout === callCtrlLayouts.mergeCtrl ||
        (layout === callCtrlLayouts.normalCtrl && hasConferenceCall);
      buttons.push(
        showMerge
          ? {
              icon: MergeIcon,
              id: ACTIONS_CTRL_MAP.mergeOrAddCtrl,
              dataSign: 'merge',
              title: i18n.getString('mergeToConference', currentLocale),
              disabled: mergeDisabled || controlBusy,
              onClick: onMerge,
              showRipple: !mergeDisabled,
            }
          : {
              icon: CombineIcon,
              id: ACTIONS_CTRL_MAP.mergeOrAddCtrl,
              dataSign: 'add',
              title: i18n.getString('add', currentLocale),
              disabled: addDisabled || controlBusy,
              onClick: onAdd,
            },
      );
    }

    /* --------------------- Record/Stop --------------------------- */
    buttons.push({
      icon: RecordIcon,
      id: ACTIONS_CTRL_MAP.recordCtrl,
      dataSign:
        recordStatus === recordStatuses.recording ? 'stopRecord' : 'record',
      title:
        recordStatus === recordStatuses.recording
          ? i18n.getString('stopRecord', currentLocale)
          : i18n.getString('record', currentLocale),
      active: recordStatus === recordStatuses.recording,
      disabled:
        isOnHold ||
        recordStatus === recordStatuses.pending ||
        layout === callCtrlLayouts.mergeCtrl ||
        recordStatus === recordStatuses.noAccess ||
        controlBusy,
      onClick:
        recordStatus === recordStatuses.recording ? onStopRecord : onRecord,
    });

    /* --------------------- Transfer --------------------------- */
    const disabledTransfer = layout !== callCtrlLayouts.normalCtrl;
    if (!isOnWaitingTransfer) {
      buttons.push({
        icon: TransferIcon,
        id: ACTIONS_CTRL_MAP.transferCtrl,
        dataSign: 'transfer',
        title: i18n.getString('transfer', currentLocale),
        disabled: disabledTransfer || controlBusy,
        onClick: onTransfer,
      });
    }

    /* --------------------- Flip --------------------------- */
    const disableControlButton =
      isOnHold || layout !== callCtrlLayouts.normalCtrl;
    const disabledFlip = disableFlip || disableControlButton;
    buttons.push({
      icon: FlipIcon,
      id: ACTIONS_CTRL_MAP.flipCtrl,
      dataSign: 'flip',
      title: i18n.getString('flip', currentLocale),
      disabled: disabledFlip || controlBusy,
      onClick: onFlip,
    });
    /* --------------------- Park --------------------------- */
    if (showPark) {
      buttons.push({
        icon: ParkIcon,
        id: ACTIONS_CTRL_MAP.parkCtrl,
        dataSign: 'park',
        title: i18n.getString('park', currentLocale),
        disabled: disableControlButton || controlBusy,
        onClick: onPark,
      });
    }
    // filter actions
    if (actions.length > 0) {
      buttons = pickElements(actions, buttons);
    }

    /* --------------------- More Actions --------------------------- */
    let moreActions = null;
    if (buttons.length > DisplayButtonNumber) {
      const disableMoreButton =
        isOnWaitingTransfer ||
        (disabledFlip && disabledTransfer) ||
        controlBusy;
      moreActions = (
        <span className={styles.moreButtonContainer} ref={this.moreButton}>
          <ActiveCallButton
            onClick={this.toggleMore}
            title={i18n.getString('more', currentLocale)}
            active={this.state.expandMore}
            className={classnames(styles.moreButton, styles.callButton)}
            disabled={disableMoreButton}
            icon={MoreIcon}
            dataSign="callActions"
          />
          <Tooltip
            fixed={false}
            open={this.state.expandMore}
            direction="top"
            ref={this.dropdown}
            triggerElm={this.state.moreButton}
          >
            <div className={styles.buttonPopup}>
              {buttons.slice(DisplayButtonNumber - 1).map(({ id, ...opts }) => (
                <MoreActionItem key={id} {...opts} />
              ))}
            </div>
          </Tooltip>
        </span>
      );
    }

    const isLessBtn = buttons.length <= 3 && moreActions === null;
    return (
      <div className={classnames(styles.root, className)}>
        <div
          className={classnames(
            styles.callCtrlButtonGroup,
            isLessBtn && styles.biggerButton,
          )}
        >
          <div className={styles.buttonRow}>
            {buttons
              .slice(0, DisplayButtonNumber - (moreActions ? 1 : 0))
              .map((opts) => (
                <ActiveCallButton
                  key={opts.title}
                  className={styles.callButton}
                  {...opts}
                />
              ))}
            {moreActions}
          </div>
        </div>
        <div className={classnames(styles.buttonRow, styles.stopButtonGroup)}>
          <div className={styles.button}>
            <CircleButton
              className={classnames(
                styles.stopButton,
                controlBusy && styles.disabled,
              )}
              onClick={onHangup}
              icon={EndIcon}
              showBorder={false}
              iconWidth={250}
              iconX={125}
              dataSign="hangup"
              disabled={controlBusy}
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
  onPark: PropTypes.func.isRequired,
  onShowKeyPad: PropTypes.func.isRequired,
  onAdd: PropTypes.func,
  onMerge: PropTypes.func,
  onFlip: PropTypes.func.isRequired,
  onTransfer: PropTypes.func.isRequired,
  disableFlip: PropTypes.bool,
  showPark: PropTypes.bool,
  layout: PropTypes.string,
  addDisabled: PropTypes.bool,
  mergeDisabled: PropTypes.bool,
  conferenceCallEquipped: PropTypes.bool,
  hasConferenceCall: PropTypes.bool,
  expandMore: PropTypes.bool,
  actions: PropTypes.array,
  isOnTransfer: PropTypes.bool,
  isOnWaitingTransfer: PropTypes.bool,
  onCompleteTransfer: PropTypes.func.isRequired,
  controlBusy: PropTypes.bool,
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
  disableFlip: false,
  showPark: false,
  actions: [],
  isOnTransfer: false,
  isOnWaitingTransfer: false,
  controlBusy: false,
};

export default ActiveCallPad;
