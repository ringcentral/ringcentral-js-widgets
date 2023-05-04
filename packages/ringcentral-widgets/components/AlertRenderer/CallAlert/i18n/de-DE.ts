import { callErrors } from '@ringcentral-integration/commons/modules/Call';
export default {
  [callErrors.emergencyNumber]: "Der Notruf ist nicht erreichbar. Bitte benutzen Sie ein anderes Telefon, um den Notdienst zu kontaktieren",
  [callErrors.noToNumber]: "Geben Sie eine gültige Telefonnummer ein.",
  [callErrors.noAreaCode]: "Legen Sie {areaCodeLink} fest, um lokale Telefonnummer mit 7 Ziffern verwenden zu können.",
  [callErrors.connectFailed]: "Verbindungsaufbau fehlgeschlagen. Versuchen Sie es später noch einmal.",
  [callErrors.internalError]: "Herstellen der Verbindung aufgrund interner Fehler nicht möglich. Versuchen Sie es später noch einmal.",
  [callErrors.notAnExtension]: "Die Durchwahlnummer ist nicht vorhanden.",
  [callErrors.networkError]: "Verbindung aufgrund von Netzwerkproblemen fehlgeschlagen. Versuchen Sie es später noch einmal.",
  [callErrors.noInternational]: "Sie verfügen nicht über die Berechtigung, internationale Anrufe zu tätigen. Wenden Sie sich an Ihren {brand}-Kontoadministrator, um ein Upgrade zu erhalten.",
  [callErrors.noRingoutEnable]: "Mit Ihrer Durchwahl können Anrufe mit Desktop-Apps getätigt werden.\n    Wenden Sie sich an Ihren Kontoadministrator für ein Upgrade,\n    wenn Sie zu anderen Anrufoptionen wechseln möchten.",
  [callErrors.numberParseError]: "Leider ist bei uns ein Problem aufgetreten. Versuchen Sie es später erneut.",
  areaCode: "Vorwahl",
  telus911: "Notrufe werden nicht unterstützt."
};

// @key: @#@"[callErrors.emergencyNumber]"@#@ @source: @#@"Emergency calling is not available. Please use another phone to contact emergency services"@#@
// @key: @#@"[callErrors.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[callErrors.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[callErrors.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[callErrors.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[callErrors.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[callErrors.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[callErrors.noInternational]"@#@ @source: @#@"You don't have permissions to make international calls. Please contact your {brand} account administrator for an upgrade."@#@
// @key: @#@"[callErrors.noRingoutEnable]"@#@ @source: @#@"Your extension is allowed to make calls with desktop app.\n    If you wish to switch to other calling options\n    please contact your account administrator for an upgrade."@#@
// @key: @#@"[callErrors.numberParseError]"@#@ @source: @#@"Sorry, there was a problem on our end. Please try again later."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"telus911"@#@ @source: @#@"Emergency dialing is not supported."@#@
