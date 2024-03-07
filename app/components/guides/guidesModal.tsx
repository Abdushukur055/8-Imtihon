import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import { AddGuides, UpDate } from "@/app/api/api-service/guides.service";
import { IGuides } from "@/app/api/types/guides.types";
import { getGuides } from "@/app/api/api-service/guides.service";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 380,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const GuidesModal = ({ open, setOpen,editGuides,setEditGuides }: any) => {

  const toggle = () => {
    setOpen(false);
    setEditGuides("")
  }

  const handleModal = async (formData:FormData)=>{
    let payload:IGuides = {
       title: formData.get("title"),
       content: formData.get("content")
    }
    if (editGuides !== "") {
      const data = {payload, _id:editGuides?._id}
      const response = await UpDate(data)
    }else {
      const response = await AddGuides(payload)
    }
  }
  


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
            <h1>Add guides</h1>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="flex items-center gap-[50px]">
              <div className="flex flex-col">
                <form
                    action={handleModal}
                  className="flex flex-col w-[300px] gap-[10px]"
                >
                  <TextField
                    id="outlined-basic"
                    name="title"
                    label="Title"
                    variant="outlined"
                    defaultValue={editGuides?.title}
                  />
                  <TextField
                    id="outlined-basic"
                    name="content"
                    label="Content"
                    variant="outlined"
                    defaultValue={editGuides?.content}
                  />
                  <button className="p-[10px] bg-slate-800 text-white">
                    Add
                  </button>
                </form>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default GuidesModal;
