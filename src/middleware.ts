export { default } from 'next-auth/middleware';

export const config = { matcher: ['/:owner/:repo/', '/:owner/:repo/issues/:id/'] };
