// this could also be just written in the request file, but learning custom-hooks

import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCallById = (id: string | string[]) => {
  const [currentLiveCall, setCurrentLiveCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);

  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client) return;

    const loadCall = async () => {
      try {
        const { calls } = await client.queryCalls({
          filter_conditions: {
            id,
          },
        });

        if (calls.length > 0) setCurrentLiveCall(calls[0]);
        console.log(calls);

        setIsCallLoading(false);
      } catch (error) {
        throw new Error(`${error}`);
      }
    };

    loadCall();
  }, [client, id]);

  return { currentLiveCall, isCallLoading };
};
