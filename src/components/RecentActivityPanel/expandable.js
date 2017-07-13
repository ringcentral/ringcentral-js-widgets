import React, { PureComponent } from 'react';
import styles from './expandable-styles.scss';

export default function expandable({ height = '50%', offset = '40px' }) {
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
        const _height = expanded ? height : offset;
        return (
          <div className={styles.expandable} style={{ height: _height }}>
            <WrappedComponent
              onToggle={this.togglePanel}
              expanded={expanded}
              {...this.props}
            />
          </div>
        );
      }
    };
}
