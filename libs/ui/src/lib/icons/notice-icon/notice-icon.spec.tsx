import { render } from '@testing-library/react';

import NoticeIcon from './notice-icon';

describe('NoticeIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NoticeIcon />);
    expect(baseElement).toBeTruthy();
  });
});
