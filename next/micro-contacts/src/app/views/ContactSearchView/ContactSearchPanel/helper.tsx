import { type IContactSearchItem } from '../ContactSearch.view.interface';

import { TabsEnum } from './ContactSearchPanelEnum';

interface GenerateOptionsProps {
  showOtherContacts?: boolean;
  isAbleToSearch: boolean;
  companyContacts: IContactSearchItem[];
  otherContacts: IContactSearchItem[];
  personalContacts: IContactSearchItem[];
  thirdPartyContacts: IContactSearchItem[];
}

interface GenerateTabsProps {
  optionsMap: {
    [key in keyof typeof TabsEnum]?: IContactSearchItem[];
  };
  thirdPartySourceName?: string;
  showOtherContacts?: boolean;
  isLoading: boolean;
  t: any;
}

const getCountsRes = (counts: number) => (counts > 99 ? `99+` : counts);

const getPrimaryCount = (items: any) => {
  const count = items?.filter((i: any) => i.isPrimary).length;
  return getCountsRes(count);
};

const getPrimaryNumber = (items: any) => {
  return items?.filter((i: any) => i.isPrimary).length;
};

export const generateOptionsMap = ({
  showOtherContacts,
  isAbleToSearch,
  companyContacts,
  otherContacts,
  personalContacts,
  thirdPartyContacts,
}: GenerateOptionsProps) => {
  return showOtherContacts
    ? {
        [TabsEnum.thirdParty]: !isAbleToSearch ? [] : thirdPartyContacts,
        [TabsEnum.company]: companyContacts,
        [TabsEnum.personal]: personalContacts,
        [TabsEnum.other]: otherContacts,
      }
    : {
        [TabsEnum.thirdParty]: !isAbleToSearch ? [] : thirdPartyContacts,
        [TabsEnum.company]: companyContacts,
        [TabsEnum.personal]: personalContacts,
      };
};

export const generateTabs = ({
  optionsMap,
  thirdPartySourceName,
  showOtherContacts,
  isLoading,
  t,
}: GenerateTabsProps) => {
  let companyTabs = [
    {
      label: t('companyTabTitle'),
      value: TabsEnum.company,
      count: getPrimaryCount(optionsMap[TabsEnum.company]),
      number: getPrimaryNumber(optionsMap[TabsEnum.company]),
    },
    {
      label: t('personalTabTitle'),
      value: TabsEnum.personal,
      count: getPrimaryCount(optionsMap[TabsEnum.personal]),
      number: getPrimaryNumber(optionsMap[TabsEnum.personal]),
    },
    {
      label: t('other'),
      value: TabsEnum.other,
      count: getPrimaryCount(optionsMap[TabsEnum.other]),
      number: getPrimaryNumber(optionsMap[TabsEnum.other]),
    },
  ];
  if (!showOtherContacts) {
    companyTabs = companyTabs.slice(0, 2);
  }
  companyTabs = companyTabs.sort((a, b) => {
    // both non-zero, maintain the original order
    if (a.number !== 0 && b.number !== 0) {
      return 0;
    }
    // If the count of a is 0 and the count of b is not 0, b should come before a
    if (a.number === 0 && b.number !== 0) {
      return 1;
    }
    // If the count of b is 0 and the count of a is not 0, a should come before b
    if (a.number !== 0 && b.number === 0) {
      return -1;
    }
    // both zero, maintain the original order
    return 0;
  });

  if (thirdPartySourceName) {
    return [
      {
        label: thirdPartySourceName,
        value: TabsEnum.thirdParty,
        count: isLoading ? 0 : getPrimaryCount(optionsMap[TabsEnum.thirdParty]),
      },
      ...companyTabs,
    ];
  }
  return companyTabs;
};

const invalidCharsRegExp = /[^\d*+#\-(). ]/;
const numberRegExp = /\d/;

export const validateValidChars = (input: string): boolean => {
  const chars = input.trim();
  return (
    chars.length > 0 &&
    !invalidCharsRegExp.test(chars) &&
    numberRegExp.test(chars)
  );
};
