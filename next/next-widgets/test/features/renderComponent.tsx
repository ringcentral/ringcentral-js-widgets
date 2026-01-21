import { renderViewPanel } from '@ringcentral-integration/app-demo-test/test/steps/renderView';
import React from 'react';

import {
  ActionMenuListProps,
  ActionMenuList,
  useHistoryActionButtons,
  HistoryAction,
  HistoryActionType,
} from '../../components';

type AppProps = {
  actions: HistoryAction[];
  onAction: (key: HistoryActionType) => void;
};

const App = ({ actions, onAction, ...rest }: AppProps) => {
  const buttons = useHistoryActionButtons(actions, onAction);
  return <ActionMenuList buttons={buttons} {...rest} />;
};

export const renderComponent = (
  props: AppProps & Partial<ActionMenuListProps>,
) => {
  return renderViewPanel(<App {...props} />);
};
