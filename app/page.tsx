import React from 'react';
import Auth from "./components/auth/Auth"
import SideBar from './components/sideBarAdmin/sideBarAdmin';
import User from './components/user/page';
import UserGuides from './components/userguides/page';
export default function Page() {
  return (
    <div>
      <Auth/>
      {/* <SideBar/> */}
    </div>
  );
}
