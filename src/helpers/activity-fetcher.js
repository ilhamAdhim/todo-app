import axios from "axios";

export const getActivity = async () => {
  try {
    const response = await axios.get(
      `https://todo.api.devcode.gethired.id/activity-groups?email=ilhamm179@gmail.com`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createActivity = async () => {
  try {
    const response = await axios.post(
      "https://todo.api.devcode.gethired.id/activity-groups",
      {
        title: "New Activity",
        email: "ilhamm179@gmail.com",
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateActivity = async (id, payload) => {
  try {
    const response = await axios.patch(
      `https://todo.api.devcode.gethired.id/activity-groups/${id}`,
      {
        title: payload,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteActivity = async (id) => {
  try {
    const response = await axios.delete(
      `https://todo.api.devcode.gethired.id/activity-groups/${id}`
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
