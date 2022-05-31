import { render } from '@testing-library/react';

import BackIcon from './back-icon';

describe('BackIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BackIcon />);
    expect(baseElement).toBeTruthy();
  });
});
