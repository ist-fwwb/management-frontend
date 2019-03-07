import React from "react";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import MeetingInfo from "components/Meeting/MeetingInfo.jsx";
import HowToReg from "@material-ui/icons/HowToReg";
import Description from "@material-ui/icons/Description";
import Button from "@material-ui/core/Button";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/core/styles';
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Done from "@material-ui/icons/Done";
import { meetingController, idToTime } from "variables/general.jsx";


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

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

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

function getNowFormatDate() {
    let date = new Date();
    let seperator1 = "-";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    let currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}


class TodayMeeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows:[],
      id:"",
      heading:"",
      description:"",
      date:"",
      location:"",
      hostname:"",
      time:"",
      attendants:[],
      foreignGuestList:[],
      needSignIn: false,
      attendantNum:"",
      status: "",
      type:"",
      add: false,
      newPhone:"",
      newName:"" ,
      notificationType: "",
      notificationMessage: "",
      br: false,
      detail: false,
    };

    console.log(getNowFormatDate());
    fetch(meetingController.getMeetingByDate(getNowFormatDate()), {
      credentials: 'include',
      method:'get',
    })
    .then(response => {
      console.log('Request successful', response);
      return response.json()
        .then(result => {
          console.log("result:", result.length);
          this.setState({
            rows:[],
          });
          for(let i=0; i<result.length; i++)
          {
            let tmp = result[i];
            console.log(tmp.id);
            let host = tmp.host;
            if(host === null)
              this.state.rows.push (this.createData(tmp.id, tmp.heading, tmp.description, tmp.date, tmp.location,
                  tmp.startTime, tmp.endTime, tmp.needSignIn, tmp.status, tmp.type, tmp.attendantNum, tmp.foreignGuestList, ""));
            else
              this.state.rows.push (this.createData(tmp.id, tmp.heading, tmp.description, tmp.date, tmp.location,
                  tmp.startTime, tmp.endTime, tmp.needSignIn, tmp.status, tmp.type, tmp.attendantNum, tmp.foreignGuestList, host.name));
          }
          console.log("length:", this.state.rows.length);
          this.setState({
            id:"",
            heading:"",
            description:"",
            date:"",
            location:"",
            hostname:"",
            time:"",
            attendants:[],
            foreignGuestList:[],
            needSignIn: false,
            attendantNum:"",
            status: "",
            type:"",
          })
        });
    })
  }

  createData = (id, heading, description, date, location, startTime, endTime, needSignIn, status, type, attendantNum, foreignGuestList, hostname) =>{
    let time = idToTime(startTime) + "-" + idToTime(endTime);
    let signIn = "否";
    let meetingType = "普通";
    if (needSignIn === true)
        signIn = "是";
    if (type !== "COMMON")
        meetingType = "紧急";
    let statusChinese = changeStatusToChinese(status);
    return {id, heading, description, date, location, time, signIn, statusChinese, meetingType, attendantNum, foreignGuestList, hostname};
  };

  Transition(props) {
    return <Slide direction="up" {...props} />;
  }

  handleAddGuest = (key)=>{
    if(this.state.rows[key].statusChinese === "已取消")
      this.warning("该会议已结束，无法添加外宾");
    else{
      let row = this.state.rows[key];
      console.log(row);
      this.setState({
        add: true,
        id: row.id,
        heading: row.heading,
        description: row.description,
        date: row.date,
        location: row.location,
        time:row.time,
        needSignIn: row.needSignIn,
        status: row.statusChinese,
        type: row.meetingType,
      });
    }
  };

  handleGuestPhoneChange=(e)=>{
    this.setState({
      newPhone: e.target.value
    })
  };

  handleGuestNameChange=(e)=>{
    this.setState({
      newName: e.target.value
    })
  };

  handleGuestClose=()=>{
    this.setState({
      add: false,
    })
  };

  handleDetail=(key)=>{
    let row = this.state.rows[key];
    console.log(row.hostname);
    this.setState({
      detail: true,
      id: row.id,
      heading: row.heading,
      description: row.description,
      date: row.date,
      location: row.location,
      time: row.time,
      needSignIn: row.signIn,
      attendantNum: row.attendantNum,
      foreignGuestList: row.foreignGuestList,
      hostname: row.hostname,
      status: row.statusChinese,
      type: row.meetingType,
    })
  };

  handleDetailClose=()=>{
    this.setState({
      detail: false
    })
  };

  typeToIcon = (type) => {
    if (type === "success")
      return Done;
    if (type === "danger")
      return ErrorOutline;
    return null;
  };

  success = (msg) => {
    this.setState({
      notificationType: "success",
      notificationMessage: msg
    });
    this.showNotification("br");
  };

  warning = (msg) => {
    this.setState({
      notificationType: "danger",
      notificationMessage: msg
    });
    this.showNotification("br");
  };

  showNotification = (place) => {
    let x = [];
    x[place] = true;
    this.setState({[place]: true});
    this.alertTimeout = setTimeout(
        function() {
          x[place] = false;
          this.setState(x);
        }.bind(this),
        6000
    );
  };

  handleCommit=()=> {
    console.log(this.state.newName);
    console.log(this.state.newPhone);
    console.log(this.state.id);
    let data = [];
    let guest = {
      "name": this.state.newName,
      "phone": this.state.newPhone,
      "signInTime": "string",
      "uuid": "string"
    };
    data.push(guest);
    console.log("data:", data[0]);
    fetch(meetingController.postForeignGuest(this.state.id) + "/", {
      credentials: 'include',
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      console.log('Request successful', response);
      return response.json()
        .then(result => {
          if(response.status === 200)
          {
            this.setState({
              add: false
            },()=>{
              let foreignGuestList = result.foreignGuestList;
              let guest = foreignGuestList[foreignGuestList.length - 1]
              let uuid = guest.uuid;
              console.log("uuid:", uuid);
              this.success("添加成功, 验证码为" + uuid);
            });
          }
          else
            this.warning("添加失败");
        });
    })
  };

  render() {
    const {classes} = this.props;
    const { rows, rowsPerPage, page, id, heading, description, location, time, date, type, status, needSignIn, attendantNum, hostname, foreignGuestList } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    return (
      <div>
        <br/>
        <GridContainer xs={12} sm={12} md={12}>
          <GridItem xs={12} sm={12} md={12}>
            <Table className="room page" >
              <TableHead>
                  <TableRow >
                      <CustomTableCell  style={{width:"15%", fontSize:"140%", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>标题</CustomTableCell>
                      <CustomTableCell  style={{width:"17%", fontSize:"140%", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>描述</CustomTableCell>
                      <CustomTableCell  style={{width:"14%", fontSize:"140%", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>时间</CustomTableCell>
                      <CustomTableCell  style={{width:"9%", fontSize:"140%", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>地点</CustomTableCell>
                      <CustomTableCell  style={{width:"10%", fontSize:"140%", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>类型</CustomTableCell>
                      <CustomTableCell  style={{width:"11%", fontSize:"140%", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>状态</CustomTableCell>
                      <CustomTableCell  style={{width:"24%", fontSize:"140%", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>操作</CustomTableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                {this.state.rows.map((row,key) => (
                  <TableRow key={row.id}>
                    <CustomTableCell style={{width:"15%", fontSize:"18px", textAlign:"center"}}>{row.heading}</CustomTableCell>
                    <CustomTableCell style={{width:"17%", fontSize:"18px", textAlign:"center"}}>{row.description}</CustomTableCell>
                    <CustomTableCell style={{width:"14%", fontSize:"18px", textAlign:"center"}}>{row.time}</CustomTableCell>
                    <CustomTableCell style={{width:"9%", fontSize:"18px", textAlign:"center"}}>{row.location}</CustomTableCell>
                    <CustomTableCell style={{width:"10%", fontSize:"18px", textAlign:"center"}}>{row.meetingType}</CustomTableCell>
                    <CustomTableCell style={{width:"11%", fontSize:"18px", textAlign:"center"}}>{row.statusChinese}</CustomTableCell>
                    <CustomTableCell  style={{width:"24%", fontSize:"140%", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>
                      <Button style={{color:"white", background:"#303f9f", fontSize:"16px"}} onClick={()=>this.handleDetail(key)}>
                        <Description />&nbsp;&nbsp;查看详情
                      </Button>
                      &nbsp;
                      <Button style={{color:"white", background:"#ff7043", fontSize:"16px"}} onClick={()=>this.handleAddGuest(key)}>
                        添加外宾&nbsp;&nbsp;
                        <HowToReg />
                      </Button>
                    </CustomTableCell>
                  </TableRow>
                ))}
                <Dialog
                  open={this.state.add}
                  TransitionComponent={this.Transition}
                  keepMounted
                  onClose={this.handleGuestClose}
                  maxWidth="sm"
                  fullWidth={true}
                >
                  <DialogTitle style={{fontSize:"50px", marginLeft:"35%"}}>
                    {"填写外宾信息"}
                  </DialogTitle>
                  <DialogContent>
                    <GridContainer >
                      <GridItem xs={12} sm={12} md={8}>
                        <br />
                        <TextField
                            label="联系电话"
                            name="newPhone"
                            fullWidth
                            className={classes.textField}
                            value={this.state.newPhone}
                            margin="normal"
                            variant="outlined"
                            style={{width:"80%"}}
                            onChange={this.handleGuestPhoneChange}
                        />
                        <TextField
                            label="姓名"
                            name="newName"
                            fullWidth
                            className={classes.textField}
                            value={this.state.newName}
                            margin="normal"
                            variant="outlined"
                            style={{width:"80%"}}
                            onChange={this.handleGuestNameChange}
                        />
                        <br />
                        <br />
                      </GridItem>
                    </GridContainer>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleCommit} style={{color:"white", width: "15%", fontSize: "16px", background: "#fb8c00"}}>
                      确认
                    </Button>
                    &nbsp;&nbsp;
                    <Button onClick={this.handleGuestClose} style={{color:"white", width: "15%", fontSize: "16px", background: "#9e9e9e"}}>
                      取消
                    </Button>
                  </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.detail}
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
                    <MeetingInfo heading={heading} description={description} location={location} time={date + " " + time}
                                 type={type} status={status} needSignIn={needSignIn} hostname={hostname}
                                 attendantNum={attendantNum} foreignGuestList={foreignGuestList} />
                  </DialogContent>
                  <DialogActions>
                    &nbsp;&nbsp;
                    <Button onClick={this.handleDetailClose} style={{width: "15%", fontSize: "16px", background: "#a1887f", color:"white"}}>
                      取消
                    </Button>
                  </DialogActions>
                </Dialog>
              </TableBody>
            </Table>
          </GridItem>
        </GridContainer>
        <Snackbar
            place="br"
            color={this.state.notificationType}
            icon={this.typeToIcon(this.state.notificationType)}
            message={this.state.notificationMessage}
            open={this.state.br}
            closeNotification={() => this.setState({ br: false })}
            close
        />
      </div>
    )
  }
}
export default withStyles(styles)(TodayMeeting);