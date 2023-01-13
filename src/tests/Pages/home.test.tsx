import { render, screen } from '@testing-library/react';
import Home, { getServerSideProps } from '@pages/index';
import { useRouter } from '..';
import { githubIssueData, githubIssuesData } from './Mocks/datafromgithub';
import { errorFromApi } from './Mocks/errorFromApi';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext } from 'next';

describe('Home Page', () => {

  global.fetch = jest.fn().mockImplementation(()=>Promise.resolve({
    json: () =>
      Promise.resolve({ issues: githubIssueData } ),
  }));

  it('Has to getServerSideProps correctly', async ()=>{
    const context = {
      query: { owner:'facebook', repo: 'react' } as ParsedUrlQuery,
    };
    const response = await getServerSideProps(context as GetServerSidePropsContext);

    expect(response).toEqual({ props: { issues: githubIssueData } });
  });

  it('Has to render the issues passed by getServerSideProps', () => {
    useRouter.mockImplementation(() => ({
      query: {},
    }));
    render(<Home issues={githubIssuesData}/>);
    screen.getByText(/#25994/i);
    screen.getByText(/Bug: react devtools TypeError: wakeable.then is not a function/i);
  });

  it('Has to render the error when passed by getServerSideProps', () => {
    useRouter.mockImplementation(() => ({
      query: {},
    }));
    render(<Home error={errorFromApi}/>);
    screen.getByText('No repo issues found :(');
    screen.getByText('facebook/RapiD');
  });
});
