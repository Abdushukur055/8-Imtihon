"use client";
import React, { useEffect, useState } from "react";
import SideBar from "../../sideBarAdmin/sideBarAdmin";
import { deleteGuides, getGuides } from "@/app/api/api-service/guides.service";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IGuides } from "@/app/api/types/guides.types";
import Navbar from "../../navbar/Navbar";

const UserGuides = () => {
  const [open, setOpen] = useState(false);
  const [guides, setGuides] = useState([]);
  const [editGuides,setEditGuides] = useState<IGuides>()

  const GetGuides = async () => {
    const response = await getGuides();
    setGuides(response?.data?.data);
  };

  useEffect(() => {
    GetGuides();
  }, []);

  const deletModal =(id:string)=>{
    deleteGuides(id)
  }
  const editModal =(item:IGuides)=>{
    setEditGuides(item)
    setOpen(true)
  }

  return (
   <div className="">
    <div className="sticky z-30 top-0">
    <Navbar/>
    </div>
     <div className="flex">
      <SideBar />
      <div className="ml-[350px]">
        <div className="w-[100%] flex flex-wrap ml-[25px] justify-center p-[10px] gap-[20px]">
          {guides?.map((item: any, index) => {
            return <div className="w-[300px] p-[15px] rounded-xl flex flex-col gap-[20px] bg-white">
                <div className="flex">
                  <button className="text-[25px] text-[red] active:bg-slate-200 p-[7px] rounded-3xl transition-all" onClick={()=>deletModal(item._id)}><MdDelete/></button>
                  <button className="text-[25px] text-[blue] active:bg-slate-200 p-[7px] rounded-3xl transition-all" onClick={()=>editModal(item)}><MdEdit/></button>
                </div>
              <h1 className="text-[25px] text-center">Qonun qoidalar</h1>
                <h1>{item.title}</h1>
                <h1>{item.content}</h1>
              </div>
          })}
        </div>
      </div>
    </div>
   </div>
  );
};

export default UserGuides;
