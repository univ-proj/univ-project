import { render } from '@testing-library/react';

import ProfileIcon from './profile-icon';

describe('ProfileIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProfileIcon />);
    expect(baseElement).toBeTruthy();
  });
});
