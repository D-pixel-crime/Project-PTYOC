const Home = () => {
  const current = new Date();
  const timeNow = current.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
    current
  );

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full bg-hero bg-cover rounded-xl">
        <div className="flex flex-col h-full justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism py-2 px-4 text-center text-base rounded-md font-normal w-fit">
            Upcoming Meeting at XX:YY PM
          </h2>
          <div className="flex flex-col gap-2 items-start">
            <h1 className="text-4xl font-extrabold lg:text-7xl">
              {/* Present Time */}
              {timeNow}
            </h1>
            <p className="text-lg font-medium text-gray-400 lg:text-2xl">
              {/* Present Date */}
              {date}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Home;
