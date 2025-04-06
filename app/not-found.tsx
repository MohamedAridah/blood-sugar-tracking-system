import BackButton from "@/components/BackButton";

const NotFound = () => {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="font-bold text-7xl font-mono mb-2">404</h1>
        <p className="font-semibold">This page could not be found.</p>
        <BackButton link="/" />
      </div>
    </section>
  );
};

export default NotFound;
