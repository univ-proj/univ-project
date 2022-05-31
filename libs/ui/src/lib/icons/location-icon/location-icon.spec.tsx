import { render } from '@testing-library/react';

import LocationIcon from './location-icon';

describe('LocationIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LocationIcon />);
    expect(baseElement).toBeTruthy();
  });
});
