import { render } from '@testing-library/react';

import SubjectsIcon from './subjects-icon';

describe('SubjectsIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SubjectsIcon />);
    expect(baseElement).toBeTruthy();
  });
});
