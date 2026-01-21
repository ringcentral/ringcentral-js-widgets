import {
  action,
  autobind,
  delegate,
  injectable,
  optional,
  RcViewModule,
  useConnector,
} from '@ringcentral-integration/next-core';
import React from 'react';

import { CallAction, HistoryCall } from '../../../../services';
import { useCallDetailPageContent } from '../../../CallDetailView/CallDetailPage';
import { CallsListViewSpring } from '../../../CallsListViewSpring';
import { CallViewState } from '../../services';

import type {
  PostCallViewOptions,
  PostCallViewProps,
} from './PostCall.view.interface';

@injectable({
  name: 'PostCallView',
})
export class PostCallView extends RcViewModule {
  constructor(
    private _callViewState: CallViewState,
    private _callsListView: CallsListViewSpring,
    private _callAction: CallAction,
    @optional('PostCallViewOptions')
    private _postCallViewOptions?: PostCallViewOptions,
  ) {
    super();
  }

  @action
  private _goBack() {
    const postCallViewTelephonySessionId =
      this._callViewState.postCallViewTelephonySessionId;

    this._callViewState._setPostCallView(null);

    if (postCallViewTelephonySessionId) {
      this._callAction._remove(postCallViewTelephonySessionId);
      this._callViewState._setView('hidden');
    }
  }

  @delegate('server')
  async goBack() {
    // Call the onBeforeGoBack callback if provided
    if (this._postCallViewOptions?.onBeforeGoBack) {
      const postCallCallLog = this._callViewState.postCallCallLog;
      const sessionId = postCallCallLog?.sessionId ?? null;
      await this._postCallViewOptions.onBeforeGoBack(sessionId);
    }

    // set from post call view to true for us to know that we are coming from post call view
    this._callAction.fromPostCall = true;

    this._goBack();
  }

  @autobind
  Content(props: { currentCallLog: HistoryCall } & PostCallViewProps) {
    const { useCallHistoryItemInfo, useActionsHandler } =
      this.getUIFunctions(props);
    const { currentCallLog, variant } = props;

    const { header, info } = useCallDetailPageContent({
      currentCallLog,
      goBack: () => {
        this.goBack();
      },
      useCallHistoryItemInfo,
      useActionsHandler,
    });

    return variant === 'header' ? header : info;
  }

  getUIFunctions(props: PostCallViewProps) {
    return {
      useCallHistoryItemInfo: this._callsListView.useCallHistoryItemInfo,
      useActionsHandler: this._callsListView.useActionsHandler,
    };
  }

  component(props: PostCallViewProps) {
    const postCallCallLog = useConnector(
      () => this._callViewState.postCallCallLog,
    );

    if (!postCallCallLog) {
      this.logger.error('postCallCallLog not found');

      return null;
    }

    return <this.Content {...props} currentCallLog={postCallCallLog} />;
  }
}
