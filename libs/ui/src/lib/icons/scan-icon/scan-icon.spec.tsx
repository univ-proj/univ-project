import { render } from '@testing-library/react';

import ScanIcon from './scan-icon';

describe('ScanIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ScanIcon />);
    expect(baseElement).toBeTruthy();
  });
});
