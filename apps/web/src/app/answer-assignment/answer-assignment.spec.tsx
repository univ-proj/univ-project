import { render } from '@testing-library/react';

import AnswerAssignment from './answer-assignment';

describe('AnswerAssignment', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AnswerAssignment />);
    expect(baseElement).toBeTruthy();
  });
});
