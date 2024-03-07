"use client";
import React, { useEffect, useState } from "react";
import SideBar from "../sideBarAdmin/sideBarAdmin";
import GuidesModal from "./guidesModal";
import { deleteGuides, getGuides } from "@/app/api/api-service/guides.service";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IGuides } from "@/app/api/types/guides.types";
import { getUser } from "@/app/api/api-service/user.service";
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

const Guides = () => {
  const [open, setOpen] = useState(false);
  const [guides, setGuides] = useState([]);
  const [editGuides, setEditGuides] = useState<IGuides>();

  const GetGuides = async () => {
    const response = await getGuides();
    setGuides(response?.data?.data);
  };

  useEffect(() => {
    GetGuides();
  }, []);

  const deletModal = (id: string) => {
    deleteGuides(id);
  };
  const editModal = (item: IGuides) => {
    setEditGuides(item);
    setOpen(true);
  };

  const [searchInput, setSearchInput] = useState("");
  const filteredGuides = guides?.filter((guides: any) =>
    guides.title.toLowerCase().includes(searchInput.toLowerCase())
  );
  const guidesPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastGuides = currentPage * guidesPerPage;
  const indexOfFirstGuides = indexOfLastGuides - guidesPerPage;
  const Guides = filteredGuides.slice(indexOfFirstGuides, indexOfLastGuides);
  let pathname = usePathname();
  return (
    <div>
      <div className="sticky z-30 top-0">
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
      </div>
      <div className="flex">
        <SideBar />
        <GuidesModal
          open={open}
          setOpen={setOpen}
          editGuides={editGuides}
          setEditGuides={setEditGuides}
        />
        <div className="ml-[350px]">
          <button
            className="p-[10px] bg-white mx-[40px] my-[10px]  h-[45px] rounded-xl text-center"
            onClick={() => setOpen(true)}
          >
            open modal
          </button>
          <div className="flex flex-wrap ml-[25px] justify-center p-[10px] gap-[20px]">
            {Guides?.map((item: any, index) => {
              return (
                <div className="w-[300px] p-[15px] rounded-xl flex flex-col gap-[20px] bg-white">
                  <div className="flex">
                    <button
                      className="text-[25px] text-[red] active:bg-slate-200 p-[7px] rounded-3xl transition-all"
                      onClick={() => deletModal(item._id)}
                    >
                      <MdDelete />
                    </button>
                    <button
                      className="text-[25px] text-[blue] active:bg-slate-200 p-[7px] rounded-3xl transition-all"
                      onClick={() => editModal(item)}
                    >
                      <MdEdit />
                    </button>
                  </div>
                  <h1 className="text-[25px] text-center">Qonun qoidalar</h1>
                  <h1>{item.title}</h1>
                  <h1>{item.content}</h1>
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
            currentPage === Math.ceil(filteredGuides.length / guidesPerPage)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Guides;
