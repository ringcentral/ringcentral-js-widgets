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
      locale.ready
    ),
    currentLocale: locale.currentLocale,
    curIdx,
    entered,
    playing,
    guides: userGuide.guides
  };
}

function mapToFunctions(_, {
  phone: {
    userGuide
  }
}) {
  return {
    updateCarousel: (...args) => userGuide.updateCarousel(...args),
  };
}

export default withPhone(connect(
  mapToProps,
  mapToFunctions,
)(UserGuide));
