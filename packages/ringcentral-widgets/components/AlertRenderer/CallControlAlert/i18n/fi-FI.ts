import { callControlError } from '@ringcentral-integration/commons/modules/ActiveCallControl';
const {
  holdConflictError,
  unHoldConflictError,
  muteConflictError,
  unMuteConflictError,
  generalError,
  forwardSuccess,
  transferCompleted,
  replyCompleted
} = callControlError;
export default {
  [muteConflictError]: "Tämä puhelu on mykistetty toisella laitteella. Poista mykistys ennen kuin hallinnoit puhelua tässä sovelluksessa.",
  [unHoldConflictError]: "Tämä puhelu on pidossa toisella laitteella. Poista puhelu pidosta ennen kuin hallinnoit sitä tässä sovelluksessa.",
  [unMuteConflictError]: "Tämän puhelun mykistys on poistettu toisella laitteella. Mykistä puhelu ennen kuin hallinnoit sitä tässä sovelluksessa.",
  [holdConflictError]: "Tämä puhelu on poistettu pidosta toisella laitteella. Lisää puhelu pitoon ennen kuin hallinnoit sitä tässä sovelluksessa.",
  [generalError]: "Odottamaton palvelinvirhe. Yritä myöhemmin uudelleen.",
  [forwardSuccess]: "Soitto siirretty",
  [transferCompleted]: "Puhelu siirrettiin",
  [replyCompleted]: "Ääniviesti lähetettiin."
};

// @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@
// @key: @#@"forwardSuccess"@#@ @source: @#@"Call forwarded"@#@
// @key: @#@"transferCompleted"@#@ @source: @#@"Call transferred"@#@
// @key: @#@"replyCompleted"@#@ @source: @#@"Voice message sent."@#@
