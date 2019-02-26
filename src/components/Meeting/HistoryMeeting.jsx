/**
 * Created by 励颖 on 2019/2/24.
 */
import React from "react";
import moment from 'moment';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import Description from "@material-ui/icons/Description";
import Button from "@material-ui/core/Button";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Search from "@material-ui/icons/Search";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from "components/Table/TablePagnition";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import Slide from "@material-ui/core/Slide";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Done from "@material-ui/icons/Done";
import { DatePicker } from 'antd';
import 'antd/lib/date-picker/style/css';
import { meetingController, idToTime } from "variables/general.jsx";
import MeetingInfo from "components/Meeting/MeetingInfo.jsx";

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

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

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
    TablePaginationActions,
);

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

class HistoryMeeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      id: "",
      heading: "",
      description: "",
      date: "",
      location: "",
      startTime: "",
      endTime: "",
      needSignIn: false,
      attendantNum: "",
      foreignGuestList:[],
      hostname:"",
      status: "",
      type: "",
      add: false,
      newPhone: "",
      newName: "",
      notificationType: "",
      notificationMessage: "",
      br: false,
      page: 0,
      rowsPerPage: 8,
      detail: false,
    };
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  handleDateChange =(date, dateString)=>{
    console.log(dateString);
    this.setState({
      date: dateString
    })
  };

  handleSearch=()=>{
    fetch(meetingController.getMeeting() + "?date=" + this.state.date, {
      credentials: 'include',
      method: 'get',
    })
    .then(response => {
      console.log('Request successful', response);
      return response.json()
        .then(result => {
          if(response.status === 200)
            this.success("搜索成功，"+this.state.date+"共有"+result.length+"条会议记录");
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
            location:"",
            startTime:"",
            endTime:"",
            needSignIn: false,
            type:"",
            attendantNum: "",
            foreignGuestList:[],
            hostname:"",
          })
        });
    })
  };

  createData = (id, heading, description, date, location, startTime, endTime, needSignIn, status, type, attendantNum, foreignGuestList, hostname ) =>{
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

  disabledDate=(current)=> {
    // Can not select days before today and today
    return current && current > moment().endOf('day');
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

  Transition(props) {
    return <Slide direction="up" {...props} />;
  }

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

  render(){
    const {classes} = this.props;
    const { rows, rowsPerPage, page, id, heading, description, location, time, date, type, status, needSignIn, attendantNum, hostname, foreignGuestList } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    return(
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={5}>
            <Card style={{marginLeft:"4%"}}>
              <CardBody>
                <CardIcon color="info">
                  {<Search style={{color:"#ffffff"}}/>}
                </CardIcon>
                <DatePicker onChange={this.handleDateChange} disabledDate={this.disabledDate} size="large" style={{marginLeft:"15%", marginTop:"10%"}}/>
                <Button style={{ marginLeft: "3%", background:"#303f9f", fontSize:"16px", color:"white", width:"18%", marginTop:"-1%"}}
                        onClick={this.handleSearch}>
                  搜索
                </Button>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer xs={12} sm={12} md={12}>
          <GridItem xs={12} sm={12} md={12}>
            <Table  >
              <TableHead>
                <TableRow >
                  <CustomTableCell  style={{width:"15%", fontSize:"140%", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>标题</CustomTableCell>
                  <CustomTableCell  style={{width:"17%", fontSize:"140%", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>描述</CustomTableCell>
                  <CustomTableCell  style={{width:"14%", fontSize:"140%", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>时间</CustomTableCell>
                  <CustomTableCell  style={{width:"9%", fontSize:"140%", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>地点</CustomTableCell>
                  <CustomTableCell  style={{width:"10%", fontSize:"140%", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>类型</CustomTableCell>
                  <CustomTableCell  style={{width:"11%", fontSize:"140%", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>状态</CustomTableCell>
                  <CustomTableCell  style={{width:"14%", fontSize:"140%", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>查看详情</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,key) => (
                    <TableRow key={row.id}>
                      <CustomTableCell style={{width:"15%", fontSize:"18px", textAlign:"center"}}>{row.heading}</CustomTableCell>
                      <CustomTableCell style={{width:"17%", fontSize:"18px", textAlign:"center"}}>{row.description}</CustomTableCell>
                      <CustomTableCell style={{width:"14%", fontSize:"18px", textAlign:"center"}}>{row.time}</CustomTableCell>
                      <CustomTableCell style={{width:"9%", fontSize:"18px", textAlign:"center"}}>{row.location}</CustomTableCell>
                      <CustomTableCell style={{width:"10%", fontSize:"18px", textAlign:"center"}}>{row.meetingType}</CustomTableCell>
                      <CustomTableCell style={{width:"11%", fontSize:"18px", textAlign:"center"}}>{row.statusChinese}</CustomTableCell>
                      <CustomTableCell  style={{width:"14%", fontSize:"140%", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>
                        <Button style={{color:"#3f51b5",  fontSize:"16px"}} onClick={()=>this.handleDetail(key)}>
                          <Description />
                        </Button>
                      </CustomTableCell>
                    </TableRow>
                ))}
                {emptyRows > 0 && (
                    <TableRow style={{ height: 48 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                )}
                <TableFooter>
                  <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        colSpan={3}
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          native: true,
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActionsWrapped}
                    />
                  </TableRow>
                </TableFooter>
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
                                 attendantNum={attendantNum} foreignGuestList={foreignGuestList}/>
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

export default withStyles(styles)(HistoryMeeting);