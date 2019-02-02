/**
 * Created by 励颖 on 2019/1/26.
 */
import React from "react";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button";
import DatePicker from "components/Pickers/DatePicker";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import { meetingController, idToTime } from "variables/general.jsx";

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

function changeStatusToEnglish(status){
    if(status === "待办")
        return "Pending";
    else if(status === "进行中")
        return "Running";
    else if(status === "已取消")
        return "Cancelled";
    else if(status === "已召开")
        return "Stopped";
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
            needSignIn: false,
            attendantNum:"",
            status: "",
            type:"",
        };
    }

    createData = (heading, description, date, location, startTime, endTime, needSignIn, status, type) =>{
        let time = date + "  " + idToTime(startTime) + "-" + idToTime(endTime);
        let signIn = "否";
        let meetingType = "普通";
        if (needSignIn === true)
            signIn = "是";
        if (type !== "COMMON")
            meetingType = "紧急";
        let statusChinese = changeStatusToChinese(status);
        return {heading, description, date, location, time, signIn, statusChinese, meetingType};
    };

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

    handleSearch=()=>{
        const {date, location, status} = this.state;
        if ((date === "") && (location === "") && (status === "")){
            alert("请选择搜索的条件");
            return;
        }
        let route = meetingController.getMeeting() + "?";
        let statusChinese = changeStatusToEnglish(status);
        if(date !== ""){
            route = route + "date=" + date;
            if(location !== "")
                route = route + "&location=" + location;
            if(status !== "")
                route = route + "&status=" + statusChinese;
        }
        else if (location !== ""){
            route = route + "location=" + location;
            if(status !== "")
                route = route + "&status=" + statusChinese;
        }
        else
            route = route + "status=" + statusChinese;

        //fetch --------------------------------------------------------------------------
        console.log("route:",route);
        fetch(route, {
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
                    })
            })
        /*this.setState({
            date:"",
            location:"",
            status:"",
        })*/
    };

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
                        <MenuItem value={""} disabled>选择房间号</MenuItem>
                        <MenuItem value={"5310"} style={{fontSize:"20px"}}>5310</MenuItem>
                        <MenuItem value={"5312"} style={{fontSize:"20px"}}>5312</MenuItem>
                    </Select>
                    <Select
                        style={style.selector}
                        value={this.state.status}
                        onChange={this.handleStatusChange}
                        displayEmpty
                        >
                        <MenuItem value={""} disabled>选择状态</MenuItem>
                        <MenuItem value={"待办"} style={{fontSize:"20px"}}>待办</MenuItem>
                        <MenuItem value={"进行中"} style={{fontSize:"20px"}}>进行中</MenuItem>
                        <MenuItem value={"已取消"} style={{fontSize:"20px"}}>已取消</MenuItem>
                    </Select>
                    <DatePicker style={style.picker} handleDateChange={this.handleDateChange.bind(this)}/>

                    <Button style={style.button} onClick={this.handleSearch}>搜索</Button>
                </GridContainer>
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
export default ConditionSearch;