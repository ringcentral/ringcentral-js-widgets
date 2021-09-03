import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default function expandable({ styles = {}, className = null }) {
  return (WrappedComponent) => {
    class Expandable extends PureComponent {
      constructor(props) {
        super(props);
        this.state = {
          expanded: false,
        };
      }

      togglePanel = (event) => {
        // In case it's fired twice
        event.stopPropagation();
        this.props.trackClickToggle?.(!this.state.expanded);
        this.setState((prevState) => ({ expanded: !prevState.expanded }));
      };

      render() {
        const { expanded } = this.state;
        const _styles = {
          ...styles,
          height: expanded ? styles.height : styles.offset,
        };
        return (
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

    Expandable.propTypes = {
      trackClickToggle: PropTypes.func,
    };

    Expandable.defaultProps = {
      trackClickToggle: undefined,
    };
    return Expandable;
  };
}
