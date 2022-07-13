import { render } from '@testing-library/react';

import { AttendenceCard } from './attendence-card';

describe('AttendenceCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AttendenceCard />);
    expect(baseElement).toBeTruthy();
  });
});
