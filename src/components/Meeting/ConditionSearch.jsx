/**
 * Created by 励颖 on 2019/1/26.
 */
import React from "react";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button";
import DatePicker from "components/Pickers/DatePicker";
import TimePicker from "components/Pickers/TimePicker";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import { userController, meetingController } from "variables/general.jsx";

const style = {
    selector:{
        width:"15%",
        fontSize:"15px",
        marginLeft:"4%",
        marginTop:"3%"
    },
    picker:{
        marginLeft:"3.5%",
    },
    button:{
        width:"6%",
        background:"#00bcd4",
        marginLeft:"5%",
        height:"2%",
        marginTop:"1.8%"
    }
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




class ConditionSearch extends React.Component {
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

    getRoomMenu(){
        let result="";
        for (let i=1; i<5; i++){
            console.log(i);
            result += <MenuItem value={i} style={{fontSize:"20px"}}>Room{i}</MenuItem>
        }
        return result;
    }

    handleLocationChange =(e) =>{
        console.log(e.target.value);
        this.setState({
            location: e.target.value
        })
    };

    handleStatusChange =(e) =>{
        console.log(e.target.value);
        this.setState({
            status: e.target.value
        })
    };

    handleDateChange=(val)=>{
        console.log("hello");
        console.log(val);
        this.setState({
            date: val
        })
    };

    handleTimeChange=(val)=>{
        console.log("bye");
        console.log(val);
    };

    handleSearch(){

    }

    render() {
        return (
            <div>
                <br/>
                <GridContainer xs={12} sm={12} md={12}>
                    <Select
                        style={style.selector}
                        value={this.state.location}
                        onChange={this.handleLocationChange}
                        displayEmpty
                        >
                        <MenuItem value="" disabled>选择房间号</MenuItem>
                        <MenuItem value={"5310"} style={{fontSize:"20px"}}>5310</MenuItem>
                        <MenuItem value={"5312"} style={{fontSize:"20px"}}>5312</MenuItem>
                    </Select>
                    <Select
                        style={style.selector}
                        value={this.state.status}
                        onChange={this.handleStatusChange}
                        displayEmpty
                        >
                        <MenuItem value="" disabled>选择状态</MenuItem>
                        <MenuItem value={"待办"} style={{fontSize:"20px"}}>待办</MenuItem>
                        <MenuItem value={"进行中"} style={{fontSize:"20px"}}>进行中</MenuItem>
                        <MenuItem value={"已取消"} style={{fontSize:"20px"}}>已取消</MenuItem>
                    </Select>
                    <DatePicker style={style.picker} handleDateChange={this.handleDateChange.bind(this)}/>
                    <TimePicker style={style.picker} handleTimeChange={this.handleTimeChange.bind(this)}/>
                    <Button style={style.button} onClick={this.handleSearch}>搜索</Button>
                </GridContainer>
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
export default ConditionSearch;