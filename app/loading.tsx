import Spinner from "@/components/Spinner";

export default function Loading() {
  return (
    <div className="max-h-screen w-full flex flex-col justify-center items-center">
      <Spinner />
    </div>
  );
}
