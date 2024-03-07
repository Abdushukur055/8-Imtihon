import { $api } from "../interceptors";
import { IUser } from "../types/user.types";

// add-user

export const AddUser = async (data: IUser) => {
  try {
    const response = $api.post("/users", data);
    console.log(response);
    return response
  } catch (error) {
    console.log(error);
  }
};

// get-user

export const getUser = async () => {
  try {
    const response = await $api.get(
      `/users?page%5Boffset%5D=0&page%5Blimit%5D=21&sort%5Bby%5D=id&sort%5Border%5D=desc&filters%5Brole%5D=employee`
    );
    console.log(response)
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

// delete-user

export const DeleteUser = async (id: number) => {
  try {
    const response = await $api.delete(`/users/${id}`);
    console.log(response);
    
    if (response?.status === 200) {
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
};

// update

export const UpdateUser = async (payload: IUser) => {
  try {
    const response = await $api.patch(`/users/${payload._id}`, payload);
    if (response?.status === 200) {
      window.location.reload();
    }

    return response;
  } catch (err) {
    console.log(err);
  }
};
