import { renderHook } from '@testing-library/react-hooks';

import {
  getAvatarColorTokenFromId,
  useAvatarColorToken,
} from '../../src/app/components/ContactAvatar/useAvatarColorToken';

describe('getAvatarColorTokenFromId', () => {
  test('should return consistent color for same id', () => {
    const id = 'test-id';
    const result1 = getAvatarColorTokenFromId(id);
    const result2 = getAvatarColorTokenFromId(id);

    expect(result1).toBe(result2);
  });

  test('should return different colors for different ids', () => {
    const id1 = 'user1';
    const id2 = 'user2';

    const result1 = getAvatarColorTokenFromId(id1);
    const result2 = getAvatarColorTokenFromId(id2);

    expect(result1).not.toBe(result2);
  });

  test('should handle numeric ids', () => {
    const numericId = 12345;
    const result = getAvatarColorTokenFromId(numericId);

    expect(result).toMatch(/^bg-/);
  });

  test('should handle string ids', () => {
    const stringId = 'user-123';
    const result = getAvatarColorTokenFromId(stringId);

    expect(result).toMatch(/^bg-/);
  });

  test('should handle empty string', () => {
    const result = getAvatarColorTokenFromId('');

    expect(result).toMatch(/^bg-/);
  });

  test('should handle null/undefined by converting to empty string', () => {
    const result1 = getAvatarColorTokenFromId(null as any);
    const result2 = getAvatarColorTokenFromId(undefined as any);
    const result3 = getAvatarColorTokenFromId('');

    expect(result1).toBe(result3);
    expect(result2).toBe(result3);
  });

  test('should return valid avatar style from the predefined list', () => {
    const validStyles = [
      'bg-extra-scarlet',
      'bg-extra-amethyst',
      'bg-extra-denim-high-contrast',
      'bg-extra-mango',
      'bg-extra-tiffany',
      'bg-neutral-static-b0/40',
      'bg-extra-tangerine-high-contrast',
      'bg-extra-lime-high-contrast',
      'bg-extra-mango-high-contrast',
      'bg-extra-denim',
    ];

    const result = getAvatarColorTokenFromId('test-id');

    expect(validStyles).toContain(result);
  });

  test('should handle special characters in id', () => {
    const specialId = 'user@example.com';
    const result = getAvatarColorTokenFromId(specialId);

    expect(result).toMatch(/^bg-/);
  });

  test('should handle unicode characters in id', () => {
    const unicodeId = '用户123';
    const result = getAvatarColorTokenFromId(unicodeId);

    expect(result).toMatch(/^bg-/);
  });

  test('should be able to generate each color from the predefined list', () => {
    const validStyles = [
      'bg-extra-scarlet',
      'bg-extra-amethyst',
      'bg-extra-denim-high-contrast',
      'bg-extra-mango',
      'bg-extra-tiffany',
      'bg-neutral-static-b0/40',
      'bg-extra-tangerine-high-contrast',
      'bg-extra-lime-high-contrast',
      'bg-extra-mango-high-contrast',
      'bg-extra-denim',
    ];

    // Test IDs that generate each color
    const testIds = [
      'a', // generates bg-extra-scarlet (hash: 97, index: 7)
      'b', // generates bg-extra-amethyst (hash: 98, index: 8)
      'c', // generates bg-extra-denim-high-contrast (hash: 99, index: 9)
      'd', // generates bg-extra-mango (hash: 100, index: 0)
      'e', // generates bg-extra-tiffany (hash: 101, index: 1)
      'f', // generates bg-neutral-static-b0/40 (hash: 102, index: 2)
      'g', // generates bg-extra-tangerine-high-contrast (hash: 103, index: 3)
      'h', // generates bg-extra-lime-high-contrast (hash: 104, index: 4)
      'i', // generates bg-extra-mango-high-contrast (hash: 105, index: 5)
      'j', // generates bg-extra-denim (hash: 106, index: 6)
    ];

    const generatedColors = testIds.map((id) => getAvatarColorTokenFromId(id));

    // Verify all colors are generated
    validStyles.forEach((style) => {
      expect(generatedColors).toContain(style);
    });

    // Log the mapping for reference
    console.log('Color generation examples:');
    testIds.forEach((id, index) => {
      const color = getAvatarColorTokenFromId(id);
      console.log(`${id} -> ${color}`);
    });
  });
});

