import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useAllCalls = () => {
  const [allCalls, setAllCalls] = useState<Call[]>();
  const [isLoading, setIsLoading] = useState(false);
  const client = useStreamVideoClient();
  const { user } = useUser();

  useEffect(() => {
    const fetchCalls = async () => {
      if (!client || !user?.id) return;

      setIsLoading(true);
      try {
        const { calls } = await client.queryCalls({
          sort: [{ field: "starts_at", direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user: user.id },
              { members: { $in: [user.id] } },
            ],
          },
        });

        setAllCalls(calls);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCalls();
  }, [client, user?.id]);

  const now = new Date();

  const previous = allCalls?.filter(
    ({ state: { startsAt, endedAt } }: Call) => {
      return (startsAt && new Date(startsAt) < now) || !!endedAt;
    }
  );

  const upcoming = allCalls?.filter(
    ({ state: { startsAt, endedAt } }: Call) => {
      return startsAt && new Date(startsAt) > now;
    }
  );

  return { previous, upcoming, recordings: allCalls, isLoading };
};
