import { render, screen } from '@testing-library/react';
import Search from '.';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe('Search Component', () => {
  it('Renders normaly', () => {
    //Arrange
    useRouter.mockImplementationOnce(() => ({
      query: {},
    }));

    render(<Search defaultValue="facebook/react" placeholder="test" />);

    //Assert
    screen.getByDisplayValue('facebook/react');
  });

  it('Changes search value when query values change', async () => {
    useRouter.mockImplementation(() => ({
      route: '/',
      pathname: '/',
      query: { owner: 'coffe', repo: 'uwu' },
      asPath: '',
    }));
    const component = render(<Search defaultValue="facebook/react" placeholder="test" />);

    expect(component).toMatchSnapshot();
  });
});
