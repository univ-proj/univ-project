import { render } from '@testing-library/react';

import UserViews from './user-views';

describe('UserViews', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UserViews />);
    expect(baseElement).toBeTruthy();
  });
});
