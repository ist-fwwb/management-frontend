const prefix = "http://";
const domain = "129.211.119.51";
const port = "31000";
const server = prefix + domain + ":" + port;
const today = (new Date().toLocaleDateString()).replace(/\//g,'-');
const roomController = {
  "getRoom": () => (server + "/meetingroom" ),
  "getRoomByRoomId": (roomId) => (server + "/meetingroom/" + roomId),
  "createRoom": () => (server + "/meetingroom"), // json params in req body
  "editRoomByRoomId": (roomId) => (server + "/meetingroom/" + roomId), // json params in req body
  "deleteRoomByRoomId": (roomId) => (server + "/meetingroom/" + roomId),
};
const timeSliceController = {
  "getTimeSilce": (date, roomId) => (server + "/timeSlice?date=" + date + "&roomId=" + roomId),
};

const meetingController = {
  "getMeeting": () => (server + "/meeting"),
  "getMeetingByMeetingId": (meetingId) => (server + "/meeting/" + meetingId),
  "createMeeting": () => (server + "/meeting"), // json params in req body
  "editMeetingByMeetingId": (meetingId) => (server + "/meeting/" + meetingId), //json params in req body
  "deleteMeetingByMeetingId": (meetingId) => (server + "/meeting/" + meetingId),
  //"attendMeetingByMeetingId": (meetingId, userId) => (server + "/meeting/" + meetingId + "/attendants?userId=" + userId),
  "attendMeetingByAttendantNum": (attendantNum, userId) => (server + "/meeting/" + attendantNum + "/attendants?userId=" + userId),
  "exitMeetingByMeetingId": (meetingId , userId) => (server +"/meeting/" + meetingId + "/attendants/" + userId),
  "getMeetingByUserIdAndDate": (userId, date) => (server + "/user/" + userId + "/meeting/" + date),
};

const userController = {
  "getUser": () => (server + "/user"),
  "getUserByType":(type)=>(server + "/user?type=" + type),
  "register": () => (server + "/user"), //json params in req body
  "login": (phone, password) => (server + "/user/login?phone=" + phone + "&password=" + password),
  "getUserByUserId": (userId) => (server + "/user/" + userId),
  "editUserByUserId": (userId) => (server + "/user/" + userId),
};

module.exports = {
  server,
  today,
  roomController,
  timeSliceController,
  meetingController,
  userController,
};
