import { render } from '@testing-library/react';

import BasicIcon from './basic-icon';

describe('BasicIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BasicIcon name="book" />);
    expect(baseElement).toBeTruthy();
  });
});
