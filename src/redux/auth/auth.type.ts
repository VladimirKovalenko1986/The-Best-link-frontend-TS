export type User = {
  name: string | null;
  email: string | null;
  photo: string | null;
};

export type RegistrationResponse = {
  data: {
    user: User;
    accessToken: string | null;
  };
};

export type RegisterDto = {
  name: string;
  email: string;
  password: string;
  photo?: File;
};