describe('useAvatarColorToken', () => {
  test('should return consistent result for same id', () => {
    const id = 'test-user';

    const { result: result1 } = renderHook(() => useAvatarColorToken(id));
    const { result: result2 } = renderHook(() => useAvatarColorToken(id));

    expect(result1.current).toBe(result2.current);
  });

  test('should return different results for different ids', () => {
    const id1 = 'user1';
    const id2 = 'user2';

    const { result: result1 } = renderHook(() => useAvatarColorToken(id1));
    const { result: result2 } = renderHook(() => useAvatarColorToken(id2));

    expect(result1.current).not.toBe(result2.current);
  });

  test('should handle numeric ids', () => {
    const numericId = 98765;

    const { result } = renderHook(() => useAvatarColorToken(numericId));

    expect(result.current).toMatch(/^bg-/);
  });

  test('should handle string ids', () => {
    const stringId = 'user-string';

    const { result } = renderHook(() => useAvatarColorToken(stringId));

    expect(result.current).toMatch(/^bg-/);
  });

  test('should handle empty string', () => {
    const { result } = renderHook(() => useAvatarColorToken(''));

    expect(result.current).toMatch(/^bg-/);
  });

  test('should handle null/undefined', () => {
    const { result: result1 } = renderHook(() =>
      useAvatarColorToken(null as any),
    );
    const { result: result2 } = renderHook(() =>
      useAvatarColorToken(undefined as any),
    );
    const { result: result3 } = renderHook(() => useAvatarColorToken(''));

    expect(result1.current).toBe(result3.current);
    expect(result2.current).toBe(result3.current);
  });

  test('should memoize result for same id', () => {
    const id = 'memo-test';

    const { result, rerender } = renderHook(() => useAvatarColorToken(id));
    const initialResult = result.current;

    rerender();

    expect(result.current).toBe(initialResult);
  });

  test('should update result when id changes', () => {
    const { result, rerender } = renderHook(
      ({ id }) => useAvatarColorToken(id),
      { initialProps: { id: 'user1' } },
    );

    const initialResult = result.current;

    rerender({ id: 'user2' });

    expect(result.current).not.toBe(initialResult);
  });

  test('should return valid avatar style from the predefined list', () => {
    const validStyles = [
      'bg-extra-scarlet',
      'bg-extra-amethyst',
      'bg-extra-denim-high-contrast',
      'bg-extra-mango',
      'bg-extra-tiffany',
      'bg-neutral-static-b0/40',
      'bg-extra-tangerine-high-contrast',
      'bg-extra-lime-high-contrast',
      'bg-extra-mango-high-contrast',
      'bg-extra-denim',
    ];

    const { result } = renderHook(() => useAvatarColorToken('test-id'));

    expect(validStyles).toContain(result.current);
  });

  test('should be able to generate each color using the hook', () => {
    const validStyles = [
      'bg-extra-scarlet',
      'bg-extra-amethyst',
      'bg-extra-denim-high-contrast',
      'bg-extra-mango',
      'bg-extra-tiffany',
      'bg-neutral-static-b0/40',
      'bg-extra-tangerine-high-contrast',
      'bg-extra-lime-high-contrast',
      'bg-extra-mango-high-contrast',
      'bg-extra-denim',
    ];

    // Test IDs that generate each color
    const testIds = [
      'a', // generates bg-extra-scarlet
      'b', // generates bg-extra-amethyst
      'c', // generates bg-extra-denim-high-contrast
      'd', // generates bg-extra-mango
      'e', // generates bg-extra-tiffany
      'f', // generates bg-neutral-static-b0/40
      'g', // generates bg-extra-tangerine-high-contrast
      'h', // generates bg-extra-lime-high-contrast
      'i', // generates bg-extra-mango-high-contrast
      'j', // generates bg-extra-denim
    ];

    const generatedColors = testIds.map((id) => {
      const { result } = renderHook(() => useAvatarColorToken(id));
      return result.current;
    });

    // Verify all colors are generated
    validStyles.forEach((style) => {
      expect(generatedColors).toContain(style);
    });

    // Log the mapping for reference
    console.log('Hook color generation examples:');
    testIds.forEach((id, index) => {
      const { result } = renderHook(() => useAvatarColorToken(id));
      console.log(`${id} -> ${result.current}`);
    });
  });
});
