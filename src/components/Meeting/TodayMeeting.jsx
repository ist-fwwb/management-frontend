import React from "react";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button";

import Search from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { userController, meetingController } from "variables/general.jsx";

const timetable = [ "00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30",
    "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30",
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
    "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30",]

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
        let time = date + "  " + timetable[startTime] + "-" + timetable[endTime];
        let signIn = "否";
        let meetingType = "普通";
        if (needSignIn === true)
            signIn = "是";
        if (type !== "COMMON")
            meetingType = "紧急";
        let statusChinese = changeStatusToChinese(status);
        return {heading, description, date, location, time, signIn, statusChinese, meetingType};
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
                                    <CustomTableCell  align="center" style={{width:"23%", fontSize:"140%"}}>标题</CustomTableCell>
                                    <CustomTableCell  style={{width:"15%", fontSize:"140%"}}>描述</CustomTableCell>
                                    <CustomTableCell  style={{width:"24%", fontSize:"140%"}}>时间</CustomTableCell>
                                    <CustomTableCell  style={{width:"10%", fontSize:"140%"}}>地点</CustomTableCell>
                                    <CustomTableCell  style={{width:"10%", fontSize:"140%"}}>是否签到</CustomTableCell>
                                    <CustomTableCell  style={{width:"10%", fontSize:"140%"}}>类型</CustomTableCell>
                                    <CustomTableCell  style={{width:"10%", fontSize:"140%"}}>状态</CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.rows.map(row => (
                                    <TableRow >
                                        <CustomTableCell style={{width:"23%", fontSize:"18px"}}>{row.heading}</CustomTableCell>
                                        <CustomTableCell style={{width:"15%", fontSize:"18px"}}>{row.description}</CustomTableCell>
                                        <CustomTableCell style={{width:"24%", fontSize:"18px"}}>{row.time}</CustomTableCell>
                                        <CustomTableCell style={{width:"10%", fontSize:"18px"}}>{row.location}</CustomTableCell>
                                        <CustomTableCell style={{width:"10%", fontSize:"18px"}}>{row.signIn}</CustomTableCell>
                                        <CustomTableCell style={{width:"10%", fontSize:"18px"}}>{row.meetingType}</CustomTableCell>
                                        <CustomTableCell style={{width:"10%", fontSize:"18px"}}>{row.statusChinese}</CustomTableCell>

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