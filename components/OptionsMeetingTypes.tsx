"use client";

import CardMeetingOptions from "./CardMeetingOptions";

const OptionsMeetingTypes = () => {
  return (
    <section className="flex justify-center">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        <CardMeetingOptions
          option="add-meeting"
          title="New Meeting"
          description="Start an quick meeting"
        />
        <CardMeetingOptions
          option="schedule"
          title="Join Meeting"
          description="Join a pre-existing meeting"
        />
        <CardMeetingOptions
          option="join-meeting"
          title="Schedule Meeting"
          description="Schedule a meeting"
        />
        <CardMeetingOptions
          option="recordings"
          title="View Recording"
          description="See your recordings"
        />
      </div>
    </section>
  );
};
export default OptionsMeetingTypes;
