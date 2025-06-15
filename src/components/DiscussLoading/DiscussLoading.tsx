import { Discuss } from 'react-loader-spinner';

const DiscussLoading = () => {
  return (
    <Discuss
      visible={true}
      height="80"
      width="80"
      ariaLabel="discuss-loading"
      wrapperStyle={{}}
      wrapperClass="discuss-wrapper"
      {...({ color: '#fff', backgroundColor: '#F4442E' } as Partial<
        Record<string, unknown>
      >)}
    />
  );
};

export default DiscussLoading;
