import { render } from '@testing-library/react';

import VisibilityOnIcon from './visibility-on-icon';

describe('VisibilityOnIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VisibilityOnIcon />);
    expect(baseElement).toBeTruthy();
  });
});
