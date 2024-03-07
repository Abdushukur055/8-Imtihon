"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import { $api } from "@/app/api/interceptors";
import { AddUser, UpdateUser } from "@/app/api/api-service/user.service";
import { IUser } from "@/app/api/types/user.types";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const ModalApp = ({ toggle, open, modalOpen }: any) => {
  const [file, setFile] = React.useState("");
  const [user, setUser] = React.useState([]);
  const [payload, setPayload] = React.useState({});

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files && e.target.files[0];
    const form = new FormData();
    form.append("file", file as Blob);
    const response = await $api.post("/upload", form);
    setFile(response?.data?.path)
  };

  const handleModal = async (formData: FormData) => {
    let first_name = formData.get("first_name");
    let last_name = formData.get("last_name");
    let avatar = file ? file : "/no-user-image.gif"
    let age = Number(formData.get("age"));
    let role = formData.get("role");
    let username = formData.get("username");
    let password = formData.get("password");
    let description = formData.get("description");
    let payload: IUser = {
      first_name,
      last_name,
      avatar,
      age,
      role,
      username,
      password,
      description,
    };
    if (modalOpen !== "") {
      const response = await UpdateUser({...payload, _id: modalOpen._id})
    } else {
      const response = await AddUser({...payload});
      console.log(response);
      
      if (response?.status === 201) {
        window.location.reload()
      }
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={toggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <h1>Add user</h1>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="flex items-center gap-[50px]">
              <div className="flex flex-col items-center relative">
                <Image
                  src="/images (1).png"
                  width={270}
                  height={270}
                  alt="image"
                />
                <input
                  type="file"
                  onChange={handleImage}
                  className="w-[100%] h-[100%] absolute opacity-0 top-0"
                />
              </div>
              <div className="flex flex-col">
                <form
                  action={handleModal}
                  className="flex flex-col w-[300px] gap-[10px]"
                >
                  <TextField
                    id="outlined-basic"
                    name="first_name"
                    label="Firstname"
                    variant="outlined"
                    defaultValue={modalOpen?.first_name}
                  />
                  <TextField
                    id="outlined-basic"
                    name="last_name"
                    label="Lastname"
                    variant="outlined"
                    defaultValue={modalOpen?.last_name}
                  />
                  <input
                    type="number"
                    className="border-[#a7a5a5] border-[1px] p-[13px] rounded-sm outline-none"
                    name="age"
                    defaultValue={modalOpen?.age}
                  />

                  <select
                    name="role"
                    className="border-[#a7a5a5] border-[1px] p-[13px] rounded-sm outline-none"
                    defaultValue={modalOpen?.role}
                  >
                    <option hidden>Role</option>
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                  </select>
                  <TextField
                    id="outlined-basic"
                    name="username"
                    label="username"
                    variant="outlined"
                    defaultValue={modalOpen?.username}
                  />
                  <TextField
                    id="outlined-basic"
                    name="password"
                    label="password"
                    variant="outlined"
                    defaultValue={modalOpen?.password}
                  />
                  <TextField
                    id="outlined-basic"
                    name="description"
                    label="Description"
                    variant="outlined"
                    defaultValue={modalOpen?.description}
                  />
                  <button className="p-[10px] bg-slate-800 text-white">Add</button>
                </form>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalApp;