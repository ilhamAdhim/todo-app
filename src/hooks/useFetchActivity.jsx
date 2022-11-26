import { useCallback, useEffect, useState } from "react";
import { getActivity } from "../helpers/activity-fetcher";

function useFetchActivity() {
  const [activity, setActivity] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  const fetchData = useCallback(async () => {
    const response = await getActivity();
    setActivity(response.data);
    setIsLoading(false);
    if (response.data.length === 0) {
      setIsEmpty(true);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { activity, isLoading, isEmpty, setIsLoading, setActivity };
}

export default useFetchActivity;
