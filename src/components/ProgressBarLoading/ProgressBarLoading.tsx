import { ProgressBar } from 'react-loader-spinner';

export default function ProgressBarLoading() {
  <ProgressBar
    height="80"
    width="80"
    ariaLabel="progress-bar-loading"
    {...({ color: '#4fa94d' } as Partial<Record<string, unknown>>)}
  />;
}
