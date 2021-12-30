import accountInfo from '../mock/data/accountInfo.json';

export const changeAccountInfoBrandData = (
  brandId: string,
  brandName?: string,
) => ({
  ...accountInfo,
  serviceInfo: {
    ...accountInfo.serviceInfo,
    brand: {
      ...accountInfo.serviceInfo.brand,
      id: brandId,
      name: brandName ?? accountInfo.serviceInfo.brand.name,
    },
  },
});
