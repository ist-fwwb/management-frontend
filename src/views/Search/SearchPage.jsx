/**
 * Created by 励颖 on 2019/3/6.
 */
import React from "react";
import { withStyles } from '@material-ui/core/styles';
import {searchController, idToTime, face_path} from "variables/general.jsx";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import IconButton from "@material-ui/core/IconButton";
import Collapse from '@material-ui/core/Collapse';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import Label from '@material-ui/icons/Label';
import meetingRoomImage from "assets/img/meetingroom.jpeg";
import MeetingInfo from "components/Meeting/MeetingInfo.jsx";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from "@material-ui/core/Button";
import Description from "@material-ui/icons/Description";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from "@material-ui/core/Slide";



const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '80%',
    backgroundColor: theme.palette.background.paper,
    marginLeft:"8%"
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  images: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
});

const slidesSettings = {
  dots: true,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1
};

const CustomTableCell = withStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
}))(TableCell);

function changeStatusToChinese(status){
  if(status === "Pending")
    return "待办";
  else if(status === "Running")
    return "进行中";
  else if(status === "Cancelled")
    return "已取消";
  else if(status === "Stopped")
    return "已召开";
}

function changeSizeToChinese(size){
  if(size === "SMALL")
    return "小会议室";
  else if(size === "MIDDLE")
    return "中会议室";
  else if(size === "BIG")
    return "大会议室";
}

function changeUtilToChinese(util){
  if(util === "TABLE")
    return "桌子";
  else if (util === "PROJECTOR")
    return "投影仪";
  else if (util === "AIRCONDITIONER")
    return "空调";
  else if (util === "BLACKBOARD")
    return "黑板";
  else if (util === "NETWORK")
    return "有线网络";
  else if (util === "WIFI")
    return "Wi-Fi";
  else if (util === "POWER")
    return "电源";
  else if (util === "TV")
    return "电视";
}

