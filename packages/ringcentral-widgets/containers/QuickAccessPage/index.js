import { connect } from 'react-redux';
import withPhone from '../../lib/withPhone';
import QuickAccessPanel from '../../components/QuickAccessPanel';

function mapToProps(_, {
  phone: {
    brand,
    quickAccess,
    locale
  },
}) {
  const entered = quickAccess.entered;
  return {
    entered,
    brandName: brand.fullName,
    brandCode: brand.code,
    currentLocale: locale.currentLocale,
  };
}

function mapToFunctions(_, {
  phone: {
    quickAccess
  }
}) {
  return {
    onFinish() {
      quickAccess.exit();
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
