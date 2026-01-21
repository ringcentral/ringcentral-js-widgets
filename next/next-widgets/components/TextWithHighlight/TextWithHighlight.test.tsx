import { render, screen } from '@testing-library/react';
import React from 'react';

import {
  indexesOf,
  mergeOverlappingRanges,
  TextWithHighlight,
} from './TextWithHighlight';

describe('TextWithHighlight Component', () => {
  test('should render text without highlights when no highlight text provided', () => {
    render(<TextWithHighlight text="Hello world" highLightText={null} />);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  test('should render text without highlights when empty highlight text provided', () => {
    render(<TextWithHighlight text="Hello world" highLightText="" />);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  test('should render text without highlights when undefined highlight text provided', () => {
    render(<TextWithHighlight text="Hello world" highLightText={undefined} />);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  test('should highlight single match', () => {
    render(<TextWithHighlight text="Hello world" highLightText="world" />);

    const highlightedText = screen.getByText('world');
    expect(highlightedText).toBeInTheDocument();
    expect(highlightedText).toHaveAttribute('data-sign', 'highlight');
    expect(highlightedText).toHaveClass('font-bold');
  });

  test('should highlight multiple matches of same term', () => {
    render(
      <TextWithHighlight text="hello hello hello" highLightText="hello" />,
    );

    const highlights = screen.getAllByText('hello');
    expect(highlights).toHaveLength(3);
    highlights.forEach((highlight) => {
      expect(highlight).toHaveAttribute('data-sign', 'highlight');
      expect(highlight).toHaveClass('font-bold');
    });
  });

  test('should be case insensitive', () => {
    render(
      <TextWithHighlight text="Hello WORLD world" highLightText="world" />,
    );

    const highlights = screen.getAllByText(/world/i);
    expect(highlights).toHaveLength(2);
    highlights.forEach((highlight) => {
      expect(highlight).toHaveAttribute('data-sign', 'highlight');
    });
  });

  test('should handle array of highlight terms', () => {
    render(
      <TextWithHighlight
        text="Hello world test"
        highLightText={['hello', 'test']}
      />,
    );

    const helloHighlight = screen.getByText(/hello/i);
    const testHighlight = screen.getByText('test');

    expect(helloHighlight).toHaveAttribute('data-sign', 'highlight');
    expect(testHighlight).toHaveAttribute('data-sign', 'highlight');
  });

  test('should merge overlapping highlights', () => {
    render(<TextWithHighlight text="abcdef" highLightText={['abc', 'cde']} />);

    // Should merge overlapping highlights into one
    const highlights = screen.getAllByText(/[a-f]+/);
    const highlightedElements = highlights.filter((el) =>
      el.hasAttribute('data-sign'),
    );

    expect(highlightedElements.length).toBeGreaterThan(0);
  });

  test('should apply custom highlight classes', () => {
    const customClasses = { highlight: 'custom-highlight-class' };
    render(
      <TextWithHighlight
        text="Hello world"
        highLightText="world"
        classes={customClasses}
      />,
    );

    const highlightedText = screen.getByText('world');
    expect(highlightedText).toHaveClass('font-bold', 'custom-highlight-class');
  });

  test('should pass through HTML attributes', () => {
    render(
      <TextWithHighlight
        text="Hello world"
        highLightText="world"
        className="custom-class"
        data-sign="text-component"
      />,
    );

    const component = screen.getByTestId('text-component');
    expect(component).toHaveClass('custom-class');
    expect(component).toHaveAttribute('title', 'Hello world');
  });

  test('should handle single character highlights', () => {
    render(<TextWithHighlight text="abcabc" highLightText="a" />);

    const highlights = screen.getAllByText('a');
    expect(highlights).toHaveLength(2);
    highlights.forEach((highlight) => {
      expect(highlight).toHaveAttribute('data-sign', 'highlight');
    });
  });

  test('should handle text with special characters', () => {
    render(<TextWithHighlight text="Price: $100 (tax)" highLightText="$100" />);

    const highlightedText = screen.getByText('$100');
    expect(highlightedText).toHaveAttribute('data-sign', 'highlight');
  });

  test('should handle empty text', () => {
    render(<TextWithHighlight text="" highLightText="test" />);

    const container = screen.getByTitle('');
    expect(container).toBeInTheDocument();
    expect(container).toBeEmptyDOMElement();
  });

  test('should handle overlapping ranges correctly', () => {
    render(<TextWithHighlight text="abcd" highLightText={['abc', 'bcd']} />);

    // Should merge into one highlight covering the entire text
    const container = screen.getByTitle('abcd');
    const highlights = container.querySelectorAll('[data-sign="highlight"]');

    expect(highlights).toHaveLength(1);
    expect(highlights[0]).toHaveTextContent('abcd');
  });

  test('should maintain proper text structure with non-highlighted text', () => {
    render(
      <TextWithHighlight
        text="Hello beautiful world"
        highLightText="beautiful"
      />,
    );

    const container = screen.getByTitle('Hello beautiful world');
    expect(container).toHaveTextContent('Hello beautiful world');

    const highlightedText = screen.getByText('beautiful');
    expect(highlightedText).toHaveAttribute('data-sign', 'highlight');
  });

  test('should handle adjacent highlights', () => {
    render(<TextWithHighlight text="abc def" highLightText={['abc', 'def']} />);

    const abcHighlight = screen.getByText('abc');
    const defHighlight = screen.getByText('def');

    expect(abcHighlight).toHaveAttribute('data-sign', 'highlight');
    expect(defHighlight).toHaveAttribute('data-sign', 'highlight');
  });

  test('should handle mixed case array highlights', () => {
    render(
      <TextWithHighlight
        text="Hello World Test"
        highLightText={['hello', 'WORLD', 'test']}
      />,
    );

    const highlights = screen.getAllByText(/hello|world|test/i);
    const highlightedElements = highlights.filter((el) =>
      el.hasAttribute('data-sign'),
    );

    expect(highlightedElements).toHaveLength(3);
  });

  test('should handle no matches gracefully', () => {
    render(<TextWithHighlight text="Hello world" highLightText="xyz" />);

    expect(screen.getByText('Hello world')).toBeInTheDocument();
    expect(screen.queryByText('xyz')).not.toBeInTheDocument();
  });

  test('should handle empty array of highlight terms', () => {
    render(<TextWithHighlight text="Hello world" highLightText={[]} />);

    expect(screen.getByText('Hello world')).toBeInTheDocument();
    const highlights = screen.queryAllByText(/./);
    const highlightedElements = highlights.filter((el) =>
      el.hasAttribute('data-sign'),
    );
    expect(highlightedElements).toHaveLength(0);
  });
});

describe('indexesOf', () => {
  test('should find single match', () => {
    const result = indexesOf('hello world', 'world');
    expect(result).toEqual([6]);
  });

  test('should find multiple matches', () => {
    const result = indexesOf('hello hello hello', 'hello');
    expect(result).toEqual([0, 6, 12]);
  });

  test('should find no matches', () => {
    const result = indexesOf('hello world', 'xyz');
    expect(result).toEqual([]);
  });

  test('should be case insensitive', () => {
    const result = indexesOf('Hello HELLO hello', 'hello');
    expect(result).toEqual([0, 6, 12]);
  });

  test('should handle overlapping patterns', () => {
    const result = indexesOf('aaa', 'aa');
    expect(result).toEqual([0]);
  });

  test('should handle single character matches', () => {
    const result = indexesOf('abcabc', 'a');
    expect(result).toEqual([0, 3]);
  });

  test('should handle empty search string', () => {
    const result = indexesOf('hello', '');
    expect(result).toEqual([]);
  });

  test('should handle empty input string', () => {
    const result = indexesOf('', 'hello');
    expect(result).toEqual([]);
  });

  test('should escape special regex characters', () => {
    const result = indexesOf('hello (world)', '(world)');
    expect(result).toEqual([6]);
  });

  test('should handle all special regex characters', () => {
    const text = 'Price: $100 + tax (10%) - discount [5%] = $95';
    const result = indexesOf(text, '$100');
    expect(result).toEqual([7]);
  });

  test('should handle multiple overlapping single character matches', () => {
    const result = indexesOf('banana', 'a');
    expect(result).toEqual([1, 3, 5]);
  });
});

describe('mergeOverlappingRanges', () => {
  test('should return empty array for empty input', () => {
    const result = mergeOverlappingRanges([]);
    expect(result).toEqual([]);
  });

  test('should return single range unchanged', () => {
    const input = [{ index: 5, length: 3 }];
    const result = mergeOverlappingRanges(input);
    expect(result).toEqual([{ index: 5, length: 3 }]);
  });

  test('should not merge non-overlapping ranges', () => {
    const input = [
      { index: 0, length: 2 },
      { index: 5, length: 2 },
      { index: 10, length: 2 },
    ];
    const result = mergeOverlappingRanges(input);
    expect(result).toEqual([
      { index: 0, length: 2 },
      { index: 5, length: 2 },
      { index: 10, length: 2 },
    ]);
  });

  test('should merge overlapping ranges', () => {
    const input = [
      { index: 0, length: 3 },
      { index: 2, length: 3 },
      { index: 4, length: 2 },
    ];
    const result = mergeOverlappingRanges(input);
    expect(result).toEqual([{ index: 0, length: 6 }]);
  });

  test('should merge adjacent ranges', () => {
    const input = [
      { index: 0, length: 2 },
      { index: 2, length: 2 },
      { index: 4, length: 2 },
    ];
    const result = mergeOverlappingRanges(input);
    expect(result).toEqual([{ index: 0, length: 6 }]);
  });

  test('should handle ranges that are completely contained within others', () => {
    const input = [
      { index: 0, length: 10 },
      { index: 2, length: 2 },
      { index: 5, length: 3 },
    ];
    const result = mergeOverlappingRanges(input);
    expect(result).toEqual([{ index: 0, length: 10 }]);
  });

  test('should handle unsorted input', () => {
    const input = [
      { index: 5, length: 2 },
      { index: 0, length: 3 },
      { index: 2, length: 4 },
    ];
    const result = mergeOverlappingRanges(input);
    expect(result).toEqual([{ index: 0, length: 7 }]);
  });

  test('should handle complex overlapping scenario', () => {
    const input = [
      { index: 0, length: 2 },
      { index: 1, length: 1 },
      { index: 2, length: 1 },
      { index: 10, length: 2 },
      { index: 11, length: 3 },
      { index: 20, length: 1 },
    ];
    const result = mergeOverlappingRanges(input);
    expect(result).toEqual([
      { index: 0, length: 3 },
      { index: 10, length: 4 },
      { index: 20, length: 1 },
    ]);
  });

  test('should handle single character ranges', () => {
    const input = [
      { index: 0, length: 1 },
      { index: 1, length: 1 },
      { index: 2, length: 1 },
      { index: 5, length: 1 },
    ];
    const result = mergeOverlappingRanges(input);
    expect(result).toEqual([
      { index: 0, length: 3 },
      { index: 5, length: 1 },
    ]);
  });

  test('should handle ranges with same start index', () => {
    const input = [
      { index: 0, length: 2 },
      { index: 0, length: 5 },
      { index: 0, length: 3 },
    ];
    const result = mergeOverlappingRanges(input);
    expect(result).toEqual([{ index: 0, length: 5 }]);
  });

  test('should handle ranges with length 0', () => {
    const input = [
      { index: 0, length: 0 },
      { index: 0, length: 2 },
      { index: 5, length: 0 },
    ];
    const result = mergeOverlappingRanges(input);
    expect(result).toEqual([
      { index: 0, length: 2 },
      { index: 5, length: 0 },
    ]);
  });
});
