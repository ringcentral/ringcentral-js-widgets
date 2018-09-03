import { connect } from 'react-redux';
import withPhone from '../../lib/withPhone';
import QuickAccessPanel from '../../components/QuickAccessPanel';

function mapToProps(_, {
  phone: {
    brand,
    userGuide,
    locale
  },
}) {
  const { quickEnter } = userGuide.carouselState;
  return {
    quickEnter,
    brandName: brand.fullName,
    brandCode: brand.code,
    currentLocale: locale.currentLocale,
  };
}

function mapToFunctions(_, {
  phone: {
    userGuide
  }
}) {
  return {
    onCancel() {
      userGuide.quickBack();
    }
  };
}

const QuickAccessPage = withPhone(connect(
  mapToProps,
  mapToFunctions,
)(QuickAccessPanel));

export {
  mapToFunctions,
  mapToProps,
  QuickAccessPage as default,
};
