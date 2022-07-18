import { render } from '@testing-library/react';

import AllSubjects from './all-subjects';

describe('AllSubjects', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AllSubjects />);
    expect(baseElement).toBeTruthy();
  });
});
