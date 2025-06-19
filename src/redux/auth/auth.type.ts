export type User = {
  name: string | null;
  email: string | null;
  photo: string | null;
};

export type ResponseUser = {
  data: {
    user: User;
    accessToken: string | null;
  };
};

export type UserDto = {
  name: string;
  email: string;
  password: string;
  photo?: File | string;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type GoogleLoginResponse = {
  user: User;
  accessToken: string;
};

export type AuthState = {
  user: {
    name: string | null;
    email: string | null;
    photo: string | null;
  };
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  loading: {
    registration: boolean;
    login: boolean;
    logout: boolean;
    registrationGoogle: boolean;
    resetPassword: boolean;
  };
  error: string | null;
  message: string;
};
