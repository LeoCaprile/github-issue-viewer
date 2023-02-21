export interface AuthSession {
  data: {
    user: {
      name: string;
      email: string;
      image: string;
      id: number;
    };
    expires: string;
    accessToken: string;
  };
  status: string;
}
