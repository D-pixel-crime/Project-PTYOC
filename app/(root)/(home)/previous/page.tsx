import CommonCallsLayout from "@/components/CommonCallsLayout";

const Previous = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl lg:text-4xl font-extrabold text-black">
        Previous
      </h1>
      <CommonCallsLayout type="previous" />
    </section>
  );
};
export default Previous;
