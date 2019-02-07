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

import { withStyles } from '@material-ui/core/styles';


import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { userController } from "variables/general.jsx";



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

function showTypeInChinese(type){
    if(type === "ORDINARY")
        return "普通职员";
    else if (type === "SUPERIORY")
        return "高级职员";
    else if (type === "GUEST")
        return "外宾";
    else if (type === "REGISTOR")
        return "管理员"
}

function showTypeInEnglish(type){
    if(type === "普通职员")
        return "ORDINARY";
    else if (type === "高级职员")
        return "SUPERIORY";
    else if (type === "外宾")
        return "GUEST";
    else if (type === "管理员")
        return "REGISTOR"
}

function createData(enterpriceId, faceFile, featureFile, id, name, password, phone, type ) {
    return {enterpriceId, faceFile, featureFile, id, name, password, phone, type};
}
class ModifyUser extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            searchType: "",
            modifyType: "",
            toModify: -1,
            rows: [],
            id: "",
            searchId:"",
            enterpriceId:"",
            phone:"",
            name:"",
            faceFile:"",
            featureFile:"",
            password:"",

        }
    }

    handleTypeChange = (e) => {
        if(this.state.toModify === -1)
        {
            this.setState({
                searchType: e.target.value
            });
        }
        else
        {
            this.setState({
                modifyType: e.target.value
            });
        }

        console.log(e.target.value)
    };


    handleSearchIdChange = (e) => {
        this.setState({
            searchId: e.target.value,
        })
    };

    handleSearch = () => {
        const{searchType, searchId} = this.state;
        if ((searchType === "") && (searchId === ""))
            alert("请选择职员类型或输入职员id");

        else if (searchId !== "")
        {
            console.log("id:", searchId);
            fetch(userController.getUserByUserId(searchId), {
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
                            },()=>{
                                this.state.rows.push (createData(result.enterpriceId, result.faceFile, result.featureFile,
                                    result.id, result.name, result.password, result.phone, showTypeInChinese(result.type)));
                                this.setState({
                                    enterpriceId: result.enterpriceId,
                                    faceFile: result.faceFile,
                                    featureFile: result.featureFile,
                                    id: result.id,
                                    name: result.name,
                                    password: result.password,
                                    phone: result.phone,
                                    modifyType: result.type
                                });
                            });

                            console.log(this.state.rows.length);

                        });
                })
        }
        else if(searchType !== "")
        {
            console.log(searchType);
            console.log(userController.getUserByType(searchType));
            fetch(userController.getUserByType(searchType), {
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
                            },()=>{
                                for(let i=0; i<result.length; i++)
                                {
                                    let tmp = result[i];
                                    console.log(tmp.id);
                                    this.state.rows.push (createData(tmp.enterpriceId, tmp.faceFile, tmp.featureFile,
                                        tmp.id, tmp.name, tmp.password, tmp.phone, showTypeInChinese(tmp.type)));
                                    this.setState({
                                        enterpriceId: tmp.enterpriceId,
                                        faceFile: tmp.faceFile,
                                        featureFile: tmp.featureFile,
                                        id: tmp.id,
                                        name: tmp.name,
                                        password: tmp.password,
                                        phone: tmp.phone,
                                        modifyType: tmp.type
                                    });
                                }
                            });
                            console.log(this.state.rows.length);
                        });
                })
        }

    };

    handlePhoneChange = (e) => {
        this.setState({
            phone:e.target.value
        });
        console.log(e.target.value)
    };

    handleClickModify=(key) => {
        this.setState({
            toModify: key,
            enterpriceId: this.state.rows[key].enterpriceId,
            id: this.state.rows[key].id,
            name: this.state.rows[key].name,
            phone: this.state.rows[key].phone,
            modifyType: this.state.rows[key].type,
            faceFile: this.state.rows[key].faceFile,
            featureFile: this.state.rows[key].featureFile,
            password: this.state.rows[key].password,
        },()=>{
            console.log(key);
            console.log(this.state.enterpriceId);
            console.log(this.state.id);
            console.log(this.state.name);
            console.log(this.state.phone);
            console.log(this.state.modifyType);
        });

    };


    handleConfirmModify=(key)=>{
        console.log(key);
        fetch(userController.editUserByUserId(this.state.id), {
            credentials: 'include',
            method:'put',
            headers: {
                'Accept': "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "enterpriceId": this.state.enterpriceId,
                "faceFile": this.state.faceFile,
                "featureFile": this.state.featureFile,
                "id": this.state.id,
                "name": this.state.name,
                "password": this.state.password,
                "phone": this.state.phone,
                "type": showTypeInEnglish(this.state.modifyType),
            })
        })
            .then(response => {
                console.log('Request successful', response);
                return response.json()
                    .then(result => {
                        console.log("result:", result.id);
                        if(response.status === 200)
                        {
                            this.state.rows[key].phone = this.state.phone;
                            this.state.rows[key].type = this.state.modifyType;
                            alert("修改成功");
                        }
                        else
                            alert("修改失败");
                    });
            });
        this.setState({
            toModify: -1,
            id: "",
            enterpriceId:"",
            phone:"",
            name:"",
            modifyType:"",
            faceFile: "",
            featureFile: "",
            password: "",
        })
    };

    handleCancelModify=()=>{
        this.setState({
            toModify: -1,
            id: "",
            enterpriceId:"",
            phone:"",
            name:"",
            faceFile: "",
            featureFile: "",
            password: "",
            modifyType:"",
        })
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
                            value={this.state.searchType}
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
                                   onChange={this.handleSearchIdChange}/>
                        <Button style={{ marginLeft: "7%", background:"#29b6f6", fontSize:"20px", width:"10%"}}
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
                                    <CustomTableCell style={{width:"20%", fontSize:"18px", fontWeight:"700", color:"#ba68c8"}}>公司</CustomTableCell>
                                    <CustomTableCell style={{width:"17%", fontSize:"20px", fontWeight:"700", color:"#ba68c8"}}>姓名</CustomTableCell>
                                    <CustomTableCell style={{width:"22%", fontSize:"20px", fontWeight:"700", color:"#ba68c8"}}>联系电话</CustomTableCell>
                                    <CustomTableCell style={{width:"17%", fontSize:"20px", fontWeight:"700", color:"#ba68c8"}}>职员类型</CustomTableCell>
                                    <CustomTableCell style={{width:"22%", fontSize:"20px", fontWeight:"700", color:"#ba68c8"}}>操作</CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.rows.map((row,key) => {
                                    if(this.state.toModify === -1)
                                        return (
                                            <TableRow  key={row.id}>
                                                <CustomTableCell style={{width:"20%", fontSize:"18px"}}>{row.enterpriceId}</CustomTableCell>
                                                <CustomTableCell style={{width:"17%", fontSize:"18px"}}>{row.name}</CustomTableCell>
                                                <CustomTableCell style={{width:"22%", fontSize:"18px"}}>{row.phone}</CustomTableCell>
                                                <CustomTableCell style={{width:"17%", fontSize:"18px"}}>{row.type}</CustomTableCell>
                                                <CustomTableCell>
                                                    <Button style={{width:"20%", fontSize:"18px", background:"#29b6f6"}} onClick={()=>this.handleClickModify(key)}>修改</Button>
                                                </CustomTableCell>
                                            </TableRow>
                                        );
                                    else {
                                        if(key !== this.state.toModify)
                                            return (
                                                <TableRow key={row.id}>
                                                    <CustomTableCell style={{width:"20%", fontSize:"18px"}}>{row.enterpriceId}</CustomTableCell>
                                                    <CustomTableCell style={{width:"17%", fontSize:"18px"}}>{row.name}</CustomTableCell>
                                                    <CustomTableCell style={{width:"22%", fontSize:"18px"}}>{row.phone}</CustomTableCell>
                                                    <CustomTableCell style={{width:"17%", fontSize:"18px"}}>{row.type}</CustomTableCell>
                                                    <CustomTableCell>
                                                        <Button style={{width: "18%", fontSize: "18px", background: "#29b6f6"}}>修改</Button>
                                                    </CustomTableCell>
                                                </TableRow>
                                            )
                                        else
                                            return (
                                                <TableRow key={row.id}>
                                                    <CustomTableCell style={{width:"20%", fontSize:"18px"}}>{row.enterpriceId}</CustomTableCell>
                                                    <CustomTableCell style={{width:"17%", fontSize:"18px"}}>{row.name}</CustomTableCell>
                                                    <CustomTableCell style={{width:"22%", fontSize:"18px"}}>
                                                        <TextField
                                                            value={this.state.phone}
                                                            onChange={this.handlePhoneChange}
                                                            style={{width:"80%", fontSize:"18px"}}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </CustomTableCell>
                                                    <CustomTableCell style={{width:"17%", fontSize:"18px"}}>
                                                        <Select
                                                            value={this.state.modifyType}
                                                            onChange={this.handleTypeChange}
                                                            style={{fontSize:"18px", width:"100%"}}
                                                        >
                                                            <MenuItem value={"普通职员"} style={{fontSize:"20px"}}>普通职员</MenuItem>
                                                            <MenuItem value={"高级职员"} style={{fontSize:"20px"}}>高级职员</MenuItem>
                                                            <MenuItem value={"外宾"} style={{fontSize:"20px"}}>外宾</MenuItem>
                                                            <MenuItem value={"管理员"} style={{fontSize:"20px"}}>管理员</MenuItem>
                                                        </Select>
                                                    </CustomTableCell>
                                                    <CustomTableCell>
                                                        <Button style={{width: "40%", fontSize: "18px", background: "#29b6f6"}} onClick={()=>this.handleConfirmModify(key)}>确认</Button>
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