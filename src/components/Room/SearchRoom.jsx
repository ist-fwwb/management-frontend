/**
 * Created by 励颖 on 2019/1/16.
 */

import React from "react";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button";

import Search from "@material-ui/icons/Search";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
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

class SearchRoom extends React.Component {
    constructor(props){
        super(props);
        this.state={
            content: "",
            location: "",
            capacity:  5,
            using: false,
            devices: [],
            comment: "",
            AirConditioner: false,
            BlockBoard: false,
            Table: false,
            Projector: false,
            PowerSupply: false,

        }
    }


    handleDeviceChange = name => event => {
        this.setState({
            [name]:event.target.checked,
            devices:[]
        },()=>{
            if(this.state.AirConditioner)
                this.state.devices.push("AIRCONDITIONER");
            if(this.state.BlockBoard)
                this.state.devices.push("BLOCKBOARD");
            if(this.state.Table)
                this.state.devices.push("TABLE");
            if(this.state.Projector)
                this.state.devices.push("PROJECTOR");
            if(this.state.PowerSupply)
                this.state.devices.push("POWERSUPPLY");
            for (let i =0; i< this.state.devices.length;i++)
                console.log(this.state.devices[i]);
        })
    };


    render() {
        return (
            <div>
            <GridContainer xs={12} sm={12} md={12}>
                <GridItem xs={12} sm={12} md={12}>&nbsp;</GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <Button color="black" style={{fontSize:"20px", background:"#00bcd4", marginLeft:"8%"}}>显示所有会议室</Button>
                    <span style={{fontSize:"20px", marginLeft:"8%"}}> 设备条件：</span>
                    <Checkbox style={{marginLeft:"1%"}} checked={this.state.AirConditioner} onChange={this.handleDeviceChange('AirConditioner')} value="AirConditioner" />
                    <span style={{fontSize: "20px" }}>空调</span>
                    <Checkbox  style={{ marginLeft: "1%"}} checked={this.state.BlockBoard} onChange={this.handleDeviceChange('BlockBoard')} value="BlockBoard" />
                    <span style={{fontSize: "20px" }}>白板</span>
                    <Checkbox style={{ marginLeft: "1%"}} checked={this.state.Table} onChange={this.handleDeviceChange('Table')} value="Table"/>
                    <span style={{fontSize: "20px" }}>桌子</span>

                    <Checkbox style={{ marginLeft: "1%"}} checked={this.state.Projector} onChange={this.handleDeviceChange('Projector')} value="Projector"/>
                    <span style={{fontSize: "20px" }}>投影</span>
                    <Checkbox style={{ marginLeft: "1%"}} checked={this.state.PowerSupply} onChange={this.handleDeviceChange('PowerSupply')} value="PowerSupply"/>
                    <span style={{fontSize: "20px" }}>电源</span>
                    <Button color="white"   aria-label="edit"  style={{ marginLeft: "1%"}}justIcon round>
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
                                <CustomTableCell  style={{width:"15%", fontSize:"20px"}}>可容纳人数</CustomTableCell>
                                <CustomTableCell  style={{width:"10%", fontSize:"20px"}}>状态</CustomTableCell>
                                <CustomTableCell  style={{width:"30%", fontSize:"20px"}}>设备条件</CustomTableCell>
                                <CustomTableCell  style={{width:"20%", fontSize:"20px"}}>备注</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow  key={row.id}>
                                    <CustomTableCell style={{width:"13%", fontSize:"18px"}}>{row.location}</CustomTableCell>
                                    <CustomTableCell style={{width:"15%", fontSize:"18px"}}>{row.capacity}</CustomTableCell>
                                    <CustomTableCell style={{width:"10%", fontSize:"18px"}}>{row.using}</CustomTableCell>
                                    <CustomTableCell style={{width:"30%", fontSize:"18px"}}>{row.devices}</CustomTableCell>
                                    <CustomTableCell style={{width:"20%", fontSize:"18px"}}>{row.comment}</CustomTableCell>
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


export default SearchRoom;
/**
 * Created by 励颖 on 2019/1/16.
 */
