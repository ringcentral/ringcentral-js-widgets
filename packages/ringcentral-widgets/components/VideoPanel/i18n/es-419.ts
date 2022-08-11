import { ASSISTED_USERS_MYSELF } from '@ringcentral-integration/commons/modules/RcVideo';
export default {
  topic: "Título de la reunión",
  date: "Fecha",
  startTime: "Hora",
  duration: "Duración",
  scheduleFor: "Programar en nombre de",
  meetingSettings: "Configuración de la reunión",
  [ASSISTED_USERS_MYSELF]: "Mí mismo",
  joinBeforeHost: "Permitir que los participantes se unan antes del anfitrión",
  enableWaitingRoom: "Habilitar la sala de espera",
  waitingRoom: "Habilitar la sala de espera para",
  waitingRoomNotCoworker: "Cualquiera fuera de mi empresa",
  waitingRoomGuest: "Cualquiera que no haya iniciado sesión",
  waitingRoomAll: "Todos",
  enterPassword: "Ingrese la contraseña",
  onlyJoinAfterMe: "Los participantes solo pueden unirse después de mí",
  onlyJoinAfterHost: "Los participantes solo pueden unirse después del anfitrión",
  muteAudio: "Silenciar el audio de los participantes",
  turnOffCamera: "Desactivar cámara de participantes",
  requirePassword: "Solicitar contraseña",
  useE2ee: "Usar cifrado de extremo a extremo",
  e2eeTooltip: "Las reuniones con cifrado de extremo a extremo tienen el mayor nivel de privacidad, pero no están disponibles algunas funciones como unirse por teléfono, subtítulos (CC) y grabación.",
  setPassword: "Configurar contraseña *",
  setPasswordNotSymbol: "Configurar contraseña",
  passwordEmptyError: "Se requiere la contraseña de la reunión",
  passwordInvalidError: "Su contraseña debe contener de 1 a 10 letras y números, pero no puede tener símbolos",
  passwordHintText: "Su contraseña debe contener de 1 a 10 letras y números y no puede incluir símbolos",
  usePersonalMeetingId: "Usar el ID de reunión personal",
  meetingSettingsSecurity: "Seguridad",
  onlyAuthUserJoin: "Solo los usuarios autenticados pueden unirse",
  signedInUsers: "Usuarios que han iniciado sesión",
  signedInCoWorkers: "Compañeros que han iniciado sesión",
  limitScreenSharing: "Solo el host y los moderadores pueden compartir pantalla",
  lockTooltip: "Esta configuración la gestiona el administrador de su empresa",
  pmiSettingAlert: "Esta configuración se aplicará para todas las reuniones creadas con el PMI",
  today: "Hoy",
  scheduleForGuidance: "¿Está programando para alguien más?\n1. Asegúrese de que está en su calendario de Outlook.\n2. En el menú desplegable, seleccione la persona para la cual está programando.\n",
  scheduleForGuidanceMore: "Más información",
  changePmiSettings: "Cambiar la configuración de la reunión personal",
  ieSupportAlert: "Tenga en cuenta que {appName} no funcionará con Internet Explorer 11 después del 16 de febrero de 2022. Recomendamos cambiar a Microsoft Edge o actualizar a Outlook 2016 o superior."
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
// @key: @#@"changePmiSettings"@#@ @source: @#@"Change Personal Meeting settings"@#@
// @key: @#@"ieSupportAlert"@#@ @source: @#@"Please note that {appName} won't work with Internet Explorer 11 after Feb 16, 2022. We recommend switching to Microsoft Edge or updating to Outlook 2016 or above."@#@
