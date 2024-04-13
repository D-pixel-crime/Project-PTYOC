import CommonCallsLayout from "@/components/CommonCallsLayout";

const Recordings = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl lg:text-4xl font-extrabold text-black">
        Recordings
      </h1>
      <CommonCallsLayout type="recordings" />
    </section>
  );
};
export default Recordings;
