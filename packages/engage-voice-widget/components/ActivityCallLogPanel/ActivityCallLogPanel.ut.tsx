import { StepFunction } from 'crius-test';

import { ActivityCallLogPage } from '../../containers/ActivityCallLogPage';
import { moduleUIPageMount, getCurrentRouteId } from '../../test/utils';

export const UTActivityCallLogPanel: StepFunction<any, any> = async (
  props,
  context,
) => {
  const id = getCurrentRouteId(context.phone.routerInteraction.currentPath);

  const wrapper = moduleUIPageMount(ActivityCallLogPage, { id });

  let index = 0;

  if (props.menuType === 'whatid') {
    index = 1;
  }

  const getSelectList = () => {
    return wrapper
      .find('EditLogSection')
      .find('CallLogFields')
      .find('FieldItem')
      .find('SelectList')
      .at(index);
  };

  const openField = getSelectList()
    .find('[data-sign="select-list-open"]')
    .at(0);

  openField.simulate('click');

  const addMenuIcon = getSelectList()
    .find('RcIconButton[data-sign="addEntityMenu"]')
    .find('button');

  addMenuIcon.simulate('click');

  const menuItems = getSelectList().find('RcMenuItem');

  menuItems.find(`[title="New ${props.entityName}"]`).simulate('click');
  wrapper.unmount();
};
