import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getTodoByActivity } from "../helpers/todo-fetcher";

function useFetchTodo() {
  const { id } = useParams();

  const [todo, setTodo] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  const fetchData = useCallback(async () => {
    const response = await getTodoByActivity(id);
    setTodo(response);
    setIsLoading(false);
    if (response.todo_items.length === 0) {
      setIsEmpty(true);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { todo, isLoading, isEmpty, setIsLoading, setTodo };
}

export default useFetchTodo;
