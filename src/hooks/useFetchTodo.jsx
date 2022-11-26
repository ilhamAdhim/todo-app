import { useCallback, useEffect, useState } from "react";
import { getActivity } from "../helpers/activity-fetcher";

function useFetchTodo() {
  const [todo, setTodo] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  const fetchData = useCallback(async () => {
    const response = await getActivity();
    setTodo(response.data);
    setIsLoading(false);
    if (response.data.length === 0) {
      setIsEmpty(true);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { todo, isLoading, isEmpty, setIsLoading, setTodo };
}

export default useFetchTodo;
