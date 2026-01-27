import {
  action,
  computed,
  RcViewModule,
  state,
} from '@ringcentral-integration/next-core';

/**
 * common list selection, let you can easy select multiple items once easily.
 */
export abstract class ListSelectionView<T> extends RcViewModule {
  /**
   * getter of that map key
   * @default (item) => item.id
   */
  protected getSelectedKey(curr: T) {
    return (curr as any)['id'];
  }

  @state
  selectedMode = false;

  @action
  setSelectedMode(val: boolean) {
    this.selectedMode = val;
  }

  @state
  selectedIdsMap: Record<string, boolean> = {};

  @action
  private _setSelectedMessageIdsMap(map: Record<string, boolean>) {
    this.selectedIdsMap = map;
  }

  @action
  toggleSelectedMessageIds(id: string, state: boolean) {
    this.selectedIdsMap[id] = state;
  }

  @action
  private clearAllSelectedIdsMap() {
    this.selectedIdsMap = {};
  }

  @computed((that: ListSelectionView<T>) => [that.selectedIdsMap])
  get checkedIds() {
    return Object.entries(this.selectedIdsMap).reduce<string[]>((acc, curr) => {
      const [key, value] = curr;
      if (value) {
        acc.push(key);
      }
      return acc;
    }, []);
  }

  /**
   * @returns is that have set any state
   */
  leaveSelectedMode() {
    if (this.selectedMode) {
      this.setSelectedMode(false);
    }

    if (Object.keys(this.selectedIdsMap).length > 0) {
      this.clearAllSelectedIdsMap();
    }
  }

  /**
   * multiple select behaviors can view here https://react-spectrum.adobe.com/react-aria/useTable.html#multiple-selection
   */
  selectAll(items: T[], indeterminate: boolean) {
    if (indeterminate) {
      this._addAllSelectedIdsMap(items);
    } else {
      if (this.checkedIds.length === 0) {
        this._addAllSelectedIdsMap(items);
      } else {
        this.clearAllSelectedIdsMap();
      }
    }
  }

  private _addAllSelectedIdsMap(items: T[]) {
    const selectAllMap = items.reduce<typeof this.selectedIdsMap>(
      (acc, curr) => {
        acc[this.getSelectedKey(curr)] = true;
        return acc;
      },
      {},
    );

    this._setSelectedMessageIdsMap(selectAllMap);
  }
}
