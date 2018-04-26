import React from 'react';
// eslint-disable-next-line
import SearchInput from 'ringcentral-widgets/components/SearchInput';

const props = {};
props.value = 'test string';
props.onChange = () => null;

/**
 * A example of `SearchInput`
 */
const SearchInputDemo = () => (
  <SearchInput
    {...props}
  />
);
export default SearchInputDemo;
