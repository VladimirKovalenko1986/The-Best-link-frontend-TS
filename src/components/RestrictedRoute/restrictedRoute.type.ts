import type { ReactElement } from 'react';

export type RestrictedRouteProps = {
  component: ReactElement;
  redirectTo?: string;
};
