import { render } from '@testing-library/react';

import PdfIcon from './pdf-icon';

describe('PdfIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PdfIcon />);
    expect(baseElement).toBeTruthy();
  });
});
