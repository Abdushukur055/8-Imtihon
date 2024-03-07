"use client";
import React, { useEffect, useState } from "react";
import SideBar from "../sideBarAdmin/sideBarAdmin";
import { getUserMe } from "@/app/api/api-service/user_me.service";
import { IUserMe } from "@/app/api/types/user.types";
import Image from "next/image";
import Navbar from "../navbar/Navbar";
import { MdEdit } from "react-icons/md";
import ModalApp from "./ModalUser";

const SingleAdmin = () => {
  const [userMe, setUserMe] = useState<IUserMe>();
  const [open, setOpen] = useState(false);
  const userAdmin = async () => {
    const response = await getUserMe();
    setUserMe(response?.data?.data);
  };
  useEffect(() => {
    userAdmin();
  }, []);
  return (
    <div>
      <Navbar />
      <SideBar />
      <ModalApp setOpen={setOpen} open={open} modalOpen={userMe} />
      <div className="flex w-[100%] mt-[80px] items-center">
        <div className="flex justify-center">
          <div className="flex ml-[550px] w-[100%] p-[15px] h-[450px]  gap-[50px] border-[white] bg-white rounded-xl border-[2px]">
            <div>
              <h1 className="text-[30px] font-[500]">Shaxsiy ma'lumot</h1>
              <Image
                src={
                  `http://localhost:8080/${userMe?.avatar}` ? `http://localhost:8080/${userMe?.avatar}` : "/userImage.jpg"
                }
                width={250}
                height={250}
                alt="image"
                className="rounded-[50%] mt-[50px]"
              />
              <button onClick={() => setOpen(true)}>
                <MdEdit className="text-[25px] mt-[30px] hover:text-[gray]" />
              </button>
            </div>
            <div className="flex justify-center mt-[100px] gap-[170px]">
              <div className="flex flex-col">
                <h1>Ism</h1>
                <h1 className="text-[25px]">{userMe?.first_name}</h1>
                <h1 className="mt-[30px]">Telefon raqam</h1>
                <h1 className="text-[20px]">(+998) 97 782 77 22</h1>
                <h1 className="mt-[30px]">Role</h1>
                <h1>{userMe?.role}</h1>
              </div>
              <div className="flex flex-col">
                <h1>Familiya</h1>
                <h1 className="text-[25px] ">{userMe?.last_name}</h1>
                <h1 className="mt-[30px]">Description</h1>
                {/* <h1 className="text-[20px]">05 Sen,2007</h1> */}
                <h1>{userMe?.description}</h1>
                <h1 className="mt-[30px]">HH ID</h1>
                <h1>{userMe?._id}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleAdmin;
