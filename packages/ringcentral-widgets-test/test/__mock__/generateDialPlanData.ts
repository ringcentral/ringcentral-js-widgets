export const generateDialPlanData = (
  countryCallingCode: string,
  countryId: string,
  countryName: string,
  isoCode: string,
) => {
  return {
    uri: `https://platform.ringcentral.com/restapi/v1.0/dictionary/country/${countryCallingCode}`,
    id: countryId,
    name: countryName,
    callingCode: countryCallingCode,
    isoCode,
  };
};
