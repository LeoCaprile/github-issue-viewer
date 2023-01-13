import { render, screen } from '@testing-library/react';
import Search from '../../components/Search';
import { useRouter } from '..';

describe('Search Component', () => {
  it('Renders normaly', () => {
    //Arrange
    useRouter.mockImplementationOnce(() => ({
      query: {},
    }));

    render(<Search placeholder="test" />);

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
    const component = render(<Search placeholder="test" />);

    expect(component).toMatchSnapshot();
  });
});
