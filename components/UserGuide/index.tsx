import React from 'react';

import classnames from 'classnames';
import { CSSTransition, Transition } from 'react-transition-group';

import { Button } from '../Button';
import { SpinnerOverlay } from '../SpinnerOverlay';
import i18n from './i18n';
import styles from './styles.scss';

const controlStyles = {
  entered: { transform: 'translateY(0)' },
};
type UserGuideProps = {
  curIdx?: number;
  entered?: boolean;
  playing?: boolean;
  firstLogin?: boolean;
  updateCarousel?: (...args: any[]) => any;
  quickAccessEnter?: (...args: any[]) => any;
  guides: any[];
  showSpinner: boolean;
  currentLocale: string;
  carouselClassName?: string;
};
type UserGuideState = {
  curIdx: any;
  entered: any;
  playing: any;
};
class UserGuide extends React.Component<UserGuideProps, UserGuideState> {
  constructor(props) {
    super(props);
    this.state = {
      curIdx: props.curIdx || 0,
      entered: props.entered || false,
      playing: props.playing || false,
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
      curIdx: idx,
    });
    this.props.updateCarousel({
      curIdx: idx,
      entered: this.state.entered,
      playing: this.state.playing,
    });
  };
  exit = () => {
    if (this.props.quickAccessEnter && this.props.firstLogin) {
      this.setState({
        playing: false,
      });
      this.props.updateCarousel({
        curIdx: this.state.curIdx,
        entered: this.state.entered,
        playing: false,
      });
      this.props.quickAccessEnter();
    } else {
      this.setState({
        playing: false,
      });
      this.onExited();
    }
  };
  onExited = () => {
    this.setState({
      entered: false,
    });
    this.props.updateCarousel({
      curIdx: 0,
      entered: false,
      playing: false,
      firstLogin: false,
    });
  };
  getIntroView() {
    return (
      <div className={styles.intro} data-sign="userGuide">
        <div
          className={styles.introBg}
          style={{ backgroundImage: `url(${this.props.guides[0]})` }}
        />
        <div className={styles.buttonGroup}>
          <Button
            className={styles.primaryButton}
            onClick={() => {
              this.slideTo(1);
            }}
          >
            {i18n.getString('start', this.props.currentLocale)}
          </Button>
          <Button
            onClick={() => {
              this.exit();
            }}
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
          transform: `translateX(${(i + 1) * 100}vw)`,
        }}
      />
    ));
    const indicatorView = guides.map((_, i) => {
      const highlight = i + 1 === this.state.curIdx ? styles.highlight : null;
      return (
        <li
          key={i}
          className={classnames(styles.dot, highlight)}
          onClick={() => {
            this.slideTo(i + 1);
          }}
        />
      );
    });
    const onLastPage = this.state.curIdx === this.props.guides.length - 1;
    const skipButton = onLastPage ? (
      <div className={styles.secondaryButton} />
    ) : (
      <Button
        onClick={() => {
          this.exit();
        }}
        className={classnames(styles.secondaryButton)}
        dataSign="skipButton"
      >
        {i18n.getString('skip', this.props.currentLocale)}
      </Button>
    );
    const nextButton = (
      <Button
        onClick={() => {
          this.slideTo(this.state.curIdx + 1);
        }}
        className={classnames(styles.primaryButton)}
      >
        {onLastPage
          ? i18n.getString('finish', this.props.currentLocale)
          : i18n.getString('next', this.props.currentLocale)}
      </Button>
    );
    const controlView = (
      <Transition in={this.state.curIdx > 0} timeout={300}>
        {(state) => (
          <div className={styles.control} style={{ ...controlStyles[state] }}>
            {skipButton}
            <ul className={styles.indicator}>{indicatorView}</ul>
            {nextButton}
          </div>
        )}
      </Transition>
    );
    const { carouselClassName } = this.props;
    return (
      <div className={classnames(styles.carousel, carouselClassName)}>
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
    if (
      !this.props.guides ||
      this.props.guides.length === 0 ||
      !this.state.entered
    )
      return null;
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
          exitActive: styles.exitActive,
        }}
        onExited={this.onExited}
        appear
      >
        <div className={styles.root}>{view}</div>
      </CSSTransition>
    );
  }
}
UserGuide.defaultProps = {
  curIdx: 0,
  entered: false,
  playing: false,
  firstLogin: false,
  updateCarousel: () => null,
  quickAccessEnter: undefined,
  carouselClassName: null,
};
export default UserGuide;
