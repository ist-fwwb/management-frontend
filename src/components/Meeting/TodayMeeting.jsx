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


function createData(heading, description, date, location, hostId, startTime, endTime, attendants, needSignIn, attendantNum, status, type) {
        let hostName="";
        let time="";
        fetch(userController.getUserByUserId(hostId), {
            credentials: 'include',
            method:'get',
        })
        .then(response => {
            console.log('Request successful', response);
            return response.json()
                .then(result => {
                    console.log("result:", result.name);
                    hostName = result.name;
                })
        });
    return {heading, description, date, location, hostName, time, attendants, needSignIn, attendantNum, status, type};
};

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
                            this.state.rows.push (createData(tmp.heading, tmp.description, tmp.date, tmp.location, tmp.hostId,
                                tmp.startTime, tmp.endTime, tmp.attendants, tmp.needSignIn, tmp.attendantNum, tmp.status, tmp.type));

                        }


                    });
            })
    }

    render() {
        return (
            <div>
                <br/>
                <GridContainer xs={12} sm={12} md={12}>
                    <GridItem xs={12} sm={12} md={12}>
                        <Table className="room page" >
                            <TableHead>
                                <TableRow >
                                    <CustomTableCell  align="center" style={{width:"10%", fontSize:"140%"}}>标题</CustomTableCell>
                                    <CustomTableCell  style={{width:"13%", fontSize:"140%"}}>描述</CustomTableCell>
                                    <CustomTableCell  style={{width:"10%", fontSize:"140%"}}>时间</CustomTableCell>
                                    <CustomTableCell  style={{width:"8%", fontSize:"140%"}}>地点</CustomTableCell>
                                    <CustomTableCell  style={{width:"10%", fontSize:"140%"}}>发起者</CustomTableCell>
                                    <CustomTableCell  style={{width:"18%", fontSize:"140%"}}>与会人员</CustomTableCell>
                                    <CustomTableCell  style={{width:"8%", fontSize:"140%"}}>是否签到</CustomTableCell>
                                    <CustomTableCell  style={{width:"8%", fontSize:"140%"}}>类型</CustomTableCell>
                                    <CustomTableCell  style={{width:"8%", fontSize:"140%"}}>状态</CustomTableCell>
                                    <CustomTableCell  style={{width:"20%", fontSize:"140%"}}>验证码</CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.rows.map(row => (
                                    <TableRow  key={row.id}>
                                        <CustomTableCell style={{width:"10%", fontSize:"18px"}}>{row.heading}</CustomTableCell>
                                        <CustomTableCell style={{width:"13%", fontSize:"18px"}}>{row.description}</CustomTableCell>
                                        <CustomTableCell style={{width:"10%", fontSize:"18px"}}>{row.date}</CustomTableCell>
                                        <CustomTableCell style={{width:"8%", fontSize:"18px"}}>{row.location}</CustomTableCell>
                                        <CustomTableCell style={{width:"10%", fontSize:"18px"}}>{row.hostName}</CustomTableCell>
                                        <CustomTableCell style={{width:"18%", fontSize:"18px"}}>{row.attendants}</CustomTableCell>
                                        <CustomTableCell style={{width:"8%", fontSize:"18px"}}>{row.needSignIn}</CustomTableCell>
                                        <CustomTableCell style={{width:"8%", fontSize:"18px"}}>{row.type}</CustomTableCell>
                                        <CustomTableCell style={{width:"8%", fontSize:"18px"}}>{row.status}</CustomTableCell>
                                        <CustomTableCell style={{width:"20%", fontSize:"18px"}}>{row.attendantNum}</CustomTableCell>
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