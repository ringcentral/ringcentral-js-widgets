interface ContactMatchQuery {
  phoneNumber: string;
  callType: string;
}

const separator = '_';

export const contactMatchIdentifyEncode = ({
  phoneNumber,
  callType,
}: ContactMatchQuery) =>
  `${phoneNumber}${separator}${callType}`.toLocaleLowerCase();

export const contactMatchIdentifyDecode = (
  identify: string,
): ContactMatchQuery => {
  const [phoneNumber, callType] = identify.split(separator);
  return { phoneNumber, callType };
};
