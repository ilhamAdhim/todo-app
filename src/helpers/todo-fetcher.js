import axios from "axios";

export const getTodoByActivity = async (id) => {
  const response = await axios.get(
    `https://todo.api.devcode.gethired.id/activity-groups/${id}`
  );

  return response.data;
};

export const createTodo = async ({ id, priority, title }) => {
  const response = await axios.post(
    "https://todo.api.devcode.gethired.id/todo-items",
    {
      id,
      priority,
      title,
    }
  );
  return response;
};

// TODO : Pastikan lagi ya
export const updateTodo = async (id, payload) => {
  const response = await axios.put(
    `https://todo.api.devcode.gethired.id/todo-items/${id}`,
    {
      payload,
    }
  );
  return response;
};

export const deleteTodo = async (id) => {
  const response = await axios.delete(
    `https://todo.api.devcode.gethired.id/todo-items/${id}`
  );
  return response;
};
