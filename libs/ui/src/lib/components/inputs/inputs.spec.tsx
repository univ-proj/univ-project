import { render } from '@testing-library/react';

import { Inputs } from './inputs';

describe('Input', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Inputs />);
    expect(baseElement).toBeTruthy();
  });
});
