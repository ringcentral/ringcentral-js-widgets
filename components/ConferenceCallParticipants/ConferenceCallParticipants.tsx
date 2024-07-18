import { format } from '@ringcentral-integration/utils';
import {
  RcAvatar,
  RcButton,
  RcDialogActions,
  RcDrawer,
  RcIconButton,
  RcLink,
  RcList,
  RcListItem,
  RcListItemAvatar,
  RcListItemSecondaryAction,
  RcListItemText,
  RcTypography,
  spacing,
  styled,
  useAvatarShortName,
} from '@ringcentral/juno';
import { RemoveMemberBorder } from '@ringcentral/juno-icon';
import React, { useState, type FunctionComponent } from 'react';

import { ConferenceCallParticipantsProps } from './ConferenceCallParticipants.interface';
import i18n from './i18n';

const InnerContainer = styled.div`
  display: grid;
  gap: ${spacing(3)};
  padding: ${spacing(0, 4)};
  margin: ${spacing(4, 0)};

  ${RcDialogActions} {
    margin-top: ${spacing(2)};
    padding: 0;
  }

  ${RcList} {
    overflow: hidden;

    ${RcListItem} {
      padding-left: 0;
      padding-right: 0;
    }
  }
`;

export const ConferenceCallParticipants: FunctionComponent<
  ConferenceCallParticipantsProps
> = ({
  isOpen,
  currentLocale,
  participants = [],
  toggleConference,
  currentTelephonySessionId,
  getContactNameInfo,
  renderAvatar,
  onRemoveParticipant,
  clickRemoveParticipantTrack,
}) => {
  const [removeData, setRemoveData] = useState<{
    removedPartyId: string;
    name: string;
  } | void>();
  const closeRemoveModal = () => {
    setRemoveData(undefined);
  };
  const length = participants.length;
  const removedModalOpen = !!removeData && isOpen;
  return (
    <>
      <RcDrawer
        data-sign="removeParticipantModal"
        radius="xl"
        anchor="bottom"
        open={removedModalOpen}
        onClose={closeRemoveModal}
      >
        <InnerContainer>
          <RcTypography variant="subheading2">
            {i18n.getString('removeTitle', currentLocale)}
          </RcTypography>
          <RcTypography variant="body1">
            {format(i18n.getString('removeDescription', currentLocale), {
              name: removeData?.name,
            })}
          </RcTypography>
          <RcDialogActions direction="vertical" reverse={false}>
            <RcButton
              data-sign="confirmRemoveButton"
              variant="contained"
              color="primary"
              size="xlarge"
              fullWidth
              onClick={async () => {
                await onRemoveParticipant(
                  currentTelephonySessionId,
                  removeData?.removedPartyId!,
                );
                closeRemoveModal();
              }}
            >
              {i18n.getString('confirmButtonText', currentLocale)}
            </RcButton>
            <RcButton
              data-sign="cancelRemoveButton"
              variant="text"
              size="xlarge"
              fullWidth
              onClick={closeRemoveModal}
            >
              {i18n.getString('cancelButtonText', currentLocale)}
            </RcButton>
          </RcDialogActions>
        </InnerContainer>
      </RcDrawer>

      <RcDrawer
        data-sign="participantsListModal"
        radius="xl"
        anchor="bottom"
        open={isOpen}
        onClose={() => toggleConference(false)}
      >
        <InnerContainer>
          <RcTypography variant="subheading2" data-sign="participantsHeader">
            {`${i18n.getString('participants', currentLocale)} (${length})`}
          </RcTypography>
          <RcList>
            {participants.map(
              ({
                telephonySessionId,
                sessionId,
                partyId,
                isHost,
                sessionName,
              }) => {
                const {
                  logName = sessionName,
                  entityDetailLink,
                  displayEntity,
                  entityType,
                } = getContactNameInfo(sessionId, isHost);
                const ConferenceAvatarIcon = renderAvatar ? (
                  renderAvatar({ displayEntity, entityType, name: logName })
                ) : (
                  <ConferenceAvatar name={logName} />
                );

                const displayName = isHost
                  ? `${logName} ${i18n.getString('host', currentLocale)}`
                  : logName;
                return (
                  <RcListItem
                    singleLine
                    button={false}
                    canHover={false}
                    key={telephonySessionId}
                    data-sign={
                      isHost ? `participantItemHost` : `participantItem`
                    }
                  >
                    <RcListItemAvatar data-sign="participantAvatar">
                      {ConferenceAvatarIcon}
                    </RcListItemAvatar>
                    <RcListItemText
                      data-sign="participantName"
                      isEllipsis
                      title={displayName}
                      primary={
                        entityDetailLink ? (
                          <RcLink
                            variant="inherit"
                            onClick={() => {
                              window.open(entityDetailLink, '_blank');
                            }}
                          >
                            {displayName}
                          </RcLink>
                        ) : (
                          displayName
                        )
                      }
                    />

                    {!isHost && (
                      <RcListItemSecondaryAction>
                        <RcIconButton
                          data-sign="removeParticipantButton"
                          variant="round"
                          size="small"
                          color="action.grayLight"
                          symbol={RemoveMemberBorder}
                          title={i18n.getString(
                            'removeParticipant',
                            currentLocale,
                          )}
                          onClick={() => {
                            clickRemoveParticipantTrack?.();
                            setRemoveData({
                              removedPartyId: partyId,
                              name: logName,
                            });
                          }}
                        />
                      </RcListItemSecondaryAction>
                    )}
                  </RcListItem>
                );
              },
            )}
          </RcList>
        </InnerContainer>
      </RcDrawer>
    </>
  );
};

export const ConferenceAvatar: FunctionComponent<{ name: string }> = ({
  name,
}) => {
  const [firstName, lastName] = name?.split(/\s+/) || [];
  const presentAvatarName = useAvatarShortName({
    firstName,
    lastName,
  });
  return (
    <RcAvatar color="action.primary" size="xsmall">
      {presentAvatarName}
    </RcAvatar>
  );
};
