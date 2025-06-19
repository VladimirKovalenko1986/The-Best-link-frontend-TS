import { RevolvingDot } from 'react-loader-spinner';

const RevolvingDotLoading = () => {
  return (
    <RevolvingDot
      visible={true}
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="revolving-dot-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default RevolvingDotLoading;
