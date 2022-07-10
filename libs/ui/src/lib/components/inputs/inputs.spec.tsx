import { render } from '@testing-library/react';

import Inputs from './inputs';

describe('Inputs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Inputs />);
    expect(baseElement).toBeTruthy();
  });
});
