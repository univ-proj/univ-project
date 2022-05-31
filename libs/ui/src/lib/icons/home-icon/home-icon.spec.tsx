import { render } from '@testing-library/react';

import HomeIcon from './home-icon';

describe('HomeIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HomeIcon />);
    expect(baseElement).toBeTruthy();
  });
});
