export interface MoreActionItem {
  key: string;
  icon?: any;
  text: string;
  subText?: string;
  onClick: () => void;
  iconClassName: string;
  disabled?: boolean;
}

export interface MoreActionComponentProps {
  dataSign: string;
  currentLocale: string;
  actionsList: MoreActionItem[];
  disabled: boolean;
  rootIcon: any;
  rootButtonProps: {
    icon: any;
    tooltip: string;
    className: string;
    junoIcon?: any;
  };
  withSubText: boolean;
  handleClick: () => void;
  handleClose: () => void;
  anchorEl: any;
  popoverClasses: {
    root: string;
    paper: string;
  };
  useJunoIcon?: boolean;
}
