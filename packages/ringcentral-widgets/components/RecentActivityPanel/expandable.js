import React, { PureComponent } from 'react';

export default function expandable({ styles = {}, className = null }) {
  return WrappedComponent =>
    class Expandable extends PureComponent {
      constructor(props) {
        super(props);
        this.state = {
          expanded: false
        };
      }

      togglePanel = (event) => {
        // In case it's fired twice
        event.stopPropagation();
        this.setState(prevState => ({ expanded: !prevState.expanded }));
      };

      render() {
        const { expanded } = this.state;
        const _styles = Object.assign({}, styles, {
          height: expanded ? styles.height : styles.offset
        });
        return (
          <div
            style={_styles}
            className={className}
          >
            <WrappedComponent
              onPanelToggle={this.togglePanel}
              expanded={expanded}
              {...this.props}
            />
          </div>
        );
      }
    };
}
