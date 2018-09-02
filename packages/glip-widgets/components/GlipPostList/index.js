import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';

import GlipPostItem from '../GlipPostItem';

export default class GlipPostList extends PureComponent {
  constructor(props) {
    super(props);
    this._scrollTop = 0;
    this._scrollHeight = 0;
    this.state = {
      loadingNextPage: false
    };
  }

  componentDidMount() {
    this._mounted = true;
    this._scrollToLastMessage();
  }

  componentDidUpdate(prevProps) {
    if (!this._mounted) {
      return;
    }
    if (
      prevProps.groupId !== this.props.groupId
    ) {
      this._scrollUp = false;
      this._scrollToLastMessage();
    } else if (prevProps.posts.length !== this.props.posts.length) {
      const prevLastPost = prevProps.posts[prevProps.posts.length - 1] || {};
      const lastPost = this.props.posts[this.props.posts.length - 1] || {};
      if (lastPost.id !== prevLastPost.id || prevProps.posts.length > this.props.posts.length) {
        if (!this._scrollUp) {
          this._scrollToLastMessage();
        }
      } else if (this._listRef && this._scrollHeight !== this._listRef.scrollHeight) {
        this._listRef.scrollTop =
          this._listRef.scrollTop + (this._listRef.scrollHeight - this._scrollHeight);
      }
    }
    this._scrollHeight = this._listRef.scrollHeight;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  _onScroll = async () => {
    if (!this._listRef || !this._mounted) {
      return;
    }
    const currentScrollTop = this._listRef.scrollTop;
    this._scrollHeight = this._listRef.scrollHeight;
    const clientHeight = this._listRef.clientHeight;
    if (currentScrollTop < this._scrollTop && currentScrollTop < this._scrollHeight - 200) {
      // user scroll up
      this._scrollUp = true;
    } else if (currentScrollTop + clientHeight > this._scrollHeight - 200) {
      // user scroll down to bottom
      this._scrollUp = false;
    }
    if (
      currentScrollTop < 20 &&
      this._scrollTop >= 20
    ) {
      this.setState({
        loadingNextPage: true
      });
      await this.props.loadNextPage();
      if (!this._mounted) {
        return;
      }
      this.setState({
        loadingNextPage: false
      });
    }
    this._scrollTop = currentScrollTop;
  }

  _scrollToLastMessage() {
    if (this._listRef) {
      this._listRef.scrollTop = this._listRef.scrollHeight;
    }
  }

  render() {
    const {
      posts,
      className,
      dateTimeFormatter,
      showName,
      atRender,
      viewProfile,
    } = this.props;
    let lastDate;
    return (
      <div
        className={classnames(
          styles.root,
          className,
        )}
        ref={(list) => { this._listRef = list; }}
        onScroll={this._onScroll}
      >
        { this.state.loadingNextPage ? (<div className={styles.loading}>Loading...</div>) : null }
        {
          posts.map((post) => {
            const date = new Date(post.creationTime);
            const time = (
              date - lastDate < 60 * 1000 && date.getMinutes() === lastDate.getMinutes()
            ) ? null : dateTimeFormatter(post.creationTime);
            lastDate = date;
            return (
              <GlipPostItem
                post={post}
                key={post.id}
                creationTime={time}
                showName={showName}
                atRender={atRender}
                viewProfile={viewProfile}
              />
            );
          })
        }
      </div>
    );
  }
}

GlipPostList.propTypes = {
  className: PropTypes.string,
  posts: PropTypes.array,
  groupId: PropTypes.string,
  showName: PropTypes.bool,
  dateTimeFormatter: PropTypes.func.isRequired,
  viewProfile: PropTypes.func.isRequired,
  loadNextPage: PropTypes.func.isRequired,
  atRender: PropTypes.func,
};

GlipPostList.defaultProps = {
  className: undefined,
  posts: [],
  showName: true,
  groupId: undefined,
  atRender: undefined,
};
