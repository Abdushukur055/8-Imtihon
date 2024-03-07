"use client"
import React from "react";
import styles from "./navbar.module.css"
import { usePathname } from "next/navigation";
import { MdNotifications, MdOutlineChat, MdPublic, MdSearch } from "react-icons/md"
import Search from "../search/search";
const Navbar = () => {
  const pathname = usePathname()
  return (
    <div className={styles.container}>
      <div className={styles.title}>{pathname?.split("/").pop()}</div>
      <div className={styles.menu}>
        <div className={styles.search}>
          {/* <input type="text" placeholder="Search..." className={styles.input}/> */}
          <Search/>
        </div>
        <div className={styles.icons}>
          <MdOutlineChat size={20} color="white"/>
          <MdNotifications size={20} color="white"/>
          <MdPublic size={20} color="white"/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
