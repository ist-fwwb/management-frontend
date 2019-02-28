/**
 * Created by 励颖 on 2019/1/23.
 */
import React from "react";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Done from "@material-ui/icons/Done";
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import { userController, face_path } from "variables/general.jsx";
import DetailInfo from "./DetailInfo";


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

function createData(enterpriceId, faceFile, featureFile, id, name, password, phone, type, deviceId ) {
    return {enterpriceId, faceFile, featureFile, id, name, password, phone, type, deviceId};
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
          detail: false,
          rows: [],
          new_rows:[],
          notificationType: "",
          notificationMessage: "",
          br: false,
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
                            this.state.rows.push (createData(tmp.enterpriceId, tmp.faceFile, tmp.featureFile, tmp.id, tmp.name, tmp.password, tmp.phone, tmp.type, tmp.deviceId));
                            this.setState({
                                enterpriceId: tmp.enterpriceId,
                                faceFile: tmp.faceFile,
                                featureFile: tmp.faceFile,
                                id: tmp.id,
                                name: tmp.name,
                                password: tmp.password,
                                phone: tmp.phone,
                                type: tmp.type,
                                deviceId: tmp.deviceId,
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

    handleDetail = (key) =>{
      console.log(key);
      console.log(this.state.rows[key].faceFile);
      this.setState({
        detail: true,
        toActivate: key,
        name: this.state.rows[key].name,
        enterpriceId: this.state.rows[key].enterpriceId,
        phone: this.state.rows[key].phone,
        faceFile: this.state.rows[key].faceFile,
      });
    };

    handleDetailClose = () =>{
      this.setState({
        detail: false,
        toActivate: -1,
      })
    };

    handleClose = () => {
        this.setState ({
            open: false,
            toActivate: -1
        })
    };

    Transition(props) {
      return <Slide direction="up" {...props} />;
    }

    handleActivate =() => {
        let {toActivate, rows, new_rows} = this.state;
        console.log(rows[toActivate].id);
        console.log(rows[toActivate].password);
        this.setState({
            open: false,
            detail: false,
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
                "type": "ORDINARY",
                "deviceId": rows[toActivate].deviceId,
            })
        })
            .then(response => {
                console.log('Request successful', response);
                return response.json()
                    .then(result => {
                        console.log("result:", result.id);
                        if(response.status === 200)
                        {
                            this.success("激活成功！");

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
                                            console.log(this.state.faceFile);

                                        });
                                })
                        }

                        else
                          this.warning("激活失败！");
                    });
            })

    };

  Transition(props) {
    return <Slide direction="up" {...props} />;
  }

  typeToIcon = (type) => {
    if (type === "success")
      return Done;
    if (type === "danger")
      return ErrorOutline;
    return null;
  };

  success = (msg) => {
    this.setState({
      notificationType: "success",
      notificationMessage: msg
    });
    this.showNotification("br");
  };

  warning = (msg) => {
    this.setState({
      notificationType: "danger",
      notificationMessage: msg
    });
    this.showNotification("br");
  };

  showNotification = (place) => {
    let x = [];
    x[place] = true;
    this.setState({[place]: true});
    this.alertTimeout = setTimeout(
        function() {
          x[place] = false;
          this.setState(x);
        }.bind(this),
        6000
    );
  };

    render() {
      let {toActivate, rows} = this.state;
        return (
            <div>
                <br/>
              <br/>
                <GridContainer xs={12} sm={12} md={12}>
                    <GridItem xs={12} sm={12} md={10}>
                        <Table className="ActivateUser" style={{marginLeft:"10%"}}>
                            <TableHead>
                                <TableRow >
                                    <CustomTableCell  style={{width:"20%", fontSize:"20px", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>职员编号</CustomTableCell>
                                    <CustomTableCell  style={{width:"15%", fontSize:"20px", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>姓名</CustomTableCell>
                                    <CustomTableCell  style={{width:"20%", fontSize:"20px", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>联系电话</CustomTableCell>
                                    <CustomTableCell  style={{width:"15%", fontSize:"20px", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>状态</CustomTableCell>
                                    <CustomTableCell  style={{width:"30%", fontSize:"20px", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>操作</CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.rows.map((row,key) => {
                                    return (
                                        <TableRow  key={row.id}>
                                            <CustomTableCell style={{width:"20%", fontSize:"18px", textAlign:"center"}}>{row.enterpriceId}</CustomTableCell>
                                            <CustomTableCell style={{width:"15%", fontSize:"18px", textAlign:"center"}}>{row.name}</CustomTableCell>
                                            <CustomTableCell style={{width:"20%", fontSize:"18px", textAlign:"center"}}>{row.phone}</CustomTableCell>
                                            <CustomTableCell style={{width:"15%", fontSize:"18px", textAlign:"center"}}>待激活</CustomTableCell>
                                            <CustomTableCell style={{textAlign:"center"}}>
                                              <Button style={{height:"50px", width: "30%", fontSize: "16px", background: "#303f9f"}}
                                                      onClick={()=>this.handleDetail(key)} size="small">查看详情</Button>
                                              &nbsp;&nbsp;
                                                <Button style={{width: "30%", fontSize: "16px", background: "#fb8c00"}}
                                                        onClick={()=>this.handleClickOpen(key)}>激活</Button>
                                            </CustomTableCell>
                                        </TableRow>
                                    )})}
                                <Dialog
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                    maxWidth={"xs"}
                                    fullWidth={true}
                                >
                                    <DialogTitle >{"确认激活" +"?"}</DialogTitle>
                                    <DialogActions>
                                        <Button onClick={this.handleClose} style={{width:"15%", background:"#9e9e9e", fontSize:"16px"}}>
                                            取消
                                        </Button>
                                        <Button onClick={this.handleActivate} style={{width:"15%", background:"#fb8c00", fontSize:"16px"}}>
                                            激活
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                              <Dialog
                                  open={this.state.detail}
                                  TransitionComponent={this.Transition}
                                  keepMounted
                                  onClose={this.handleDetailClose}
                                  maxWidth="sm"
                                  fullWidth={true}
                              >
                                <DialogTitle style={{fontSize:"40px"}}>
                                  {"详细信息"}
                                </DialogTitle>
                                <DialogContent>
                                    <DetailInfo name={this.state.name} enterpriceId={this.state.enterpriceId}
                                                tel={this.state.phone} faceFile={face_path + this.state.faceFile}/>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={this.handleActivate} style={{width: "15%", fontSize: "16px", background: "#fb8c00"}}>
                                    激活
                                  </Button>
                                  &nbsp;&nbsp;
                                  <Button onClick={this.handleDetailClose} style={{width: "15%", fontSize: "16px", background: "#9e9e9e"}}>
                                    取消
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </TableBody>
                        </Table>
                    </GridItem>
                </GridContainer>
              <Snackbar
                  place="br"
                  color={this.state.notificationType}
                  icon={this.typeToIcon(this.state.notificationType)}
                  message={this.state.notificationMessage}
                  open={this.state.br}
                  closeNotification={() => this.setState({ br: false })}
                  close
              />
            </div>
        );
    }
}

export default ActivateUser;