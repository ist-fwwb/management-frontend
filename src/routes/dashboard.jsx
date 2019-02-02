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
import RoomProfile from "components/Room/RoomProfile.jsx";
import RoomSchedulePage from "views/RoomSchedulePage/RoomSchedulePage.jsx";
import HomePage from "views/HomePage/HomePage.jsx";
import MessagePage from "views/MessagePage/MessagePage.jsx";


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
        component: MessagePage//------------------------------------------------------------
    },

  { redirect: true, path: "/", to: "/home", navbarName: "Redirect" }
];

let routesNotInSideBar = [
      {
        path: "/room/:roomId/:roomLocation/schedule",
        component: RoomSchedulePage
      },
      {
        path: "/room/:roomId/profile",
        component: RoomProfile
      },
];

export const deepRoutes = routesNotInSideBar.concat(dashboardRoutes);
