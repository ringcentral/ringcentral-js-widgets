import React, { Component } from 'react';

const cache = {};
const defaultContainer = (x: any) => x;
type PlaceholderImageProps = {
  src?: string;
  placeholder?: React.ReactNode;
  placeholderContainer?: (...args: any[]) => any;
  container?: (...args: any[]) => any;
};
type PlaceholderImageState = {
  isLoaded: boolean;
  isLoading: boolean;
};
/**
 * Reference: https://github.com/mbrevda/react-image
 * This component contains too many features we do not need for now
 *
 * @class PlaceholderImage
 * @extends {Component}
 */
class PlaceholderImage extends Component<
  PlaceholderImageProps,
  PlaceholderImageState
> {
  static defaultProps = {
    src: '',
    placeholder: false,
    container: defaultContainer,
    placeholderContainer: defaultContainer,
  };
  img: any;
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      isLoaded: false,
    };
  }
  onLoad = () => {
    const { src } = this.props;
    // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
    cache[src] = true;
    if (this.img) {
      this.setState({ isLoaded: true });
    }
  };
  onError = () => {
    const { src } = this.props;
    // @ts-expect-error TS(2538): Type 'undefined' cannot be used as an index type.
    cache[src] = false;
    if (!this.img) {
      return false;
    }
    this.setState({ isLoaded: false });
  };
  loadImg = () => {
    const { src } = this.props;
    this.img = new Image();
    this.img.src = src;
    // TODO: Consider using decode first here
    this.img.onload = this.onLoad;
    this.img.onerror = this.onError;
  };
  unloadImg = () => {
    delete this.img.onerror;
    delete this.img.onload;
    try {
      delete this.img.src;
    } catch (e) {
      console.error('Error: error on deleting img src');
    }
    delete this.img;
  };
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentDidMount() {
    const { isLoading } = this.state;
    if (isLoading) {
      this.loadImg();
    }
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentWillUnmount() {
    if (this.img) {
      this.unloadImg();
    }
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  UNSAFE_componentWillReceiveProps(nextProps: any) {
    const { src: imgSrc } = nextProps;
    const { src } = this.props;
    if (src !== imgSrc) {
      // If the source is invalid, just render the placeholder
      if (!imgSrc) {
        return this.setState({ isLoading: false, isLoaded: false });
      }
      this.setState(
        {
          isLoaded: false,
          isLoading: false,
        },
        this.loadImg,
      );
    }
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const { container, src, placeholder, placeholderContainer, ...rest } =
      this.props;
    const { isLoading, isLoaded } = this.state;
    if (isLoaded) {
      const imgProps = {
        ...{ src },
        ...rest,
      };
      /* eslint-disable-next-line */
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      return container(<img {...imgProps} />);
    }
    if (!isLoaded && isLoading) {
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      return placeholder ? placeholderContainer(placeholder) : null;
    }
    return null;
  }
}
export default PlaceholderImage;
