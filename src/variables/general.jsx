const prefix = "http://";
const domain = "47.106.8.44";
const port = "31000";
const server = prefix + domain + ":" + port;
const today = (new Date().toLocaleDateString()).replace(/\//g,'-');
const bucket = "face-file";
const endpoint = "oss-cn-shanghai.aliyuncs.com";
const face_path = prefix + bucket + "." + endpoint + "/";

const idToTime = (id) => {
  if (id % 2 === 0)
    return String(id / 2) + ":00";
  else
    return String((id - 1 ) / 2) + ":30";
};

const roomController = {
  "searchRoomByLocationAndSizeAndUtils":(location, size, utils) => {
    let locationStr = location ? "location="+location+"&" : "";
    let sizeStr = size ? "size="+size+"&" : "";
    let utilsStr = "";
    for (let i in utils){
        utilsStr += ("utils=" + utils[i] + "&");
    }
    let api = server+"/meetingroom?"+locationStr+sizeStr+utilsStr;
    api = api.substring(0, api.length-1);
    return api;
  },
  "getRoom": () => (server + "/meetingroom" ),
  "getRoomByRoomId": (roomId) => (server + "/meetingroom/" + roomId),
  "createRoom": () => (server + "/meetingroom"), // json params in req body
  "editRoomByRoomId": (roomId) => (server + "/meetingroom/" + roomId), // json params in req body
  "deleteRoomByRoomId": (roomId) => (server + "/meetingroom/" + roomId),
};

const timeSliceController = {
  "getTimeSilceByDateAndRoomId": (date, roomId) => (server + "/timeSlice?date=" + date + "&roomId=" + roomId),
  "getTimeSilceByRoomId": (roomId) => (server + "/timeSlice?roomId=" + roomId),
};

const meetingController = {
  "getMeeting": () => (server + "/meeting"),
  "getMeetingByMeetingId": (meetingId) => (server + "/meeting/" + meetingId),
  "getMeetingByDate": (date) => (server + "/meeting?date=" + date),
  "getMeetingByLocation": (location) => (server + "/meeting?location=" + location),
  "getMeetingByStatus": (status) => (server + "/meeting?status=" + status),
  "getMeetingByRoomIdAndStatus": (roomId, status) => (server + "/meeting?roomId=" + roomId + "&status=" + status),
  "getMeetingByDateAndRoomId": (date, roomId) => (server + "/meeting?date=" + date + "&roomId=" + roomId),
  "getMeetingByDateAndStatus": (date, status) => (server + "/meeting?date=" + date + "&status=" + status),
  "createMeeting": () => (server + "/meeting"), // json params in req body
  "editMeetingByMeetingId": (meetingId) => (server + "/meeting/" + meetingId), //json params in req body
  "deleteMeetingByMeetingId": (meetingId) => (server + "/meeting/" + meetingId),
  //"attendMeetingByMeetingId": (meetingId, userId) => (server + "/meeting/" + meetingId + "/attendants?userId=" + userId),
  "attendMeetingByAttendantNum": (attendantNum, userId) => (server + "/meeting/" + attendantNum + "/attendants?userId=" + userId),
  "exitMeetingByMeetingId": (meetingId , userId) => (server +"/meeting/" + meetingId + "/attendants/" + userId),
  "getMeetingByUserIdAndDate": (userId, date) => (server + "/user/" + userId + "/meeting/" + date),
  "postForeignGuest":(meetingId) =>(server + "/meeting/" + meetingId + "/foreignGuest"), //json params of guest info in req body
};

const userController = {
  "getUser": () => (server + "/user"),
  "getUserByType":(type)=>(server + "/user?type=" + type),
  "register": () => (server + "/user"), //json params in req body
  "login": (phone, password) => (server + "/user/login?phone=" + phone + "&password=" + password),
  "getUserByUserId": (userId) => (server + "/user/" + userId),
  "editUserByUserId": (userId) => (server + "/user/" + userId),
};

const utils_list = {
  tv: "TV",
  airconditioner: "AIRCONDITIONER",
  blackboard: "BLACKBOARD",
  table: "TABLE",
  wifi: "WIFI",
  network: "NETWORK",
  projector: "PROJECTOR",
  power: "POWERSUPPLY"
};

const user_type= {
  "ORDINARY": "普通职员",
  "SUPERIOR": "高级职员",
  "GUEST": "外来宾客",
};

function ScheduleDataToRows(data){
    let re = [];
    for (let i in data){
        let ele = data[i];
        let nameMap = ele.meetingNames;
        let day = (new Date(ele.date).getDay());
        if (day === 6 || day === 0)
            continue;
        let timeSlice = ele.timeSlice;
        for (let j in timeSlice){
            if (!re[j])
                re[j] = [0,0,0,0,0];
            if (!re[j][day-1])
                re[j][day-1] = {};
            if (timeSlice[j]===null){
                re[j][day-1]["occupied"] = false;
                re[j][day-1]["meetingid"] = null;
            }
            else {
                re[j][day-1]["occupied"] = true;
                re[j][day-1]["meetingid"] = timeSlice[j];
                re[j][day-1]["name"] = nameMap[timeSlice[j]];
            }
            re[j][day-1]["date"] = ele.date;
            re[j][day-1]["click"] = false;
            re[j][day-1]["between"] = false;
            re[j][day-1]["original"] = false;
        }
    }
    return re;
}

module.exports = {
  server,
  face_path,
  today,
  idToTime,
  roomController,
  timeSliceController,
  meetingController,
  userController,
  utils_list,
  user_type,
  ScheduleDataToRows
};
