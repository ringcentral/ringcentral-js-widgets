import { fireEvent, render, screen } from '@ringcentral-integration/test-utils';
import { waitFor } from '@testing-library/react';
import { Virtuoso } from '@ringcentral/juno';
import React from 'react';

const Case = () => {
  const [data, setData] = React.useState([{ name: 'Item 0' }]);

  return (
    <>
      <Virtuoso
        data={data}
        itemContent={(index: number, item: { name: string }) => {
          return <div key={index}>{item.name}</div>;
        }}
      />
      <button
        onClick={() => {
          setData([{ name: 'Item 1' }, { name: 'Item 2' }]);
        }}
      >
        Set Data
      </button>
    </>
  );
};

describe('Virtuoso mock test', () => {
  it('updates when data is propagated (same length)', async () => {
    const { asFragment } = render(<Case />);

    expect(screen.queryByText('Item 0')).toBeInTheDocument();

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(await screen.findByText('Item 1')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('Item 0')).not.toBeInTheDocument();
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
