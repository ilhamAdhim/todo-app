import axios from "axios";

export const getActivity = async () => {
  const response = await axios.get(
    `https://todo.api.devcode.gethired.id/activity-groups?email=ilhamm179@gmail.com`
  );

  return response.data;
};

export const createActivity = async () => {
  const response = await axios.post(
    "https://todo.api.devcode.gethired.id/activity-groups",
    {
      title: "New Activity",
      email: "ilhamm179@gmail.com",
    }
  );
  return response;
};

export const updateActivity = async (id, payload) => {
  const response = await axios.put(
    `https://todo.api.devcode.gethired.id/activity-groups/${id}`,
    {
      title: payload,
    }
  );
  return response.data;
};

export const deleteActivity = async (id) => {
  const response = await axios.delete(
    `https://todo.api.devcode.gethired.id/activity-groups/${id}`
  );
  return response.data;
};
