import RcModule from 'ringcentral-integration/lib/RcModule';
import { Module } from 'ringcentral-integration/lib/di';

<% if (dependencies.length > 0) { %>
import getReducer from './getReducer';
import actionTypes from './actionTypes';
<% } %>

@Module({
  deps: [
    <%_ dependencies.forEach(function(dependence) { -%>
    <%- `{ dep: '${dependence}' },` %>
    <%_ }) -%>
    { dep: '<%- name %>Options', optional: true, spread: true },
  ],
})
export default class <%- name %> extends RcModule {
  constructor({
    <%_ dependencies.forEach(function(dependence) { -%>
    <%- `${dependence.charAt(0).toLowerCase()}${dependence.slice(1)},` %>
    <%_ }) -%>
    ...options,
  }) {
    super({
      <% if (dependencies.length > 0) { %>
      actionTypes,
      <% } %>
      ...options,
    });

    <%_ dependencies.forEach(function(dependence) { -%>
    <%- `this._${dependence.charAt(0).toLowerCase()}${dependence.slice(1)} = ${dependence.charAt(0).toLowerCase()}${dependence.slice(1)};` %>
    <%_ }) -%>
    <% if (dependencies.length > 0) { %>
    this._reducer = getReducer(this.actionTypes);
    <% } %>
    // your codes here
  }
  // your codes here
  <% if (dependencies.length > 0) { %>
  // Codes on state change
  async _onStateChange() {
    if (this._shouldInit()) {
      this.store.dispatch({
        type: this.actionTypes.initSuccess
      });
    } else if (this._shouldReset()) {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess,
      });
    }
  }

  _shouldInit() {
    return (
      <%_ dependencies.forEach(function(dependence) { -%>
      <%- `this._${dependence.charAt(0).toLowerCase()}${dependence.slice(1)}.ready &&` %>
      <%_ }) -%>
      this.pending
    );
  }

  _shouldReset() {
    return (
      (
        <%_ dependencies.forEach(function(dependence, index) { -%>
        <%- `!this._${dependence.charAt(0).toLowerCase()}${dependence.slice(1)}.ready${index === (dependencies.length - 1) ? '' : ' ||'}` %>
        <%_ }) -%>
      ) &&
      this.ready
    );
  }

  get status() {
    return this.state.status;
  }
  <% } %>
  <% if (dependencies.length === 0) { %>
  get ready() {
    return true;
  }
  <% } %>
}
