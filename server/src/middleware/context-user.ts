import { ExpressContext } from 'apollo-server-express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const contextUser = async ({ res }: ExpressContext): Promise<{ user: any }> => {
  return {
    user: res.locals.user,
  };
};
