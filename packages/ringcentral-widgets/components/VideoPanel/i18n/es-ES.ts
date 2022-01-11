import { ASSISTED_USERS_MYSELF } from '@ringcentral-integration/commons/modules/RcVideo/constants';
export default {
  topic: "Nombre de la reunión",
  date: "Fecha",
  startTime: "Hora",
  duration: "Duración",
  scheduleFor: "Programar en",
  meetingSettings: "Configuración de la reunión",
  [ASSISTED_USERS_MYSELF]: "Mi nombre",
  joinBeforeHost: "Permitir a los participantes unirse antes que el organizador",
  enableWaitingRoom: "Habilitar sala de espera",
  waitingRoom: "Habilitar sala de espera para",
  waitingRoomNotCoworker: "Cualquier usuario de fuera de mi empresa",
  waitingRoomGuest: "Cualquier usuario que no haya iniciado sesión",
  waitingRoomAll: "Todos",
  enterPassword: "Introducir contraseña",
  onlyJoinAfterMe: "Los participantes solo pueden unirse después de mí",
  onlyJoinAfterHost: "Los participantes solo pueden unirse después del organizador",
  muteAudio: "Silenciar participantes",
  turnOffCamera: "Desactivar cámara de participantes",
  requirePassword: "Solicitar contraseña",
  useE2ee: "Usar cifrado de extremo a extremo",
  e2eeTooltip: "Las reuniones con cifrado de extremo a extremo son las más privadas, sin embargo, habrá características que no estén disponibles como unirse por teléfono, subtitulado y grabación.",
  setPassword: "Establecer contraseña *",
  setPasswordNotSymbol: "Establecer contraseña",
  passwordEmptyError: "Se requiere la contraseña de la reunión",
  passwordInvalidError: "La contraseña debe tener entre 1 y 10 caracteres o números y no puede incluir símbolos.",
  passwordHintText: "La contraseña debe tener un máximo de 10 caracteres o números y no puede incluir símbolos",
  usePersonalMeetingId: "Utilizar ID de reunión personal",
  meetingSettingsSecurity: "Seguridad",
  onlyAuthUserJoin: "Solo pueden unirse los usuarios autenticados",
  signedInUsers: "Usuarios con sesión iniciada",
  signedInCoWorkers: "Compañeros de trabajo con la sesión iniciada",
  limitScreenSharing: "Solo el organizador y los moderadores pueden compartir la pantalla",
  lockTooltip: "El administrador de la empresa gestiona esta opción.",
  pmiSettingAlert: "Esta configuración se aplicará a todas las reuniones creadas con el PMI.",
  today: "Hoy",
  scheduleForGuidance: "¿La está programando en nombre de otra persona?\n1. Asegúrese de que está en su calendario de Outlook.\n2. En el menú desplegable, seleccione la persona en cuyo nombre desea programar.\n",
  scheduleForGuidanceMore: "Más información",
  changePmiSettings: "Cambiar configuración de reunión personal",
  ieSupportAlert: "Tenga en cuenta que {appName} no funcionará con Internet Explorer 11 después del 16 de febrero de 2022. Le recomendamos que cambie a Microsoft Edge o actualice a Outlook 2016 o posterior."
};

// @key: @#@"topic"@#@ @source: @#@"Meeting title"@#@
// @key: @#@"date"@#@ @source: @#@"Date"@#@
// @key: @#@"startTime"@#@ @source: @#@"Time"@#@
// @key: @#@"duration"@#@ @source: @#@"Duration"@#@
// @key: @#@"scheduleFor"@#@ @source: @#@"Schedule on behalf of"@#@
// @key: @#@"meetingSettings"@#@ @source: @#@"Meeting settings"@#@
// @key: @#@"ASSISTED_USERS_MYSELF"@#@ @source: @#@"Myself"@#@
// @key: @#@"joinBeforeHost"@#@ @source: @#@"Allow participants to join before host"@#@
// @key: @#@"enableWaitingRoom"@#@ @source: @#@"Enable waiting room"@#@
// @key: @#@"waitingRoom"@#@ @source: @#@"Enable waiting room for"@#@
// @key: @#@"waitingRoomNotCoworker"@#@ @source: @#@"Anyone outside my company"@#@
// @key: @#@"waitingRoomGuest"@#@ @source: @#@"Anyone not signed in"@#@
// @key: @#@"waitingRoomAll"@#@ @source: @#@"Everyone"@#@
// @key: @#@"enterPassword"@#@ @source: @#@"Enter Password"@#@
// @key: @#@"onlyJoinAfterMe"@#@ @source: @#@"Participants can only join after me"@#@
// @key: @#@"onlyJoinAfterHost"@#@ @source: @#@"Participants can only join after host"@#@
// @key: @#@"muteAudio"@#@ @source: @#@"Mute audio for participants"@#@
// @key: @#@"turnOffCamera"@#@ @source: @#@"Turn off camera for participants"@#@
// @key: @#@"requirePassword"@#@ @source: @#@"Require password"@#@
// @key: @#@"useE2ee"@#@ @source: @#@"Use end-to-end encryption"@#@
// @key: @#@"e2eeTooltip"@#@ @source: @#@"End-to-end encrypted meetings are the most private, but features like joining by phone, closed captions, and recording aren't available."@#@
// @key: @#@"setPassword"@#@ @source: @#@"Set password *"@#@
// @key: @#@"setPasswordNotSymbol"@#@ @source: @#@"Set password"@#@
// @key: @#@"passwordEmptyError"@#@ @source: @#@"Meeting password required"@#@
// @key: @#@"passwordInvalidError"@#@ @source: @#@"Your password must be 1-10 letters and numbers long but cannot contain symbols"@#@
// @key: @#@"passwordHintText"@#@ @source: @#@"Your password should be 1-10 letters and numbers long but cannot contain symbols"@#@
// @key: @#@"usePersonalMeetingId"@#@ @source: @#@"Use Personal Meeting ID"@#@
// @key: @#@"meetingSettingsSecurity"@#@ @source: @#@"Security"@#@
// @key: @#@"onlyAuthUserJoin"@#@ @source: @#@"Only authenticated users can join"@#@
// @key: @#@"signedInUsers"@#@ @source: @#@"Signed in users"@#@
// @key: @#@"signedInCoWorkers"@#@ @source: @#@"Signed in co-workers"@#@
// @key: @#@"limitScreenSharing"@#@ @source: @#@"Only host & moderators can share screen"@#@
// @key: @#@"lockTooltip"@#@ @source: @#@"This setting is managed by your company admin"@#@
// @key: @#@"pmiSettingAlert"@#@ @source: @#@"These settings will apply to all meetings created with PMI"@#@
// @key: @#@"today"@#@ @source: @#@"Today"@#@
// @key: @#@"scheduleForGuidance"@#@ @source: @#@"Scheduling for someone else?\n1. Make sure you're on their Outlook calendar.\n2. From the dropdown, select the person you're scheduling for.\n"@#@
// @key: @#@"scheduleForGuidanceMore"@#@ @source: @#@"Learn details"@#@
// @key: @#@"changePmiSettings"@#@ @source: @#@"Change Personal meeting settings"@#@
// @key: @#@"ieSupportAlert"@#@ @source: @#@"Please note that {appName} won't work with Internet Explorer 11 after Feb 16, 2022. We recommend switching to Microsoft Edge or updating to Outlook 2016 or above."@#@
