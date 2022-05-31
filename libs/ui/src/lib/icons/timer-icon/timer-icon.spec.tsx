import { render } from '@testing-library/react';

import TimerIcon from './timer-icon';

describe('TimerIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TimerIcon />);
    expect(baseElement).toBeTruthy();
  });
});