function changeTypeToChinese(type){
  if(type === "ORDINARY")
    return "普通职员";
  else if (type === "SUPERIORY")
    return "高级职员";
  else if (type === "UNACTIVATE")
    return "未激活";
  else if (type === "ADMINISTOR")
    return "管理员";
}

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      key: -1,
      meetingNotes: [],
      meetingRooms: [],
      meetings: [],
      users: [],
      notesOpen: true,
      roomsOpen: true,
      meetingsOpen: true,
      usersOpen: true,
      meetingDetail: false,
      noteDetail: false,
      roomDetail: false,
      userDetail: false,
      totalCount: 0,

      heading:"",
      description:"",
      location:"",
      time: "",
      type:"",
      status:"",
      needSignIn:false,
      hostname:"",
      attendantNum:"",
      foreignGuestList:[],
    };
  }

  componentDidMount (){
    fetch(searchController.search(this.props.match.params.content), {
      credentials: 'include',
      method: 'get',
    })
        .then(response => {
          console.log('Request successful', response);
          return response.json()
              .then(result => {
                console.log("totalCount:", result.totalCount);
                this.setState({
                  totalCount: result.totalCount,
                  meetingNotes: result.meetingNotes,
                  meetingRooms: result.meetingRooms,
                  meetings: result.meetings,
                  users: result.users,
                });
              });
        })
  }

    Transition(props) {
      return <Slide direction="up" {...props} />;
    }

    handleUtils=(utils)=>{
        let len = utils.length;
        let new_utils = [];
        if(len === 0)
          return new_utils;
        new_utils.push(changeUtilToChinese(utils[0]));
        for (let i=1; i<len; i++)
        {
          new_utils.push("，")
          new_utils.push(changeUtilToChinese(utils[i]));
        }
        return new_utils;
    };

    handleImages=(images)=>{
      if(images === null)
        return <img src={meetingRoomImage} width={"100%"} alt="meetingroom"/>
      let results=[];
      let len = images.length;
      for(let i=0; i<len; i++)
        results.push(
              <img
                width="50%"
                style={{height:"120px"}}
                alt="img"
                src={"http://face-file.oss-cn-shanghai.aliyuncs.com/meetingroom-file/" + images[i]}
              />
        )
      return results;
    };


    handleClickNotes=()=>{
      this.setState({
        notesOpen: !this.state.notesOpen
      })
    };

    handleClickRooms=()=>{
      this.setState({
        roomsOpen: !this.state.roomsOpen
      })
    };

    handleClickMeetings=()=>{
      console.log(this.state.meetingsOpen);
      this.setState({
        meetingsOpen: !this.state.meetingsOpen
      })
    };


    handleClickUsers=()=>{
      this.setState({
        usersOpen: !this.state.usersOpen
      })
    };

    handleMeetingDetail=(key)=>{
      console.log(key);
      console.log(this.state.meetings[key].heading);
      let meeting = this.state.meetings[key];
      let meetingType = "普通";
      if(meeting.type !== "COMMON")
        meetingType = "紧急";
      let signIn = "是";
      if(meeting.needSignIn === false)
        signIn = "否";
      this.setState({
        meetingDetail: true,
        key: key,
        heading: meeting.heading,
        description:meeting.description,
        location:meeting.location,
        time: meeting.date + " " + meeting.time,
        type: meetingType,
        status: changeStatusToChinese(meeting.status),
        needSignIn: signIn,
        hostname: "皮皮潘",
        attendantNum: meeting.attendantNum,
        foreignGuestList: meeting.foreignGuestList,
      })
    };

    handleDetailClose=()=>{
      this.setState({
        meetingDetail:false,
        userDetail: false,
        noteDetail: false,
        roomDetail: false,
      })
    };

    render(){
      const { classes } = this.props;
      const{meetingNotes, meetingRooms, meetings, users, totalCount, key} = this.state;

      return(
          <div>
            <h4 style={{color:"#9e9e9e", marginLeft:"5%"}}>
              搜索结果：共{this.state.totalCount}条 {this.props.match.params.content} 相关记录
            </h4>
            <br/>
            <List  component="nav" className={classes.root}>
              <ListItem  style={{fontSize:"24px", width:"100%"}} >
                <Label style={{color:"#5677fc", fontSize:"40px"}}/>
                &nbsp;&nbsp;&nbsp;会议笔记
                {this.state.notesOpen ?
                  <IconButton  onClick={this.handleClickNotes}><ExpandLess/></IconButton>
                  :
                  <IconButton  onClick={this.handleClickNotes}><ExpandMore/></IconButton>
                }
                </ListItem>
                {meetingNotes.length > 0 ?
                    <div>
                      <Collapse in={this.state.notesOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        </List>
                      </Collapse>
                      <br/>
                    </div>
                :
                    <br/>
                      }
              <Divider />
              <ListItem style={{fontSize:"24px", width:"100%"}} onClick={this.handleClickRooms}>
                <Label style={{color:"#ff7043", fontSize:"40px"}}/>
                &nbsp;&nbsp;&nbsp;会议室
                {this.state.roomsOpen ?
                  <IconButton  onClick={this.handleClickRooms}><ExpandLess/></IconButton>
                  :
                  <IconButton  onClick={this.handleClickRooms}><ExpandMore/></IconButton>
                }
              </ListItem>
              {meetingRooms.length > 0 ?
                  <div>
                    <Collapse in={this.state.roomsOpen} timeout="auto" unmountOnExit>
                      <Table style={{marginLeft:"5%", width:"90%"}}>
                        <TableHead>
                          <TableRow >
                            <CustomTableCell style={{width:"20%", fontSize:"18px",  color:"#9e9e9e", textAlign:"center"}}>会议室</CustomTableCell>
                            <CustomTableCell style={{width:"20%", fontSize:"18px",  color:"#9e9e9e", textAlign:"center"}}>容量</CustomTableCell>
                            <CustomTableCell style={{width:"30%", fontSize:"18px",  color:"#9e9e9e", textAlign:"center"}}>设备</CustomTableCell>
                            <CustomTableCell style={{width:"30%", fontSize:"18px",  color:"#9e9e9e", textAlign:"center"}}>图片</CustomTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {meetingRooms.map((row,key) => {
                            return (
                                <TableRow  key={row.id}>
                                  <CustomTableCell style={{width:"20%", fontSize:"18px", textAlign:"center"}}>{row.location}</CustomTableCell>
                                  <CustomTableCell style={{width:"20%", fontSize:"18px", textAlign:"center"}}>{changeSizeToChinese(row.size)}</CustomTableCell>
                                  <CustomTableCell style={{width:"30%", fontSize:"18px", textAlign:"center"}}>{this.handleUtils(row.utils)}</CustomTableCell>
                                  <CustomTableCell style={{width:"30%", fontSize:"18px", textAlign:"center"}}>
                                    {this.handleImages(row.images)}
                                  </CustomTableCell>
                                </TableRow>
                            )})}
                        </TableBody>
                      </Table>
                    </Collapse>
                    <br/>
                  </div>
                  :
                  <br/>
              }
              <Divider />
              <ListItem  style={{fontSize:"24px", width:"100%"}} >
                <Label style={{color:"#8bc34a", fontSize:"40px"}}/>
                &nbsp;&nbsp;&nbsp;会议
                {this.state.meetingsOpen ?
                    <IconButton  onClick={this.handleClickMeetings}><ExpandLess/></IconButton>
                    :
                    <IconButton  onClick={this.handleClickMeetings}><ExpandMore/></IconButton>
                }
                </ListItem>
                {meetings.length > 0 ?
                  <div>
                    <Collapse in={this.state.meetingsOpen} timeout="auto" unmountOnExit>
                      <Table style={{marginLeft:"5%", width:"90%"}}>
                        <TableHead>
                          <TableRow >
                            <CustomTableCell style={{width:"20%", fontSize:"18px",  color:"#9e9e9e", textAlign:"center"}}>标题</CustomTableCell>
                            <CustomTableCell style={{width:"20%", fontSize:"18px",  color:"#9e9e9e", textAlign:"center"}}>场所</CustomTableCell>
                            <CustomTableCell style={{width:"20%", fontSize:"18px",  color:"#9e9e9e", textAlign:"center"}}>日期</CustomTableCell>
                            <CustomTableCell style={{width:"20%", fontSize:"18px",  color:"#9e9e9e", textAlign:"center"}}>时间</CustomTableCell>
                            <CustomTableCell style={{width:"20%", fontSize:"18px",  color:"#9e9e9e", textAlign:"center"}}>操作</CustomTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {meetings.map((row,key) => {
                            return (
                                <TableRow  key={row.id}>
                                  <CustomTableCell style={{width:"20%", fontSize:"18px", textAlign:"center"}}>{row.heading}</CustomTableCell>
                                  <CustomTableCell style={{width:"20%", fontSize:"18px", textAlign:"center"}}>{row.location}</CustomTableCell>
                                  <CustomTableCell style={{width:"20%", fontSize:"18px", textAlign:"center"}}>{row.date}</CustomTableCell>
                                  <CustomTableCell style={{width:"20%", fontSize:"18px", textAlign:"center"}}>{idToTime(row.startTime) + "-" + idToTime(row.endTime)}</CustomTableCell>
                                  <CustomTableCell style={{width:"20%", fontSize:"18px", textAlign:"center"}}>
                                    <IconButton style={{ color:"#ec407a", fontSize:"16px"}}
                                            onClick={()=>this.handleMeetingDetail(key)}>
                                      <Description />
                                    </IconButton>
                                  </CustomTableCell>

                                </TableRow>
                            )})}
                        </TableBody>
                      </Table>
                    </Collapse>
                    <br/>
                  </div>
                  :
                    <br/>
              }

              <Divider />
              <ListItem button style={{fontSize:"24px", width:"100%"}} onClick={this.handleClickUsers}>
                <Label style={{color:"#ba68c8", fontSize:"40px"}}/>
                &nbsp;&nbsp;&nbsp;用户
                {this.state.usersOpen ?
                  <IconButton  onClick={this.handleClickUsers}><ExpandLess/></IconButton>
                  :
                  <IconButton  onClick={this.handleClickUsers}><ExpandMore/></IconButton>
                }
              </ListItem>
                {users.length > 0 ?
                    <div>
                      <Collapse in={this.state.usersOpen} timeout="auto" unmountOnExit>
                        <Table style={{marginLeft:"5%", width:"90%"}}>
                          <TableHead>
                            <TableRow >
                              <CustomTableCell style={{width:"20%", fontSize:"18px",  color:"#9e9e9e", textAlign:"center"}}>公司编号</CustomTableCell>
                              <CustomTableCell style={{width:"20%", fontSize:"18px",  color:"#9e9e9e", textAlign:"center"}}>姓名</CustomTableCell>
                              <CustomTableCell style={{width:"20%", fontSize:"18px",  color:"#9e9e9e", textAlign:"center"}}>电话</CustomTableCell>
                              <CustomTableCell style={{width:"20%", fontSize:"18px",  color:"#9e9e9e", textAlign:"center"}}>职员类型</CustomTableCell>
                              <CustomTableCell style={{width:"20%", fontSize:"18px",  color:"#9e9e9e", textAlign:"center"}}>人脸图像</CustomTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {users.map((row,key) => {
                              return (
                                  <TableRow  key={row.id}>
                                    <CustomTableCell style={{width:"20%", fontSize:"18px", textAlign:"center"}}>{row.enterpriceId}</CustomTableCell>
                                    <CustomTableCell style={{width:"20%", fontSize:"18px", textAlign:"center"}}>{row.name}</CustomTableCell>
                                    <CustomTableCell style={{width:"20%", fontSize:"18px", textAlign:"center"}}>{row.phone}</CustomTableCell>
                                    <CustomTableCell style={{width:"20%", fontSize:"18px", textAlign:"center"}}>{changeTypeToChinese(row.type)}</CustomTableCell>
                                    <CustomTableCell style={{width:"20%", fontSize:"18px", textAlign:"center"}}>
                                      <img style={{width:"60%", height:"100px"}} src={face_path + row.faceFile}/>
                                    </CustomTableCell>
                                  </TableRow>
                              )})}
                          </TableBody>
                        </Table>
                      </Collapse>
                        <br/>
                    </div>
                    :
                    <br/>
                }
              <Divider />
            </List>
            <Dialog
                open={this.state.meetingDetail}
                TransitionComponent={this.Transition}
                keepMounted
                onClose={this.handleDetailClose}
                maxWidth="md"
                fullWidth={true}
            >
              <DialogTitle style={{fontSize:"40px"}}>
                {"会议详细信息"}
              </DialogTitle>
              <DialogContent>
                <MeetingInfo heading={this.state.heading} description={this.state.description}
                             location={this.state.location} time={this.state.time}
                             type={this.state.type} foreignGuestList={this.state.foreignGuestList}
                             needSignIn={this.state.needSignIn} hostname={this.state.hostname}
                             attendantNum={this.state.attendantNum} status={this.state.status}/>
              </DialogContent>
              <DialogActions>
                &nbsp;&nbsp;
                <Button onClick={this.handleDetailClose} style={{width: "15%", fontSize: "16px", background: "#a1887f", color:"white"}}>
                  取消
                </Button>
              </DialogActions>
            </Dialog>
          </div>
      )
    }
}
export default withStyles(styles)(SearchPage);