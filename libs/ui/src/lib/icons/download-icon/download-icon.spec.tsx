import { render } from '@testing-library/react';

import DownloadIcon from './download-icon';

describe('DownloadIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DownloadIcon />);
    expect(baseElement).toBeTruthy();
  });
});
