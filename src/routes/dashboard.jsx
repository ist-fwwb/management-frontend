// @material-ui/icons
import MeetingRoom from "@material-ui/icons/MeetingRoom";
import Person from "@material-ui/icons/Person";
import Today from "@material-ui/icons/Today";
import Mail from "@material-ui/icons/Mail";
import Home from "@material-ui/icons/Home";
// core components/views
import RoomPage from "views/RoomPage/RoomPage.jsx";
import MeetingPage from "views/MeetingPage/MeetingPage.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";
import RoomSchedule from "views/RoomSchedule/RoomSchedule.jsx";
import RoomProfile from "views/RoomProfile/RoomProfile.jsx";
import HomePage from "views/HomePage/HomePage.jsx";


export const dashboardRoutes = [
    {
        path: "/home",
        sidebarName: "首页",
        navbarName: "首页",
        icon: Home,
        component: HomePage
    },
  {
    path: "/room",
    sidebarName: "会议室管理",
    navbarName: "会议室管理",
    icon:  MeetingRoom,
    component: RoomPage
  },
  {
    path: "/user",
    sidebarName: "用户管理",
    navbarName: "用户管理",
    icon: Person,
    component: UserProfile
  },
    {
        path: "/meeting",
        sidebarName: "会议管理",
        navbarName: "会议管理",
        icon: Today,
        component: MeetingPage
    },
    {
        path: "/message",
        sidebarName: "通知管理",
        navbarName: "通知管理",
        icon: Mail,
        component: UserProfile //------------------------------------------------------------
    },

  { redirect: true, path: "/", to: "/room", navbarName: "Redirect" }
];

let routesNotInSideBar = [
  {
    path: "/room/:roomid/schedule",
    component: RoomSchedule
  },
  {
    path: "/room/:roomid/profile",
    component: RoomProfile
  }
];

export const deepRoutes = routesNotInSideBar.concat(dashboardRoutes);
