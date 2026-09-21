import { render, screen } from '@ringcentral-integration/test-utils';
import '@testing-library/jest-dom';
import React from 'react';

import { NavigationButton } from '../../components/TabNavigationButton';

const IconComponent = () => <span data-sign="iconComponent">icon</span>;

const getProps = (overrides: any = {}) => ({
  icon: IconComponent,
  activeIcon: IconComponent,
  label: 'Calls',
  width: 50,
  height: 50,
  onClick: jest.fn(),
  keepStyle: false,
  activeClassName: 'active',
  inActiveClassName: 'inactive',
  ...overrides,
});

describe('NavigationButton', () => {
  it('renders an icon passed as a component type', () => {
    render(<NavigationButton {...getProps()} />);

    expect(screen.getByText('icon')).toBeInTheDocument();
  });

  it('renders an icon passed as a React element', () => {
    render(
      <NavigationButton {...getProps({ icon: <span>elementIcon</span> })} />,
    );

    expect(screen.getByText('elementIcon')).toBeInTheDocument();
  });
});
