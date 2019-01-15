// @material-ui/icons
import MeetingRoom from "@material-ui/icons/MeetingRoom";
import Person from "@material-ui/icons/Person";
import Today from "@material-ui/icons/Today";
import Mail from "@material-ui/icons/Mail";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
// core components/views
import RoomPage from "views/RoomPage/RoomPage.jsx";
import MeetingPage from "views/MeetingPage/MeetingPage.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";
import RoomSchedule from "views/RoomSchedule/RoomSchedule.jsx";
import RoomProfile from "views/RoomProfile/RoomProfile.jsx";

export const dashboardRoutes = [
  {
    path: "/room",
    sidebarName: "会议室管理",
    navbarName: "会议室管理",
    icon:  MeetingRoom,
    component: RoomPage
  },
  {
    path: "/meeting",
    sidebarName: "会议管理",
    navbarName: "会议管理",
    icon: Today,
    component: MeetingPage
  },
  {
    path: "/user",
    sidebarName: "用户管理",
    navbarName: "用户管理",
    icon: Person,
    component: UserProfile
  },
    {
        path: "/message",
        sidebarName: "通知管理",
        navbarName: "通知管理",
        icon: Mail,
        component: UserProfile //------------------------------------------------------------
    },
  {
    path: "/upgrade-to-pro",
    sidebarName: "Upgrade To PRO",
    navbarName: "Upgrade To PRO",
    icon: Unarchive,
    component: UpgradeToPro
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
