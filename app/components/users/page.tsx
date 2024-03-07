"use client";
import * as React from "react";
import SideBar from "../sideBarAdmin/sideBarAdmin";
import ModalApp from "../modal/Modal";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import CardItem from "../card/Card";
import { getUser } from "@/app/api/api-service/user.service";
import Navbar from "../navbar/Navbar";
import Pagination from "../pagination/pagination";
import { IUser } from "@/app/api/types/user.types";
import styles from "../navbar/navbar.module.css";
import { usePathname } from "next/navigation";
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";
import Search from "../search/search";

const User = () => {
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [user, setUser] = React.useState<any>([]);
  const [modalOpen, setModalOpen] = React.useState<string | undefined>("");
  const [count, setCount] = React.useState(4);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const toggle = () => {
    setOpen(false);
    setModalOpen("");
  };
  const fn = async () => {
    const response = await getUser();
    setUser(response?.data);
  };
  React.useEffect(() => {
    fn();
  }, []);

  const [searchInput, setSearchInput] = React.useState("");
  const filteredUsers = user?.filter((item: any) =>
    item.first_name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const [currentPage, setCurrentPage] = React.useState(1);
  const usersPerPage = 3;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers?.slice(indexOfFirstUser, indexOfLastUser);
  const pathname = usePathname();
  return (
    <div className="">
      <div className="sticky z-30 top-0">
        <div className={styles.container}>
          <div className={styles.title}>{pathname?.split("/").pop()}</div>
          <div className={styles.menu}>
            <div className={styles.search}>
              <input
                type="text"
                placeholder="Search users..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.icons}>
              <MdOutlineChat size={20} color="white" />
              <MdNotifications size={20} color="white" />
              <MdPublic size={20} color="white" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <CardItem setOpen={setOpen}></CardItem>
        <SideBar />
        <ModalApp toggle={toggle} open={open} modalOpen={modalOpen} />
        <div className="ml-[45px]">
          <button
            className="p-[10px] bg-white my-[10px] h-[40px] rounded-xl text-center"
            onClick={() => setOpen(true)}
          >
            open modal
          </button>
          <div className="flex flex-wrap py-[20px] gap-[20px] ">
            {currentUsers?.map((item: IUser, index: number) => {
              return (
                <div key={index}>
                  <CardItem
                    item={item}
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    setOpen={setOpen}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between p-[20px]">
        <button
          className="ml-[350px] text-[white]"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="text-white"
          disabled={
            currentPage === Math.ceil(filteredUsers?.length / usersPerPage)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default User;
