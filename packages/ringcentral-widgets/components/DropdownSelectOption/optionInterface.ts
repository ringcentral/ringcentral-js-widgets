export interface OptionType {
  option: {
    key?: string | number;
    text: string;
    disabled?: boolean;
    dataSign: string;
    data?: Partial<{
      icon: string;
    }>;
  };
}

export interface OptionsInterface extends OptionType {
  isOption: boolean;
  stylesFromProps?: Partial<{
    marginRight5: string;
    icon: string;
    disabled: string;
    value: string;
    option: string;
  }>;
}
