import { render } from '@testing-library/react';

import VisibilityOffIcon from './visibility-off-icon';

describe('VisibilityOffIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VisibilityOffIcon />);
    expect(baseElement).toBeTruthy();
  });
});
