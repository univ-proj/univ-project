import { render } from '@testing-library/react';

import VideoIcon from './video-icon';

describe('VideoIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VideoIcon />);
    expect(baseElement).toBeTruthy();
  });
});
