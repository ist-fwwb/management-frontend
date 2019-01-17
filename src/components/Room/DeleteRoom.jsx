/**
 * Created by 励颖 on 2019/1/17.
 */

import React from "react";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";


import Search from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";

import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';

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

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {

            backgroundColor: theme.palette.background.default,

        },
    },
});

let id = 0;
function createData(location, capacity, using, devices, comment) {
    id += 1;
    return { location, capacity, using, devices, comment };
}

const rows = [
    createData('会议室405', 10, "使用中", "空调，白板，桌子，投影仪，电源", "无"),
    createData('会议室406', 20, "空闲", "空调，白板，投影仪，电源", "投影仪损坏"),
    createData('会议室407', 15, "使用中", "白板，投影仪", "无"),
    createData('会议室408', 10, "空闲", "空调，白板，桌子，投影仪，电源", "无"),
    createData('会议室409', 10, "使用中", "空调，白板，投影仪，电源", "无"),
];
class DeleteRoom extends React.Component {
    constructor(props){
        super(props);
        this.state={
            content: "",
            location: "",
            capacity:  5,
            using: false,
            devices: [],
            comment: "",
        }
    }

    handleContentChange = (e) =>{
        this.setState ({
            capacity: e.target.value
        });
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
                                    <CustomTableCell  style={{width:"16%", fontSize:"20px"}}>备注</CustomTableCell>
                                    <CustomTableCell  style={{width:"18%", fontSize:"20px"}}>操作</CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map(row => (
                                    <TableRow  key={row.id}>
                                        <CustomTableCell style={{width:"13%", fontSize:"18px"}}>{row.location}</CustomTableCell>
                                        <CustomTableCell style={{width:"13%", fontSize:"18px"}}>{row.capacity}</CustomTableCell>
                                        <CustomTableCell style={{width:"10%", fontSize:"18px"}}>{row.using}</CustomTableCell>
                                        <CustomTableCell style={{width:"30%", fontSize:"18px"}}>{row.devices}</CustomTableCell>
                                        <CustomTableCell style={{width:"16%", fontSize:"18px"}}>{row.comment}</CustomTableCell>
                                        <CustomTableCell>
                                            <IconButton  aria-label="Delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </CustomTableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}


export default DeleteRoom;