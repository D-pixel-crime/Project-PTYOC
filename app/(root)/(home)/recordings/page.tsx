import CommonCallsLayout from "@/components/CommonCallsLayout";

const Recordings = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl lg:text-5xl font-extrabold py-2 bg-clip-text text-transparent w-fit bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        Recordings
      </h1>
      <CommonCallsLayout type="recordings" />
    </section>
  );
};
export default Recordings;
