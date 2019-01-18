/**
 * Created by 励颖 on 2019/1/17.
 */
import React from "react";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';


import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Search from "@material-ui/icons/Search";



const CustomTableCell = withStyles(theme => ({
    head: {
        // backgroundColor: theme.palette.common.black,
        backgroundColor:"#212121",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

function createData(location, capacity, using, devices, comment) {
    return { location, capacity, using, devices, comment };
}

const old_rows = [
    createData( '会议室405', 10, "使用中", "空调，白板，桌子，投影仪，电源", "无"),
    createData( '会议室406', 20, "空闲", "空调，白板，投影仪，电源", "投影仪损坏"),
    createData( '会议室407', 15, "使用中", "白板，投影仪", "无"),
    createData( '会议室408', 10, "空闲", "空调，白板，桌子，投影仪，电源", "无"),
    createData( '会议室409', 10, "使用中", "空调，白板，投影仪，电源", "无"),
];


class ModifyRoom extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            location: "",
            capacity: 0,
            using: false,
            devices: [],
            comment: "",
            open: false,
            toModify: -1,
            rows: old_rows,
            tmp_capacity: -1,
        }
    }

    handleClickModify=(key) => {
        this.setState({
            toModify: key,
            tmp_capacity: this.state.rows[key].capacity,
        });
        console.log(key);
    };

    handleCapacityChange = (e) => {
        this.setState({
            tmp_capacity:e.target.value
        });
        console.log(e.target.value)
    };



    render() {
        return (
            <div>
                <GridContainer xs={12} sm={12} md={12}>
                    <GridItem xs={12} sm={12} md={12}>&nbsp;</GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                        <Button color="black" style={{fontSize:"20px", background:"#00bcd4", marginLeft:"8%"}}>显示所有会议室</Button>
                        <TextField placeholder="输入与会议室相关信息" style={{ width: "40%", lineHeight:"200px", marginLeft:"15%"}} />
                        <Button color="white"   aria-label="edit" justIcon round>
                            <Search />
                        </Button>
                    </GridItem>
                </GridContainer>
                <br/>
                <GridContainer xs={12} sm={12} md={11}>
                    <GridItem xs={12} sm={12} md={11}>
                        <Table className="room page" style={{marginLeft:"10%"}}>
                            <TableHead>
                                <TableRow >
                                    <CustomTableCell  align="center" style={{width:"13%", fontSize:"20px"}}>房间号</CustomTableCell>
                                    <CustomTableCell  style={{width:"13%", fontSize:"20px"}}>可容纳人数</CustomTableCell>
                                    <CustomTableCell  style={{width:"10%", fontSize:"20px"}}>状态</CustomTableCell>
                                    <CustomTableCell  style={{width:"30%", fontSize:"20px"}}>设备条件</CustomTableCell>
                                    <CustomTableCell  style={{width:"14%", fontSize:"20px"}}>备注</CustomTableCell>
                                    <CustomTableCell  style={{width:"20%", fontSize:"20px"}}>操作</CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.rows.map((row,key) => {
                                    if(this.state.toModify === -1)
                                        return (
                                        <TableRow  key={row.id}>
                                            <CustomTableCell style={{width:"13%", fontSize:"18px"}}>{row.location}</CustomTableCell>
                                            <CustomTableCell style={{width:"13%", fontSize:"18px"}}>{row.capacity}</CustomTableCell>
                                            <CustomTableCell style={{width:"10%", fontSize:"18px"}}>{row.using}</CustomTableCell>
                                            <CustomTableCell style={{width:"30%", fontSize:"18px"}}>{row.devices}</CustomTableCell>
                                            <CustomTableCell style={{width:"14%", fontSize:"18px"}}>{row.comment}</CustomTableCell>
                                            <CustomTableCell>
                                                <Button style={{width:"20%", fontSize:"18px", background:"#00bcd4"}} onClick={()=>this.handleClickModify(key)}>修改</Button>
                                            </CustomTableCell>
                                        </TableRow>
                                        )
                                    else {
                                        if(key !== this.state.toModify)
                                            return (
                                                <TableRow key={row.id}>
                                                    <CustomTableCell style={{width: "12%", fontSize: "18px"}}>{row.location}</CustomTableCell>
                                                    <CustomTableCell style={{width: "10%", fontSize: "18px"}}>{row.capacity}</CustomTableCell>
                                                    <CustomTableCell style={{width: "10%", fontSize: "18px"}}>{row.using}</CustomTableCell>
                                                    <CustomTableCell style={{width: "30%", fontSize: "18px"}}>{row.devices}</CustomTableCell>
                                                    <CustomTableCell style={{width: "20%", fontSize: "18px"}}>{row.comment}</CustomTableCell>
                                                    <CustomTableCell>
                                                        <Button style={{width: "18%", fontSize: "18px", background: "#00bcd4"}}>修改</Button>
                                                    </CustomTableCell>
                                                </TableRow>
                                            )
                                        else
                                            return (
                                                <TableRow key={row.id}>
                                                    <CustomTableCell style={{width: "13%", fontSize: "18px"}}>{row.location}</CustomTableCell>
                                                    <CustomTableCell style={{width: "10%", fontSize: "18px"}}>
                                                        <TextField
                                                            placeholder="选择人数" value={this.state.tmp_capacity} type="number"
                                                            onChange={this.handleCapacityChange}
                                                            style={{width:"50%", fontSize:"18px"}}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </CustomTableCell>
                                                    <CustomTableCell style={{width: "10%", fontSize: "18px"}}>{row.using}</CustomTableCell>
                                                    <CustomTableCell style={{width: "30%", fontSize: "18px"}}>{row.devices}</CustomTableCell>
                                                    <CustomTableCell>
                                                        <TextField  placeholder="请输入备注信息" style={{ fontSize: "18px", lineHeight:"80px"}} />
                                                    </CustomTableCell>
                                                    <CustomTableCell>
                                                        <Button style={{width: "40%", fontSize: "18px", background: "#00bcd4"}}>确认</Button>
                                                        <Button style={{width: "40%", fontSize: "18px", background: "#b0bec5"}}>取消</Button>
                                                    </CustomTableCell>
                                                </TableRow>
                                            )
                                    }
                                    })}
                            </TableBody>
                        </Table>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default  ModifyRoom;