import { render } from '@testing-library/react';

import GradesIcon from './grades-icon';

describe('GradesIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GradesIcon />);
    expect(baseElement).toBeTruthy();
  });
});
