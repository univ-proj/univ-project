import { render } from '@testing-library/react';

import CreateAssignments from './create-assignments';

describe('CreateAssignments', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateAssignments />);
    expect(baseElement).toBeTruthy();
  });
});
