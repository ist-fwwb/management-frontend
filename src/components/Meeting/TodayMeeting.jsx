import React from "react";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import HowToReg from "@material-ui/icons/HowToReg";
import Button from "@material-ui/core/Button";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
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
            heading:"",
            description:"",
            date:"",
            location:"",
            hostId:"",
            hostName:"",
            startTime:"",
            endTime:"",
            attendants:[],
            needSignIn: false,
            attendantNum:"",
            status: "",
            type:"",
            add: false,
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
                            this.state.rows.push (this.createData(tmp.heading, tmp.description, tmp.date, tmp.location,
                                tmp.startTime, tmp.endTime, tmp.needSignIn, tmp.status, tmp.type));

                        }
                        console.log("length:", this.state.rows.length);
                        this.setState({
                            heading:"",
                            description:"",
                            hostId:"",
                            hostName:"",
                            startTime:"",
                            endTime:"",
                            needSignIn: false,
                            type:"",
                        })
                    });
            })
    }

    createData = (heading, description, date, location, startTime, endTime, needSignIn, status, type) =>{
        let time = idToTime(startTime) + "-" + idToTime(endTime);
        let signIn = "否";
        let meetingType = "普通";
        if (needSignIn === true)
            signIn = "是";
        if (type !== "COMMON")
            meetingType = "紧急";
        let statusChinese = changeStatusToChinese(status);
        return {heading, description, date, location, time, signIn, statusChinese, meetingType};
    };

    handleAddGuest = (key)=>{
      let row = this.state.rows[key];
      console.log(row);
      this.setState({
        add: true,
        heading: row.heading,
        description: row.description,
        date: row.date,
        location: row.location,
        startTime: row.startTime,
        endTime: row.endTime,
        needSignIn: row.needSignIn,
        status: row.status,
        type: row.type,
      })

    };

    render() {
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
                                    <CustomTableCell  style={{width:"10%", fontSize:"140%", fontWeight:"700", color:"#ba68c8", textAlign:"center" }}>签到</CustomTableCell>
                                    <CustomTableCell  style={{width:"10%", fontSize:"140%", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>类型</CustomTableCell>
                                    <CustomTableCell  style={{width:"11%", fontSize:"140%", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>状态</CustomTableCell>
                                    <CustomTableCell  style={{width:"14%", fontSize:"140%", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>操作</CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.rows.map((row,key) => (
                                    <TableRow key={row.id}>
                                        <CustomTableCell style={{width:"15%", fontSize:"18px", textAlign:"center"}}>{row.heading}</CustomTableCell>
                                        <CustomTableCell style={{width:"17%", fontSize:"18px", textAlign:"center"}}>{row.description}</CustomTableCell>
                                        <CustomTableCell style={{width:"14%", fontSize:"18px", textAlign:"center"}}>{row.time}</CustomTableCell>
                                        <CustomTableCell style={{width:"9%", fontSize:"18px", textAlign:"center"}}>{row.location}</CustomTableCell>
                                        <CustomTableCell style={{width:"10%", fontSize:"18px", textAlign:"center"}}>{row.signIn}</CustomTableCell>
                                        <CustomTableCell style={{width:"10%", fontSize:"18px", textAlign:"center"}}>{row.meetingType}</CustomTableCell>
                                        <CustomTableCell style={{width:"11%", fontSize:"18px", textAlign:"center"}}>{row.statusChinese}</CustomTableCell>
                                      <CustomTableCell  style={{width:"14%", fontSize:"140%", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>
                                        <Button style={{color:"white", background:"#ff7043", fontSize:"16px"}} onClick={()=>this.handleAddGuest(key)}>
                                          添加外宾&nbsp;&nbsp;
                                          <HowToReg />
                                        </Button>
                                      </CustomTableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </GridItem>
                </GridContainer>
            </div>
        )
    }
}
export default TodayMeeting;