import React, { Component } from 'react';
import PropTypes from 'prop-types';

const cache = {};
const defaultContainer = x => x;

/**
 * Reference: https://github.com/mbrevda/react-image
 * This component contains too many features we do not need for now
 *
 * @class PlaceholderImage
 * @extends {Component}
 */
class PlaceholderImage extends Component {
  static propTypes = {
    src: PropTypes.string,
    // Put default image here
    placeholder: PropTypes.node,
    placeholderContainer: PropTypes.func,
    container: PropTypes.func,
  };

  static defaultProps = {
    src: '',
    placeholder: false,
    container: defaultContainer,
    placeholderContainer: defaultContainer,
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isLoaded: false,
    };
  }

  onLoad = () => {
    const { src } = this.props;
    cache[src] = true;
    if (this.img) {
      this.setState({ isLoaded: true });
    }
  }

  onError = () => {
    const { src } = this.props;
    cache[src] = false;

    if (!this.img) {
      return false;
    }

    this.setState({ isLoaded: false });
  }

  loadImg = () => {
    const { src } = this.props;
    this.img = new Image();

    this.img.src = src;

    // TODO: Consider using decode first here
    this.img.onload = this.onLoad;
    this.img.onerror = this.onError;
  }

  unloadImg = () => {
    delete this.img.onerror;
    delete this.img.onload;

    try {
      delete this.img.src;
    } catch (e) {
      console.error('Error: error on deleting img src');
    }

    delete this.img;
  }

  componentDidMount() {
    const { isLoading } = this.state;
    if (isLoading) {
      this.loadImg();
    }
  }

  componentWillUnmount() {
    if (this.img) {
      this.unloadImg();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { src: imgSrc } = nextProps;
    const { src } = this.props;

    if (src !== imgSrc) {
      // If the source is invalid, just render the placeholder
      if (!imgSrc) {
        return this.setState({ isLoading: false, isLoaded: false });
      }

      this.setState({
        isLoaded: false,
        isLoading: false
      }, this.loadImg);
    }
  }

  render() {
    const {
      container,
      src,
      placeholder,
      placeholderContainer,
      ...rest
    } = this.props;

    const {
      isLoading,
      isLoaded,
    } = this.state;

    if (isLoaded) {
      const imgProps = {
        ...{ src },
        ...rest
      };

      /* eslint-disable-next-line */
      return container(<img {...imgProps} />);
    }

    if (!isLoaded && isLoading) {
      return placeholder ? placeholderContainer(placeholder) : null;
    }

    return null;
  }
}

export default PlaceholderImage;
