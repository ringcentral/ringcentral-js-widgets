import { RcListItem, RcMenuList, spacing, styled } from '@ringcentral/juno';
import clsx from 'clsx';
import React, { Component } from 'react';

import ContactFilterIcon from '../../assets/images/ContactFilter.svg';
import ContactFilterSolidIcon from '../../assets/images/ContactFilterSolid.svg';

import i18n, { type I18nKey } from './i18n';
import styles from './styles.scss';

const StyledListItem = styled(RcListItem)`
  padding-left: ${spacing(2)};
  font-size: 13px;
`;

type ContactSourceFilterProps = {
  className?: string;
  currentLocale: string;
  onSourceSelect?: (...args: any[]) => any;
  selectedSourceName?: string;
  contactSourceNames: string[];
  unfold?: boolean;
  onUnfoldChange?: (...args: any[]) => any;
};

type ContactSourceFilterState = {
  unfold: any;
};

export class ContactSourceFilter extends Component<
  ContactSourceFilterProps,
  ContactSourceFilterState
> {
  _mounted = false;

  constructor(props: ContactSourceFilterProps) {
    super(props);
    const unfold = props.unfold !== undefined ? props.unfold : false;
    this.state = {
      unfold,
    };
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentDidMount() {
    this._mounted = true;
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentWillUnmount() {
    this._mounted = false;
    if (!this.state.unfold) {
      window.removeEventListener('click', this.hideList);
    }
  }

  getString(key: I18nKey, locale: string) {
    return i18n.getString(key, locale);
  }

  hideList = () => {
    if (this._mounted) {
      this.setState({
        unfold: false,
      });
      if (typeof this.props.onUnfoldChange === 'function') {
        this.props.onUnfoldChange(false);
      }
    }
    window.removeEventListener('click', this.hideList);
  };

  showList = () => {
    this.setState({
      unfold: true,
    });
    window.addEventListener('click', this.hideList);
    if (typeof this.props.onUnfoldChange === 'function') {
      this.props.onUnfoldChange(true);
    }
  };

  togglePanel: React.MouseEventHandler<HTMLDivElement> = (evt) => {
    evt.stopPropagation();
    if (!this.state.unfold) {
      this.showList();
      return;
    }
    this.hideList();
  };

  emitSelect = (sourceName: string) => {
    const { onSourceSelect } = this.props;
    if (onSourceSelect) {
      onSourceSelect(sourceName);
    }
    this.hideList();
  };

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const { className, currentLocale, contactSourceNames, selectedSourceName } =
      this.props;
    const isAllSource = selectedSourceName === contactSourceNames[0];
    return (
      <div
        className={clsx(styles.contactSourceFilter, className)}
        data-sign="contactSourceFilterButton"
        onClick={this.togglePanel}
      >
        <div
          data-sign="filterIconContainer"
          className={styles.filterIconContainer}
          // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
          title={this.getString(selectedSourceName, currentLocale)}
        >
          {isAllSource ? (
            <ContactFilterIcon
              className={clsx(styles.filterIconNode, styles.iconNoneFill)}
            />
          ) : (
            <ContactFilterSolidIcon className={styles.filterIconNode} />
          )}
        </div>
        {!this.state.unfold ? null : (
          <RcMenuList
            className={styles.contactSourceList}
            onClick={(e) => e.stopPropagation()}
            data-sign="contactSourceList"
          >
            {contactSourceNames.map((sourceName) => (
              <StyledListItem
                data-sign="contactSourceItem"
                component="div"
                onClick={() => this.emitSelect(sourceName)}
                size="small"
                key={sourceName}
                selected={sourceName === selectedSourceName}
                disableGutters
              >
                {this.getString(sourceName as I18nKey, currentLocale)}
              </StyledListItem>
            ))}
          </RcMenuList>
        )}
      </div>
    );
  }
}
