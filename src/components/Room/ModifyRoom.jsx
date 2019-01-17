/**
 * Created by 励颖 on 2019/1/17.
 */
import React from "react";
import Button from "@material-ui/core/Button";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";



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
    constructor(props){
        super(props);
        this.state={
            content: "",
            location: "",
            capacity:  0,
            using: false,
            devices: [],
            comment: "",
            open: false,
            toModify: -1,
            rows: old_rows,
        }
    }


    render() {
        return (
            <div>
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
                                    return (
                                        <TableRow  key={row.id}>
                                            <CustomTableCell style={{width:"13%", fontSize:"18px"}}>{row.location}</CustomTableCell>
                                            <CustomTableCell style={{width:"13%", fontSize:"18px"}}>{row.capacity}</CustomTableCell>
                                            <CustomTableCell style={{width:"10%", fontSize:"18px"}}>{row.using}</CustomTableCell>
                                            <CustomTableCell style={{width:"30%", fontSize:"18px"}}>{row.devices}</CustomTableCell>
                                            <CustomTableCell style={{width:"14%", fontSize:"18px"}}>{row.comment}</CustomTableCell>
                                            <CustomTableCell>
                                                <Button style={{width:"20%", fontSize:"16px", background:"#00bcd4"}}>修改</Button>
                                            </CustomTableCell>
                                        </TableRow>
                                    )})}
                            </TableBody>
                        </Table>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default  ModifyRoom;