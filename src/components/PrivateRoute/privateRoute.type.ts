import type { ReactElement } from 'react';

export type PrivateRouteProps = {
  component: ReactElement;
  redirectTo?: string;
};
