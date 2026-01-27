export interface SimpleCrmObject {
  type?: string;
  id?: string;
  name?: string;
}

export interface ReferenceItemClickHandler {
  (item: SimpleCrmObject, checked: boolean): void;
}

export interface displayList {
  label: string;
  values: SimpleCrmObject[];
  icon?: any;
  toolTipText?: string;
  customCallBack?: (item: SimpleCrmObject) => void;
}

export interface ReferenceWidgetProps {
  formKey: string;
  placeholder?: string;
  multiple?: boolean;
  overrideLabel?: string;
  disabled?: boolean;
  enableSearch?: boolean;
  onChange: (
    value: SimpleCrmObject[],
    action: { item: SimpleCrmObject; selected: boolean },
  ) => void;
  allDisplayList: displayList[];
  currentValue: SimpleCrmObject[];
  searchFn?: (searchTerm: string) => Promise<displayList['values'] | undefined>;
  onCreateEntity?: () => void;
  useMenuList?: boolean;
  getIcon?: (item: SimpleCrmObject) => React.ReactNode;
  addEntityTooltip?: string;
  autoCloseOnSelect?: boolean;
  clearBtnClearsSelection?: boolean; // Clear button clears both input and selection
}

export type SelectedIdMap = Record<string, boolean>;

export interface ReferenceWidgetAddEntityMenuOption {
  type: string;
  label: string;
  icon: React.ReactNode;
}

export interface ReferenceWidgetAddEntityMenuProps {
  options: ReferenceWidgetAddEntityMenuOption[];
  onSelect: (type: string) => void;
}
