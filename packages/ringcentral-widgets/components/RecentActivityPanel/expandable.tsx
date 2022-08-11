// @ts-nocheck
import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

function expandable({
  styles = {},
  className = null,
}: {
  styles?: Record<string, any>;
  className?: string | null;
}) {
  return (WrappedComponent: any) => {
    class Expandable extends PureComponent {
      constructor(props: any) {
        super(props);
        this.state = {
          expanded: false,
        };
      }

      togglePanel = (event: any) => {
        // In case it's fired twice
        event.stopPropagation();
        // @ts-expect-error TS(2339): Property 'trackClickToggle' does not exist on type... Remove this comment to see the full error message
        this.props.trackClickToggle?.(!this.state.expanded);
        // @ts-expect-error TS(2339): Property 'expanded' does not exist on type 'Readon... Remove this comment to see the full error message
        this.setState((prevState) => ({ expanded: !prevState.expanded }));
      };

      // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
      render() {
        // @ts-expect-error TS(2339): Property 'expanded' does not exist on type 'Readon... Remove this comment to see the full error message
        const { expanded } = this.state;
        const _styles = {
          ...styles,
          height: expanded ? styles.height : styles.offset,
        };
        return (
          // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
          <div style={_styles} className={className}>
            <WrappedComponent
              onPanelToggle={this.togglePanel}
              expanded={expanded}
              {...this.props}
            />
          </div>
        );
      }
    }

    // @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
    Expandable.propTypes = {
      trackClickToggle: PropTypes.func,
    };

    // @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
    Expandable.defaultProps = {
      trackClickToggle: undefined,
    };
    return Expandable as any;
  };
}

export default expandable;
