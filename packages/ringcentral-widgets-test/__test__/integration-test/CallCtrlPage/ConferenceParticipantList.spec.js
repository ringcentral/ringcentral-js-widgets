import { contains } from 'ramda';
import ConferenceInfo from '@ringcentral-integration/widgets/components/ActiveCallPanel/ConferenceInfo';
import ParticipantItem from '@ringcentral-integration/widgets/components/ConferenceParticipantPanel/ParticipantItem';
import ConfirmRemoveModal from '@ringcentral-integration/widgets/components/ConferenceParticipantPanel/ConfirmRemoveModal';
import * as mock from '@ringcentral-integration/commons/integration-test/mock';
import { mockConferenceCallEnv, removeParticipant } from './helper';
import { initPhoneWrapper, timeout } from '../shared';

describe('Conference Participant List Page', () => {
  test('participant list page(2 participants) hang up all participants', async () => {
    const { phone, wrapper } = await initPhoneWrapper({
      mockUpdateConference: false,
    });
    await mockConferenceCallEnv(phone, { conferencePartiesCount: 3 });
    wrapper.update();
    expect(wrapper.find(ConferenceInfo)).toBeDefined();
    const avatarArea = wrapper.find(ConferenceInfo).find('.avatarContainer');
    avatarArea.simulate('click');
    await timeout(100);
    expect(phone.routerInteraction.currentPath).toEqual(
      '/conferenceCall/participants',
    );
    wrapper.update();
    let participantLists = wrapper.find(ParticipantItem);
    expect(participantLists).toHaveLength(2);
    expect(wrapper.find('.backLabel').text()).toEqual('Conference Call');
    expect(wrapper.find('.participantsCount').text()).toEqual('2 Participants');
    participantLists
      .at(0)
      .find('.rejectButton')
      .at(0)
      .find('g')
      .simulate('click');
    await timeout(100);
    let confirmModal = wrapper.find(ConfirmRemoveModal);
    expect(confirmModal.props().show).toBeTruthy();
    confirmModal
      .find('.cancelBtn')
      .at(0)
      .simulate('click');
    await timeout(100);
    confirmModal = wrapper.find(ConfirmRemoveModal);
    expect(confirmModal.props().show).toBeFalsy();
    participantLists
      .at(0)
      .find('.rejectButton')
      .at(0)
      .find('g')
      .simulate('click');
    await timeout(100);
    confirmModal = wrapper.find(ConfirmRemoveModal);
    const partyProfiles = phone.conferenceCall.partyProfiles;
    const conferenceId = phone.conferenceCall.currentConferenceId;
    mock.removeFromConference(conferenceId, partyProfiles[0].id);
    let conferenceBody = removeParticipant(phone, partyProfiles[0].id);
    mock.updateConferenceCall(conferenceId, conferenceBody, true);
    confirmModal
      .find('.confirmBtn')
      .at(0)
      .simulate('click');
    // need to add a timeout
    await timeout(100);
    wrapper.update();
    confirmModal = wrapper.find(ConfirmRemoveModal);
    expect(confirmModal.props().show).toBeFalsy();
    participantLists = wrapper.find(ParticipantItem);
    // terminate a participant
    expect(participantLists).toHaveLength(1);
    expect(wrapper.find('.participantsCount').text()).toEqual('1 Participant');
    participantLists
      .at(0)
      .find('.rejectButton')
      .at(0)
      .find('g')
      .simulate('click');
    await timeout(100);
    confirmModal = wrapper.find(ConfirmRemoveModal);
    expect(confirmModal.props().show).toBeTruthy();
    mock.removeFromConference(conferenceId, partyProfiles[1].id);
    conferenceBody = removeParticipant(phone, partyProfiles[1].id);
    mock.updateConferenceCall(conferenceId, conferenceBody, true);
    confirmModal
      .find('.confirmBtn')
      .at(0)
      .simulate('click');
    await timeout(100);
    wrapper.update();
    confirmModal = wrapper.find(ConfirmRemoveModal);
    expect(confirmModal.props().show).toBeFalsy();
    participantLists = wrapper.find(ParticipantItem);
    expect(participantLists).toHaveLength(0);
    expect(wrapper.find('.participantsCount').text()).toEqual('0 Participants');
    await timeout(750);
    expect(
      contains('/calls/active', phone.routerInteraction.currentPath),
    ).toBeTruthy();
  });
  test('participant list page click back button', async () => {
    const { phone, wrapper } = await initPhoneWrapper();
    await mockConferenceCallEnv(phone);
    wrapper.update();
    expect(wrapper.find(ConferenceInfo)).toBeDefined();
    const avatarArea = wrapper.find(ConferenceInfo).find('.avatarContainer');
    avatarArea.simulate('click');
    await timeout(100);
    expect(phone.routerInteraction.currentPath).toEqual(
      '/conferenceCall/participants',
    );
    wrapper.update();
    const backLabel = wrapper.find('.backLabel');
    expect(backLabel.text()).toEqual('Conference Call');
    backLabel.simulate('click');
    await timeout(100);
    expect(
      contains('/calls/active', phone.routerInteraction.currentPath),
    ).toBeTruthy();
  });
});
