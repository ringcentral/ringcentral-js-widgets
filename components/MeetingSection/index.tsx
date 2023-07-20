import React, { Component } from 'react';

import classnames from 'classnames';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';

type MeetingSectionProps = {
  title?: string;
  className?: string;
  withSwitch?: boolean;
  toggle?: boolean;
  hideTopBorderLine?: boolean;
  useRCUI?: boolean;
};
type MeetingSectionState = {
  toggle: boolean | any;
};
class MeetingSection extends Component<
  MeetingSectionProps,
  MeetingSectionState
> {
  constructor(...args: any[]) {
    // @ts-expect-error TS(2556): A spread argument must either have a tuple type or... Remove this comment to see the full error message
    super(...args);
    this.state = {
      toggle: this.props.toggle,
    };
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const {
      children,
      title,
      withSwitch,
      className,
      hideTopBorderLine,
      useRCUI,
    } = this.props;
    const toggle = () => {
      this.setState({ toggle: !this.state.toggle });
    };
    const Title = () =>
      title ? <span className={styles.title}>{title}</span> : null;
    const DropDown = ({ isDropDown, onClick }: any) =>
      withSwitch ? (
        <span
          className={classnames(isDropDown ? styles.dropDown : null)}
          onClick={onClick}
        >
          <i className={classnames(dynamicsFont.arrow, styles.arrow)} />
        </span>
      ) : null;
    const topBorderLine = hideTopBorderLine ? styles.hiddenTopBorder : null;
    return (
      <div
        className={classnames(
          styles.section,
          topBorderLine,
          useRCUI ? styles.rcuiStyle : null,
          className,
        )}
      >
        {title ? (
          <div className={styles.spaceBetween}>
            <Title />
            <DropDown isDropDown={this.state.toggle} onClick={toggle} />
          </div>
        ) : null}
        {this.state.toggle ? children : null}
      </div>
    );
  }
}
// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
MeetingSection.defaultProps = {
  className: null,
  title: null,
  withSwitch: false,
  toggle: true,
  hideTopBorderLine: false,
  useRCUI: false,
};
export default MeetingSection;
