import { handleException } from '../components/Todo/todoUtils';

describe('throw error', () => {
  it('error', () => {
    expect(handleException).toThrow(Error);
  });
});
