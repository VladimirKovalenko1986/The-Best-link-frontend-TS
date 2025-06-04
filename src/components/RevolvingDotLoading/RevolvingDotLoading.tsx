import { RevolvingDot } from "react-loader-spinner";

export default function RevolvingDotLoading() {
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
}
