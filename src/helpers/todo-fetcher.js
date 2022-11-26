import axios from "axios";

export const getTodoByActivity = async (id) => {
  try {
    const response = await axios.get(
      `https://todo.api.devcode.gethired.id/activity-groups/${id}`
    );

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createTodo = async ({ activity_group_id, priority, title }) => {
  try {
    const response = await axios.post(
      "https://todo.api.devcode.gethired.id/todo-items",
      {
        activity_group_id,
        priority,
        title,
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateTodo = async ({ todoId, is_active, priority, title }) => {
  try {
    const response = await axios.patch(
      `https://todo.api.devcode.gethired.id/todo-items/${todoId}`,
      {
        is_active: +is_active,
        priority,
        title,
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(
      `https://todo.api.devcode.gethired.id/todo-items/${id}`
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
