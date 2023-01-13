import { render } from '@testing-library/react';
import Home from '@pages/index';
import { useRouter } from '..';

describe('Home Page', () => {
  it('Has to render nothing by default without props', () => {
    useRouter.mockImplementation(() => ({
      query: {},
    }));
    render(<Home />);
  });
});
