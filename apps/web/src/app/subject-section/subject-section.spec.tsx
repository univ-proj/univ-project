import { render } from '@testing-library/react';

import SubjectSection from './subject-section';

describe('SubjectSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SubjectSection />);
    expect(baseElement).toBeTruthy();
  });
});
