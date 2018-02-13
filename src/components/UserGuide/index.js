import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Transition, CSSTransition } from 'react-transition-group';
import SpinnerOverlay from '../SpinnerOverlay';
import Button from '../Button';
import styles from './styles.scss';
import i18n from './i18n';

const controlStyles = {
  entered: { transform: 'translateY(0)' }
};

export default class UserGuide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curIdx: props.curIdx || 0,
      entered: props.entered || false,
      playing: props.playing || false
    };
  }

  componentWillReceiveProps(nextProps) {
    const { curIdx, entered, playing } = nextProps;
    if (this.state.curIdx !== curIdx) {
      this.setState({ curIdx });
    }
    if (this.state.entered !== entered) {
      this.setState({ entered });
    }
    if (this.state.playing !== playing) {
      this.setState({ playing });
    }
  }

  slideTo = (idx) => {
    if (idx > this.props.guides.length - 1) {
      this.exit();
      return;
    }
    this.setState({
      curIdx: idx
    });
    this.props.updateCarousel({
      curIdx: idx,
      entered: this.state.entered,
      playing: this.state.playing
    });
  }

  exit = () => {
    this.setState({
      playing: false,
    });
    this.props.updateCarousel({
      curIdx: this.state.curIdx,
      entered: this.state.entered,
      playing: false
    });
  }

  onExited = () => {
    this.setState({
      entered: false
    });
    this.props.updateCarousel({
      curIdx: 0,
      entered: false,
      playing: false
    });
  }

  getIntroView() {
    return (
      <div className={styles.intro}>
        <div
          className={styles.introBg}
          style={{ backgroundImage: `url(${this.props.guides[0]})` }}
        >
        </div>
        <div className={styles.buttonGroup}>
          <Button
            className={styles.primaryButton}
            onClick={() => { this.slideTo(1); }}
          >
            {i18n.getString('start', this.props.currentLocale)}
          </Button>
          <Button
            onClick={() => { this.exit(); }}
            className={styles.secondaryButton}
          >
            {i18n.getString('skip', this.props.currentLocale)}
          </Button>
        </div>
      </div>
    );
  }

  getCarouselView() {
    const guides = this.props.guides.slice(1, this.props.guides.length);
    const imageView = guides.map((guide, i) => (
      <div
        key={i}
        className={styles.view}
        style={{
          backgroundImage: `url(${guide})`,
          transform: `translateX(${(i + 1) * 100}vw)`
        }}
      >
      </div>
    ));
    const indicatorView = guides.map((_, i) => {
      const highlight = i + 1 === this.state.curIdx ? styles.highlight : null;
      return (
        <li
          key={i}
          className={classnames(styles.dot, highlight)}
          onClick={() => { this.slideTo(i + 1); }}
        >
        </li>
      );
    });
    const onLastPage = this.state.curIdx === this.props.guides.length - 1;
    const skipButton = onLastPage
      ? (<div className={styles.secondaryButton}></div>)
      : (
        <Button
          onClick={() => { this.exit(); }}
          className={classnames(styles.secondaryButton)}
        >
          { i18n.getString('skip', this.props.currentLocale) }
        </Button>
      );
    const nextButton = (
      <Button
        onClick={() => { this.slideTo(this.state.curIdx + 1); }}
        className={classnames(styles.primaryButton)}
      >
        { onLastPage
        ? i18n.getString('finish', this.props.currentLocale)
            : i18n.getString('next', this.props.currentLocale) }
      </Button>
    );
    const controlView = (
      <Transition
        in={this.state.curIdx > 0}
        timeout={300}
      >
        {state => (
          <div className={styles.control} style={{ ...controlStyles[state] }}>
            {skipButton}
            <ul className={styles.indicator}>
              {indicatorView}
            </ul>
            {nextButton}
          </div>
        )}
      </Transition>
    );
    return (
      <div className={styles.carousel}>
        <div
          className={styles.carouselBox}
          style={{ transform: `translateX(-${this.state.curIdx * 100}vw)` }}
        >
          {this.getIntroView()}
          {imageView}
        </div>
        {controlView}
      </div>
    );
  }

  render() {
    if (!this.state.entered) return null;
    if (this.props.showSpinner) {
      return <SpinnerOverlay />;
    }
    const view = this.getCarouselView();
    return (
      <CSSTransition
        in={this.state.playing}
        timeout={400}
        classNames={{
          appear: styles.enter,
          appearActive: styles.enterActive,
          exit: styles.exit,
          exitActive: styles.exitActive
        }}
        onExited={this.onExited}
        appear
      >
        <div className={styles.root}>
          {view}
        </div>
      </CSSTransition>
    );
  }
}

UserGuide.propTypes = {
  curIdx: PropTypes.number,
  entered: PropTypes.bool,
  playing: PropTypes.bool,
  updateCarousel: PropTypes.func,
  guides: PropTypes.array.isRequired,
  showSpinner: PropTypes.bool.isRequired,
  currentLocale: PropTypes.string.isRequired,
};

UserGuide.defaultProps = {
  curIdx: 0,
  entered: false,
  playing: false,
  updateCarousel: () => null
};
