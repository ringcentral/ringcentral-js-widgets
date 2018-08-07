import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import SpinnerOverlay from 'ringcentral-widgets/components/SpinnerOverlay';

import styles from './styles.scss';
import leftArrow from '../../assets/images/left_arrow.png';

import GlipPostList from '../GlipPostList';
import GlipChatForm from '../GlipChatForm';
import GlipGroupName from '../GlipGroupName';

const HEADER_HEIGHT = 50;

export default class GlipChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputHeight: props.mobile ? 100 : 110,
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
    const spinner = showSpinner ? (<SpinnerOverlay />) : null;
    const backIcon =
      mobile ? (
        <img src={leftArrow} alt="Back" className={styles.backIcon} onClick={onBackClick} />
      ) : null;
    return (
      <div
        className={classnames(
          styles.root,
          className,
        )}
      >
        <div className={styles.header} style={{ height: HEADER_HEIGHT }}>
          {backIcon}
          <GlipGroupName group={group} showNumber />
        </div>
        <div
          className={styles.content}
          style={{ height: `calc(100% - ${this.state.inputHeight + HEADER_HEIGHT}px)`}}
        >
          <GlipPostList
            posts={posts}
            atRender={atRender}
            groupId={group.id}
            showName={group.members && (group.members.length > 2)}
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
  mobile: false
};
