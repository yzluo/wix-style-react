import { pxDivide } from './index';

describe('themes utils', () => {
  describe('pxDivide', () => {
    it('should divide by 1 by default', () => {
      expect(pxDivide('2px')).toBe('2px');
    });

    it('should divide the number with the px remaining', () => {
      expect(pxDivide('2px', 2)).toBe('1px');
      expect(pxDivide('12px', 2)).toBe('6px');
    });
  });
});
