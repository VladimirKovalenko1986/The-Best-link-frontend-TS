import { ProgressBar } from 'react-loader-spinner';

const ProgressBarLoading = () => {
  return (
    <ProgressBar
      height="80"
      width="80"
      ariaLabel="progress-bar-loading"
      {...({ color: '#4fa94d' } as Partial<Record<string, unknown>>)}
    />
  );
};

export default ProgressBarLoading;
