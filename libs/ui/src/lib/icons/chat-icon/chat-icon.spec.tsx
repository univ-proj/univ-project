import { render } from '@testing-library/react';

import ChatIcon from './chat-icon';

describe('ChatIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChatIcon />);
    expect(baseElement).toBeTruthy();
  });
});
