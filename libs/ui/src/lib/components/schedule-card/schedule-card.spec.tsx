import { render } from '@testing-library/react';

import ScheduleCard from './schedule-card';

describe('ScheduleCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ScheduleCard />);
    expect(baseElement).toBeTruthy();
  });
});
