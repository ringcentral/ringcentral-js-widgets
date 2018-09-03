// /**
//  * @file Select
//  */
// import React from 'react';

// import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';
// import Select from '../../components/Select';

// storiesOf('Select', module)
//   .add('basic', () => {
//     const style = {
//       customSelect: {
//         background: "red",
//       },
//     }
//     const selectProps = {
//       options: [{
//         key: 'option1',
//         value: 'option1'
//       }, {
//         key: 'option2',
//         value: 'option2'
//       }],
//       valueFunction: option => option.key,
//       renderFunction: option => option.value,
//       className: style.customSelect,
//     };
//     return (
//       <div style={{ width: "250px", height: "60px" }}>
//         <Select {...selectProps} />
//       </div>
//     );
//   });
