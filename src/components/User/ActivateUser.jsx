/**
 * Created by 励颖 on 2019/1/23.
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
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from '@material-ui/core/styles';
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

function createData(enterpriceId, faceFile, featureFile, id, name, password, phone, type ) {
    return {enterpriceId, faceFile, featureFile, id, name, password, phone, type};
}


class ActivateUser extends React.Component {
    constructor(props){
        super(props);
        this.state={
            enterpriceId:"",
            faceFile:"",
            featureFile:"",
            password:"",
            type:"",
            name:"",
            phone:"",
            face:"",
            id: "",
            toActivate: -1,
            open: false,
            rows: [],
            new_rows:[]
        };
        fetch(userController.getUserByType("UNACTIVATE"), {
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
                            this.state.rows.push (createData(tmp.enterpriceId, tmp.faceFile, tmp.featureFile, tmp.id, tmp.name, tmp.password, tmp.phone, tmp.type));
                            this.setState({
                                enterpriceId: tmp.enterpriceId,
                                faceFile: tmp.faceFile,
                                featureFile: tmp.featureFile,
                                id: tmp.id,
                                name: tmp.name,
                                password: tmp.password,
                                phone: tmp.phone,
                                type: tmp.type
                            });
                        }
                        console.log(this.state.rows.length);

                    });
            })
    }

    handleClickOpen = (key) =>{
        console.log(key);
        this.setState ({
            toActivate: key,
            open: true
        });
    };

    handleClose = () => {
        this.setState ({
            open: false,
            toActivate: -1
        })
    };

    handleActivate =() => {
        let {toActivate, rows, new_rows} = this.state;
        console.log(rows[toActivate].id);
        console.log(rows[toActivate].password);
        this.setState({
            open: false,
        });
        fetch(userController.editUserByUserId(rows[toActivate].id), {
            credentials: 'include',
            method:'put',
            headers: {
                'Accept': "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "enterpriceId":rows[toActivate].enterpriceId,
                "faceFile":rows[toActivate].faceFile,
                "featureFile": rows[toActivate].featureFile,
                "id": rows[toActivate].id,
                "name": rows[toActivate].name,
                "password": rows[toActivate].password,
                "phone": rows[toActivate].phone,
                "type": "ORDINARY"
            })
        })
            .then(response => {
                console.log('Request successful', response);
                return response.json()
                    .then(result => {
                        console.log("result:", result.id);
                        if(response.status === 200)
                        {
                            alert("激活成功");
                            fetch(userController.getUserByType("UNACTIVATE"), {
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
                                                this.state.rows.push (createData(tmp.enterpriceId, tmp.faceFile, tmp.featureFile, tmp.id, tmp.name, tmp.password, tmp.phone, tmp.type));
                                                this.setState({
                                                    enterpriceId: tmp.enterpriceId,
                                                    faceFile: tmp.faceFile,
                                                    featureFile: tmp.featureFile,
                                                    id: tmp.id,
                                                    name: tmp.name,
                                                    password: tmp.password,
                                                    phone: tmp.phone,
                                                    type: tmp.type
                                                });
                                            }
                                            console.log(this.state.rows.length);

                                        });
                                })
                        }

                        else
                            alert("激活失败");
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
                        <span style={{fontSize:"30px", fontWeight:"700", marginLeft:"45%"}}>
                        待激活用户
                        </span>
                    </GridItem>
                </GridContainer>
                <br/>
                <br/>
                <GridContainer xs={12} sm={12} md={10}>
                    <GridItem xs={12} sm={12} md={10}>
                        <Table className="ActivateUser" style={{marginLeft:"23%"}}>
                            <TableHead>
                                <TableRow >
                                    <CustomTableCell style={{width:"25%", fontSize:"18px"}}>公司</CustomTableCell>
                                    <CustomTableCell  align="center" style={{width:"15%", fontSize:"20px"}}>姓名</CustomTableCell>
                                    <CustomTableCell  style={{width:"15%", fontSize:"20px"}}>联系电话</CustomTableCell>
                                    <CustomTableCell  style={{width:"50%", fontSize:"20px"}}>人脸图像</CustomTableCell>
                                    <CustomTableCell  style={{width:"20%", fontSize:"20px"}}>操作</CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.rows.map((row,key) => {
                                    return (
                                        <TableRow  key={row.id}>
                                            <CustomTableCell style={{width:"25%", fontSize:"18px"}}>{row.enterpriceId}</CustomTableCell>
                                            <CustomTableCell style={{width:"15%", fontSize:"18px"}}>{row.name}</CustomTableCell>
                                            <CustomTableCell style={{width:"15%", fontSize:"18px"}}>{row.phone}</CustomTableCell>
                                            <CustomTableCell style={{width:"25%", fontSize:"18px"}}>
                                                <img style={{width:"50%", height:"90px"}}></img>
                                            </CustomTableCell>
                                            <CustomTableCell>
                                                <Button style={{width: "20%", fontSize: "18px", background: "#00bcd4"}}
                                                        onClick={()=>this.handleClickOpen(key)}>激活</Button>
                                            </CustomTableCell>
                                        </TableRow>
                                    )})}
                                <Dialog
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                    maxWidth={"sm"}
                                    fullWidth={true}
                                >
                                    <DialogTitle >{"确认激活" +"?"}</DialogTitle>
                                    <DialogActions>
                                        <Button onClick={this.handleClose} style={{background:"#00bcd4"}}>
                                            取消
                                        </Button>
                                        <Button onClick={this.handleActivate} style={{background:"#00bcd4"}}>
                                            激活
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </TableBody>
                        </Table>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

export default ActivateUser;