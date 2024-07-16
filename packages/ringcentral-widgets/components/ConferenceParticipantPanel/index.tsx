import calleeTypes from '@ringcentral-integration/commons/enums/calleeTypes';
import React, { Component } from 'react';

import BackButton from '../BackButton';
import BackHeader from '../BackHeader';

import ConfirmRemoveModal from './ConfirmRemoveModal';
import ParticipantItem from './ParticipantItem';
import i18n from './i18n';
import styles from './styles.scss';

type ParticipantsContainerProps = {
  currentLocale: string;
  removeFunc?: (...args: any[]) => any;
  participants: object[];
  onBackButtonClick?: (...args: any[]) => any;
  formatPhone?: (...args: any[]) => any;
  afterOnCancel?: (...args: any[]) => any;
  afterOnRemoveBtnClick?: (...args: any[]) => any;
};
type ParticipantsContainerState = (() => {
  detail: any;
  showModal: boolean;
}) & { showModal: boolean; detail: null } & {
  showModal: boolean;
  detail: null;
};
class ParticipantsContainer extends Component<
  ParticipantsContainerProps,
  ParticipantsContainerState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      showModal: false,
      detail: null,
    };
    this.formatPrticipants(props);
    this.onRemoveBtnClick = this.onRemoveBtnClick.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onCancelNoAfter = this.onCancelNoAfter.bind(this);
  }
  formatPrticipants(props = this.props) {
    const { participants, formatPhone } = props;
    participants.forEach((participant) => {
      // @ts-expect-error TS(2339): Property 'partyNumber' does not exist on type 'obj... Remove this comment to see the full error message
      participant.partyNumber = formatPhone(participant.partyNumber);
    });
  }
  onRemoveBtnClick(participant: any) {
    this.setState(() => ({
      detail: participant,
      showModal: true,
    }));
    // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.afterOnRemoveBtnClick();
  }
  onCancel() {
    this.onCancelNoAfter();
    // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    this.props.afterOnCancel();
  }
  // onCancel without track
  onCancelNoAfter() {
    this.setState({
      showModal: false,
      detail: null,
    });
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  UNSAFE_componentWillReceiveProps(nextProps: any) {
    this.formatPrticipants(nextProps);
    if (
      this.state.showModal &&
      !nextProps.participants.find(
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        (participant: any) => participant.id === this.state.detail.id,
      )
    ) {
      this.onCancelNoAfter();
    }
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const { participants, currentLocale, removeFunc, onBackButtonClick } =
      this.props;
    const { detail, showModal } = this.state;
    const backHeader = (
      <BackHeader
        className={styles.header}
        onBackClick={onBackButtonClick}
        backButton={
          <BackButton label={i18n.getString('conferenceCall', currentLocale)} />
        }
      />
    );
    return (
      <div className={styles.root}>
        {backHeader}
        <div className={styles.participantsListContainer}>
          <div className={styles.participantsCount}>
            {participants.length === 1
              ? `${participants.length} ${i18n.getString(
                  'participant',
                  currentLocale,
                )}`
              : `${participants.length} ${i18n.getString(
                  'participants',
                  currentLocale,
                )}`}
          </div>
          <div className={styles.participantsList} data-sign="participantsList">
            {participants.map((participant) => {
              // @ts-expect-error TS(2339): Property 'id' does not exist on type '{}'.
              const { id, avatarUrl, partyName, partyNumber, calleeType } =
                participant;
              let displayText =
                partyNumber || i18n.getString('unknownNumber', currentLocale);
              if (partyName && calleeType === calleeTypes.contacts) {
                // means that matched a contact
                displayText = partyName;
              }
              return (
                <ParticipantItem
                  key={id}
                  avatarUrl={avatarUrl}
                  detail={displayText}
                  currentLocale={currentLocale}
                  onRemove={() => this.onRemoveBtnClick(participant)}
                />
              );
            })}
          </div>
        </div>
        <ConfirmRemoveModal
          show={showModal}
          // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'object | un... Remove this comment to see the full error message
          detail={detail}
          onCancel={this.onCancel}
          currentLocale={currentLocale}
          onRemove={() =>
            // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
            removeFunc(detail && detail.id).then(this.onCancelNoAfter)
          }
        />
      </div>
    );
  }
}
// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
ParticipantsContainer.defaultProps = {
  removeFunc: (i: any) => i,
  onBackButtonClick: (i: any) => i,
  formatPhone: (i: any) => i,
  afterOnCancel: (i: any) => i,
  afterOnRemoveBtnClick: (i: any) => i,
};
export default ParticipantsContainer;
