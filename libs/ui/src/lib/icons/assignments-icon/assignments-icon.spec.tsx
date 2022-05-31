import { render } from '@testing-library/react';

import AssignmentsIcon from './assignments-icon';

describe('AssignmentsIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AssignmentsIcon />);
    expect(baseElement).toBeTruthy();
  });
});
