import { FidgetSpinner } from 'react-loader-spinner';

export default function FidgetSpinnerLoading() {
  return (
    <FidgetSpinner
      visible={true}
      height="80"
      width="80"
      ariaLabel="fidget-spinner-loading"
      wrapperStyle={{}}
      wrapperClass="fidget-spinner-wrapper"
    />
  );
}
