const PageLoadingAdmin = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black-2">
      <div className="animate-pulse">
        <img className="object-cover h-full mx-auto" src="/images/logo/logo-dashboard.png" />
        <p className="py-4 text-4xl font-bold tracking-wider text-center uppercase text-primary">Nanoreal Admin</p>
      </div>
    </div>
  );
};

export default PageLoadingAdmin;
