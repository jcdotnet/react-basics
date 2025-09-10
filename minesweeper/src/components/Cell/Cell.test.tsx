import { render, fireEvent } from '@testing-library/react';
import Cell from './Cell';
import type CellProps from '../../types/components/Cell';

beforeEach(()=>{});

describe('Cell', () => {
  const cellProps: CellProps = {
    info: {
      value: 0,
      opened: false,
      flagged: false 
    },
    row: 1,
    col: 1,
    cellOnClick: jest.fn(),
    cellOnContextMenu: jest.fn(),
  }
  test('cellInDocument', () => {
    const { container } = render(<Cell {...cellProps} />);
    const cell = container.querySelector('.cell');
    expect(cell).toBeInTheDocument();
  });
  test('handleClick', () => {
    const { container } = render(<Cell {...cellProps} />);
    const cell = container.querySelector('.cell');
    fireEvent.click(cell!);
    expect(cellProps.cellOnClick).toHaveBeenCalled();
  });
  test('handleContextMenu', () => {
    const { container } = render(<Cell {...cellProps} />);
    const cell = container.querySelector('.cell');
    fireEvent.contextMenu(cell!);
    expect(cellProps.cellOnContextMenu).toHaveBeenCalled();
  });
});