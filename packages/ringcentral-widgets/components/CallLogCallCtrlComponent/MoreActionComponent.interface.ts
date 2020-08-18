export interface MoreActionItem {
  icon: any;
  text: string;
  onClick: () => void;
  iconClassName: string;
}

export interface MoreActionComponentProps {
  currentLocale: string;
  actionsList: MoreActionItem[];
  disabled: boolean;
}
