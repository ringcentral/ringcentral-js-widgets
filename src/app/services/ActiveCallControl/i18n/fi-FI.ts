/* eslint-disable */
export default {
  muteConflictError:
    'Tämä puhelu on mykistetty toisella laitteella. Poista mykistys ennen kuin hallinnoit puhelua tässä sovelluksessa.',
  unMuteConflictError:
    'Tämän puhelun mykistys on poistettu toisella laitteella. Mykistä puhelu ennen kuin hallinnoit sitä tässä sovelluksessa.',
  recordError:
    'Puhelua ei voi tallentaa tällä hetkellä. Virhekoodi: {errorCode}',
  recordErrorWithoutCode: 'Puhelua ei voi tallentaa tällä hetkellä.',
  pauseRecordError:
    'Puhelun tallentamisen lopettaminen epäonnistui. Yritä myöhemmin uudelleen.',
  holdConflictError:
    'Tämä puhelu on poistettu pidosta toisella laitteella. Lisää puhelu pitoon ennen kuin hallinnoit sitä tässä sovelluksessa.',
  unHoldConflictError:
    'Tämä puhelu on pidossa toisella laitteella. Poista puhelu pidosta ennen kuin hallinnoit sitä tässä sovelluksessa.',
  generalError: 'Odottamaton palvelinvirhe. Yritä myöhemmin uudelleen.',
  replyCompleted: 'Ääniviesti lähetettiin.',
  transferCompleted: 'Puhelu siirrettiin',
  toVoiceMailError:
    'Puhelun lähettäminen vastaajaan epäonnistui sisäisen virheen vuoksi',
  transferError: 'Soitonsiirto epäonnistui. Yritä myöhemmin uudelleen.',
  forwardSuccess: 'Soitto siirretty',
  somethingWentWrong: 'Jokin meni vikaan. Yritä uudelleen.',
  noOutboundCallWithoutDL:
    'Alanumerostasi ei voi tällä hetkellä soittaa puheluita selaimella. Pyydä päivitystä tilisi järjestelmänvalvojalta.',
  tooManyParticipants: 'Osallistujien enimmäismäärä on täynnä.',
  callsMerged: 'Puhelut yhdistetty',
  failWithoutStatusCode:
    'Jokin meni vikaan palvelimellamme. Jos virhe ei korjaannu, ilmoita virheestä palvelun {brandName} tukeen.',
  replyEmptyError: 'Tyhjää viestiä ei voi lähettää.',
} as const;

// @key: @#@"muteConflictError"@#@ @source: @#@"This call had been muted on other device. Please unmute the call before you control in this App."@#@
// @key: @#@"unMuteConflictError"@#@ @source: @#@"This call had been unmuted on other device. Please mute the call before you control in this App."@#@
// @key: @#@"recordError"@#@ @source: @#@"You cannot record the call at the moment. Error code: {errorCode}"@#@
// @key: @#@"recordErrorWithoutCode"@#@ @source: @#@"You cannot record the call at the moment."@#@
// @key: @#@"pauseRecordError"@#@ @source: @#@"Sorry, we weren't able to stop recording the call. Try again later."@#@
// @key: @#@"holdConflictError"@#@ @source: @#@"This call had been unheld on other device. Please hold the call before you control in this App."@#@
// @key: @#@"unHoldConflictError"@#@ @source: @#@"This call had been held on other device. Please unhold the call before you control in this App."@#@
// @key: @#@"generalError"@#@ @source: @#@"Unexpected server error. Please try again later."@#@
// @key: @#@"replyCompleted"@#@ @source: @#@"Voice message sent."@#@
// @key: @#@"transferCompleted"@#@ @source: @#@"Call transferred"@#@
// @key: @#@"toVoiceMailError"@#@ @source: @#@"Cannot send call to voicemail due to internal error"@#@
// @key: @#@"transferError"@#@ @source: @#@"Cannot transfer the call. Please try again later."@#@
// @key: @#@"forwardSuccess"@#@ @source: @#@"Call forwarded"@#@
// @key: @#@"somethingWentWrong"@#@ @source: @#@"Something went wrong. Please try again."@#@
// @key: @#@"noOutboundCallWithoutDL"@#@ @source: @#@"Your extension is not allowed to make outbound calls with browser currently, please contact your account representative for an upgrade."@#@
// @key: @#@"tooManyParticipants"@#@ @source: @#@"Maximum number of participants is reached."@#@
// @key: @#@"callsMerged"@#@ @source: @#@"Calls merged"@#@
// @key: @#@"failWithoutStatusCode"@#@ @source: @#@"Sorry, something went wrong on our end. If the error persists, report this error to {brandName} support."@#@
// @key: @#@"replyEmptyError"@#@ @source: @#@"Sorry, you cannot send an empty message."@#@
