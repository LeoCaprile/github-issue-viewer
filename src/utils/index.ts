export const adaptNameToQuery = (name: string): string => {
  const [owner, repo] = name.split('/');
  return `?owner=${owner}&repo=${repo}`;
};
