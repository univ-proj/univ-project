import { render } from '@testing-library/react';

import LectureCard from './lecture-card';

describe('LectureCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LectureCard />);
    expect(baseElement).toBeTruthy();
  });
});
