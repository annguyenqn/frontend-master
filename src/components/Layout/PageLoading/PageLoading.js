import SpinnerLoading from '../../SpinnerLoading';

const PageLoading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black-2">
      <SpinnerLoading className="h-20 text-primary" />
    </div>
  );
};

export default PageLoading;
