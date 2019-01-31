import { cleanup } from '../../test/utils/unit';
import Button from '.';

describe('Button', () => {
  afterEach(() => cleanup());

  it('should have correct displayName', async () => {
    expect(Button.displayName).toEqual('Button');
  });
});
