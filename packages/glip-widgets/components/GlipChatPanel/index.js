import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { SpinnerOverlay } from '@ringcentral-integration/widgets/components/SpinnerOverlay';

import leftArrow from '../../assets/images/left_arrow.png';

import GlipPostList from '../GlipPostList';
import GlipChatForm from '../GlipChatForm';
import GlipGroupName from '../GlipGroupName';
import styles from './styles.scss';

export default class GlipChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputHeight: props.mobile ? 80 : 110,
      headerHeight: props.mobile ? 38 : 50,
    };
  }

  componentDidMount() {
    this.props.loadGroup(this.props.groupId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.groupId !== nextProps.groupId) {
      this.props.loadGroup(nextProps.groupId);
    }
  }

  render() {
    const {
      group,
      className,
      posts,
      updateText,
      createPost,
      textValue,
      dateTimeFormatter,
      showSpinner,
      atRender,
      uploadFile,
      viewProfile,
      loadNextPage,
      onBackClick,
      mobile,
    } = this.props;
    const spinner = showSpinner ? <SpinnerOverlay /> : null;
    // TODO: update alt with i18n
    const backIcon = onBackClick ? (
      <img
        src={leftArrow}
        alt="Back"
        className={styles.backIcon}
        onClick={onBackClick}
      />
    ) : null;
    return (
      <div className={classnames(styles.root, className)}>
        <div
          className={styles.header}
          style={{
            height: this.state.headerHeight,
            lineHeight: `${this.state.headerHeight}px`,
          }}
        >
          {backIcon}
          <GlipGroupName group={group} showNumber />
        </div>
        <div
          className={styles.content}
          style={{
            height: `calc(100% - ${
              this.state.inputHeight + this.state.headerHeight
            }px)`,
          }}
        >
          <GlipPostList
            posts={posts}
            atRender={atRender}
            groupId={group.id}
            showName={group.members && group.members.length > 2}
            dateTimeFormatter={dateTimeFormatter}
            viewProfile={viewProfile}
            loadNextPage={loadNextPage}
          />
        </div>
        <GlipChatForm
          className={styles.inputArea}
          height={this.state.inputHeight}
          textValue={textValue}
          onTextChange={updateText}
          groupId={group.id}
          onSubmit={createPost}
          onUploadFile={uploadFile}
          members={group.detailMembers}
          mobile={mobile}
        />
        {spinner}
      </div>
    );
  }
}

GlipChatPage.propTypes = {
  className: PropTypes.string,
  group: PropTypes.object,
  posts: PropTypes.array,
  groupId: PropTypes.string,
  textValue: PropTypes.string,
  showSpinner: PropTypes.bool,
  loadGroup: PropTypes.func.isRequired,
  updateText: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  dateTimeFormatter: PropTypes.func.isRequired,
  atRender: PropTypes.func,
  onBackClick: PropTypes.func,
  viewProfile: PropTypes.func.isRequired,
  loadNextPage: PropTypes.func.isRequired,
  mobile: PropTypes.bool,
};

GlipChatPage.defaultProps = {
  className: undefined,
  groupId: null,
  group: {},
  posts: [],
  textValue: '',
  showSpinner: false,
  atRender: undefined,
  onBackClick: undefined,
  mobile: false,
};
