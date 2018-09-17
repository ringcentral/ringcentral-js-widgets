import { connect } from 'react-redux';
import { withPhone } from '../../lib/phoneContext';
import UserGuide from '../../components/UserGuide';

function mapToProps(_, {
  phone: {
    locale,
    userGuide
  },
}) {
  const { curIdx, entered, playing } = userGuide.carouselState;
  return {
    showSpinner: !(
      userGuide.ready && 
      userGuide.preLoadImageStatus &&
      locale.ready
    ),
    currentLocale: locale.currentLocale,
    curIdx,
    entered,
    playing,
    firstLogin: userGuide.state.firstLogin,
    guides: userGuide.guides,
  };
}

function mapToFunctions(_, {
  phone: {
    userGuide,
    quickAccess
  }
}) {
  return {
    updateCarousel: (...args) => userGuide.updateCarousel(...args),
    quickAccessEnter: () => quickAccess && quickAccess.enter()
  };
}

export default withPhone(connect(
  mapToProps,
  mapToFunctions,
)(UserGuide));
