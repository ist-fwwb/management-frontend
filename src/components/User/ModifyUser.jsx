/**
 * Created by 励颖 on 2019/1/24.
 */
import React from "react";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

import { withStyles } from '@material-ui/core/styles';


import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { userController } from "variables/general.jsx";



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

function createData(enterpriceId, id, name, phone, type ) {
    return {enterpriceId, id, name, phone, type};
}

class ModifyUser extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            type: "",
            toModify: -1,
            rows: [],
            id: "",
            enterpriceId:"",
            phone:"",
            name:"",
        }
    }

    handleTypeChange = (e) => {
        this.setState({
            type: e.target.value
        });
        console.log(e.target.value)
    };

    handleIdChange = (e) => {
        this.setState({
            id: e.target.value,
        })
    };

    handleSearch = () => {
        const{type, id} = this.state;
        if ((type === "") && (id === ""))
            alert("请选择职员类型或输入职员id");

        else if (id !== "")
        {
            console.log("id:", id);
            fetch(userController.getUserByUserId(id), {
                credentials: 'include',
                method:'get',
            })
                .then(response => {
                    console.log('Request successful', response);
                    return response.json()
                        .then(result => {
                            console.log("result:", result.name);
                            this.setState({
                                rows:[],
                            });
                            this.state.rows.push (createData(result.enterpriceId, result.id, result.name, result.phone, result.type));
                            this.setState({
                                enterpriceId: result.enterpriceId,
                                id: result.id,
                                name: result.name,
                                phone: result.phone,
                                type: result.type
                            });
                            console.log(this.state.rows.length);

                        });
                })
        }

    };

    handleClickModify=(key) => {

    };


    handleConfirmModify=(key)=>{

    };

    handleCancelModify=()=>{

    };



    render() {
        return (
            <div>
                <br/>
                <GridContainer xs={12} sm={12} md={12}>
                    <GridItem xs={12} sm={12} md={12}>&nbsp;</GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                        <span style={{ marginLeft: "18%", fontSize: "20px", lineHeight:"70px"}}>职员类型：</span>
                        <Select
                            value={this.state.type}
                            onChange={this.handleTypeChange}
                            style={{fontSize:"20px", width:"12%"}}
                            input={
                                <OutlinedInput  name="capacity" id="outlined-age-simple" />
                            }>
                            <MenuItem value={"ORDINARY"} style={{fontSize:"20px"}}>普通职员</MenuItem>
                            <MenuItem value={"SUPERIORY"} style={{fontSize:"20px"}}>高级职员</MenuItem>
                            <MenuItem value={"GUEST"} style={{fontSize:"20px"}}>外宾</MenuItem>
                            <MenuItem value={"ADMINISTOR"} style={{fontSize:"20px"}}>管理员</MenuItem>
                        </Select>
                        <TextField placeholder="输入用户ID" style={{ width: "20%", lineHeight:"200px", marginLeft:"7%", fontSize:"20px"}}
                                   onChange={this.handleIdChange}/>
                        <Button style={{ marginLeft: "7%", background:"#00bcd4", fontSize:"20px", width:"10%"}}
                                onClick={this.handleSearch}>
                            搜索
                        </Button>
                    </GridItem>
                </GridContainer>
                <br/>
                <br/>
                <GridContainer xs={12} sm={12} md={10}>
                    <GridItem xs={12} sm={12} md={10}>
                        <Table className="room page" style={{marginLeft:"23%"}}>
                            <TableHead>
                                <TableRow >
                                    <CustomTableCell style={{width:"22%", fontSize:"18px"}}>公司</CustomTableCell>
                                    <CustomTableCell style={{width:"17%", fontSize:"20px"}}>姓名</CustomTableCell>
                                    <CustomTableCell style={{width:"22%", fontSize:"20px"}}>联系电话</CustomTableCell>
                                    <CustomTableCell style={{width:"17%", fontSize:"20px"}}>职员类型</CustomTableCell>
                                    <CustomTableCell style={{width:"22%", fontSize:"20px"}}>操作</CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.rows.map((row,key) => {
                                    if(this.state.toModify === -1)
                                        return (
                                            <TableRow  key={row.id}>
                                                <CustomTableCell style={{width:"22%", fontSize:"18px"}}>{row.enterpriceId}</CustomTableCell>
                                                <CustomTableCell style={{width:"17%", fontSize:"18px"}}>{row.name}</CustomTableCell>
                                                <CustomTableCell style={{width:"22%", fontSize:"18px"}}>{row.phone}</CustomTableCell>
                                                <CustomTableCell style={{width:"17%", fontSize:"18px"}}>{row.type}</CustomTableCell>
                                                <CustomTableCell>
                                                    <Button style={{width:"20%", fontSize:"18px", background:"#00bcd4"}} onClick={()=>this.handleClickModify(key)}>修改</Button>
                                                </CustomTableCell>
                                            </TableRow>
                                        );
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
                                                    <CustomTableCell style={{width: "30%", fontSize: "18px"}}>
                                                        <Checkbox  checked={this.state.AirConditioner} onChange={this.handleDeviceChange('AirConditioner')} value="AirConditioner" />
                                                        <span style={{fontSize: "18px" }}>空调</span>
                                                        <Checkbox  style={{ marginLeft: "3%"}} checked={this.state.BlockBoard} onChange={this.handleDeviceChange('BlockBoard')} value="BlockBoard" />
                                                        <span style={{fontSize: "18px" }}>白板</span>
                                                        <Checkbox style={{ marginLeft: "3%"}} checked={this.state.Table} onChange={this.handleDeviceChange('Table')} value="Table"/>
                                                        <span style={{fontSize: "18px" }}>桌子</span>
                                                        <br/>
                                                        <Checkbox checked={this.state.Projector} onChange={this.handleDeviceChange('Projector')} value="Projector"/>
                                                        <span style={{fontSize: "18px" }}>投影</span>
                                                        <Checkbox style={{ marginLeft: "3%"}} checked={this.state.PowerSupply} onChange={this.handleDeviceChange('PowerSupply')} value="PowerSupply"/>
                                                        <span style={{fontSize: "18px" }}>电源</span>
                                                    </CustomTableCell>
                                                    <CustomTableCell>
                                                        <TextField  value={this.state.tmp_comment} onChange={this.handleCommentChange} style={{ fontSize: "18px", lineHeight:"80px"}} />
                                                    </CustomTableCell>
                                                    <CustomTableCell>
                                                        <Button style={{width: "40%", fontSize: "18px", background: "#00bcd4"}} onClick={()=>this.handleConfirmModify(key)}>确认</Button>
                                                        &nbsp;&nbsp;&nbsp;
                                                        <Button style={{width: "40%", fontSize: "18px", background: "#b0bec5"}} onClick={this.handleCancelModify}>取消</Button>
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

export default ModifyUser;