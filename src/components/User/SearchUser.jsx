/**
 * Created by 励颖 on 2019/1/24.
 */
import React from "react";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { withStyles } from '@material-ui/core/styles';
import { userController } from "variables/general.jsx";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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

function createData(enterpriceId, faceFile, id, name, phone, type ) {
    return {enterpriceId, faceFile, id, name, phone, type};
}


class SearchUser extends React.Component {
    constructor(props){
        super(props);
        this.state={
            rows:[],
            enterpriceId: "",
            faceFile: "",
            id: "",
            name: "",
            phone: "",
            type: "",
        };
    }

    handleTypeChange = (e) => {
        this.setState({
            type: e.target.value
        });
        console.log(e.target.value)
    };


    handleSearch = () => {
        fetch(userController.getUserByType(this.state.type), {
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
                            this.state.rows.push (createData(tmp.enterpriceId, tmp.faceFile, tmp.id, tmp.name, tmp.phone, tmp.type));
                            this.setState({
                                enterpriceId: tmp.enterpriceId,
                                faceFile: tmp.faceFile,
                                id: tmp.id,
                                name: tmp.name,
                                phone: tmp.phone,
                                type: tmp.type
                            });
                        }
                        console.log(this.state.rows.length);

                    });
            })
    };



    render() {
        return (
            <div>
                <br/>
                <br/>
                <GridContainer xs={12} sm={12} md={12}>
                    <GridItem xs={12} sm={12} md={12}>
                        <span style={{ marginLeft: "33%", fontSize: "20px", lineHeight:"70px"}}>选择职员类型：</span>
                        <Select
                            style={{ marginLeft: "1%", width:"10%", fontSize:"20px", align:"center",}}
                            value={this.state.type}
                            onChange={this.handleTypeChange}
                            input={
                                <OutlinedInput  name="capacity" id="outlined-age-simple" />
                            }>
                            <MenuItem value={"ORDINARY"} style={{fontSize:"20px"}}>普通职员</MenuItem>
                            <MenuItem value={"SUPERIORY"} style={{fontSize:"20px"}}>高级职员</MenuItem>
                            <MenuItem value={"GUEST"} style={{fontSize:"20px"}}>外宾</MenuItem>
                            <MenuItem value={"ADMINISTOR"} style={{fontSize:"20px"}}>管理员</MenuItem>
                        </Select>
                        <Button style={{ marginLeft: "3%", background:"#00bcd4", fontSize:"20px"}}
                                onClick={this.handleSearch}>
                            搜索
                        </Button>
                    </GridItem>
                </GridContainer>
                <br/>
                <br/>
                <GridContainer xs={12} sm={12} md={10}>
                    <GridItem xs={12} sm={12} md={10}>
                        <Table className="ActivateUser" style={{marginLeft:"23%"}}>
                            <TableHead>
                                <TableRow >
                                    <CustomTableCell style={{width:"20%", fontSize:"18px"}}>公司</CustomTableCell>
                                    <CustomTableCell style={{width:"15%", fontSize:"20px"}}>姓名</CustomTableCell>
                                    <CustomTableCell style={{width:"15%", fontSize:"20px"}}>联系电话</CustomTableCell>
                                    <CustomTableCell style={{width:"15%", fontSize:"20px"}}>职员类型</CustomTableCell>
                                    <CustomTableCell style={{width:"35%", fontSize:"20px"}}>人脸图像</CustomTableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.rows.map((row,key) => {
                                    return (
                                        <TableRow  key={row.id}>
                                            <CustomTableCell style={{width:"25%", fontSize:"18px"}}>{row.enterpriceId}</CustomTableCell>
                                            <CustomTableCell style={{width:"15%", fontSize:"18px"}}>{row.name}</CustomTableCell>
                                            <CustomTableCell style={{width:"15%", fontSize:"18px"}}>{row.phone}</CustomTableCell>
                                            <CustomTableCell style={{width:"15%", fontSize:"18px"}}>{row.type}</CustomTableCell>
                                            <CustomTableCell style={{width:"25%", fontSize:"18px"}}>
                                                <img style={{width:"50%", height:"90px"}}></img>
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

export default SearchUser;