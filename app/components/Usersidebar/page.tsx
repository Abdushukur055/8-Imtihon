import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import { MdDashboard, MdSupervisedUserCircle } from "react-icons/md";

interface MenuItem {
  title: string;
  path: string;
}

const menuItem: MenuItem[] = [
  { title: "Guides", path: "/components/userguides" },
  { title: "Profile", path: "/components/user/profileUser" },
];

const UserSideBar = () => {
  return (
    <div className="w-[350px] h-[100vh] bg-[#182237] py-[35px] px-[20px] flex flex-col gap-[20px] fixed">
      <div className="flex items-center gap-[15px]">
        <Image
          src="/no-user-image.gif"
          width={50}
          height={50}
          alt="image"
          className="rounded-3xl"
        />
        <div className="flex flex-col">
          <h3 className="text-white text-[18px]">Abdushukur</h3>
          <h3 className="text-[#b7bac1] text-[12px]">Teacher</h3>
        </div>
      </div>
      <h1 className="text-[#b7bac1] font-[700] text-[15px]">Pages</h1>
      {menuItem?.map((item, index) => {
        return (
          <Link
            className="w-[100%] font-[500] rounded-xl text-white text-[17px] transition-all  hover:bg-[#3d4963] p-[20px]"
            href={item.path}
          >
            {item.title}
          </Link>
        );
      })}
    </div>
  );
};

export default UserSideBar;
