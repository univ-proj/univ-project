import { render } from '@testing-library/react';

import { LectureTypeCard } from './lectureType-card';

describe('LectureCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LectureTypeCard />);
    expect(baseElement).toBeTruthy();
  });
});
