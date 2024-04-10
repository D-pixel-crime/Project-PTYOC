import CommonCallsLayout from "@/components/CommonCallsLayout";

const Upcoming = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Upcoming</h1>
      <CommonCallsLayout type="upcoming" />
    </section>
  );
};
export default Upcoming;
