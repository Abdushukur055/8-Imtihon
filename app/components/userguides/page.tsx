"use client";
import React, { useEffect, useState } from "react";
import SideBar from "../sideBarAdmin/sideBarAdmin";
import { deleteGuides, getGuides } from "@/app/api/api-service/guides.service";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IGuides, IGuides2 } from "@/app/api/types/guides.types";
import Navbar from "../navbar/Navbar";
import UserSideBar from "../Usersidebar/page";
import GuidesModal from "../guides/guidesModal";
import Checkbox from '@mui/material/Checkbox';

const UserGuides = () => {
  const [open, setOpen] = useState(false);
  const [guides, setGuides] = useState<IGuides2[]>([]);
  const [editGuides,setEditGuides] = useState<IGuides>()

  const GetGuides = async () => {
    const response = await getGuides();
    setGuides(response?.data?.data)
    console.log(response);
        
  };

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  useEffect(() => {
    GetGuides();
  }, []);


  return (
   <div className="">
    <div className="sticky z-30 top-0">
    <Navbar/>
    </div>
     <div className="flex">
      <UserSideBar />
      <GuidesModal open={open} setOpen={setOpen} editGuides={editGuides} setEditGuides={setEditGuides}/>
      <div className="ml-[350px]">
        <div className="w-[100%] flex flex-wrap ml-[25px] justify-center p-[10px] gap-[20px]">
          {guides?.map((item, index) => {
            return <div>
              <div className="w-[300px] p-[15px] rounded-xl flex flex-col gap-[20px] bg-white">
              <h1 className="text-[25px] text-center">Qonun qoidalar</h1>
                <h1>{item?.title}</h1>
                <h1>{item?.content}</h1>
                <div className="flex justify-end">
                 <Checkbox {...label} defaultChecked />
                </div>
              </div>
              </div>
            })} 
            </div>
        </div>
      </div>
    </div>
  );
};

export default UserGuides;
