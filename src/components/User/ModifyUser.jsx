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
import Snackbar from "components/Snackbar/Snackbar.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Search from "@material-ui/icons/Search";
import Slide from "@material-ui/core/Slide";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Done from "@material-ui/icons/Done";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "@material-ui/core/Button";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { userController, user_type} from "variables/general.jsx";



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

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

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


function createData(enterpriceId, id, name, password, phone, type, faceFile, featureFile, deviceId ) {
    return {enterpriceId, id, name, password, phone, type, faceFile, featureFile, deviceId };
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
      const{searchType, } = this.state;
      if (searchType === "")
         this.warning("请选择职员类型");
      else
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
                  if(response.status === 200) {
                    this.success("搜索成功，共有" + result.length + "名" + user_type[this.state.searchType]);
                    this.setState({
                      rows: [],
                    }, () => {
                      for (let i = 0; i < result.length; i++) {
                        let tmp = result[i];
                        console.log(tmp.id);
                        this.state.rows.push(createData(tmp.enterpriceId, tmp.id, tmp.name, tmp.password, tmp.phone,
                            user_type[tmp.type], tmp.faceFile, tmp.featureFile, tmp.deviceId));
                      }
                    });
                  }
                  console.log(this.state.rows.length);

                  this.setState({
                    enterpriceId: "",
                    id: "",
                    name: "",
                    password: "",
                    phone: "",
                    modifyType:"",
                    faceFile:"",
                    featureFile:"",
                    deviceId:"",
                  });
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
        console.log(this.state.name);
        console.log(this.state.phone);
        console.log(this.state.modifyType);
      });

    };


    handleConfirmModify=(key)=>{
      console.log(key);
      this.state.rows[key].phone = this.state.phone;
      this.state.rows[key].type = this.state.modifyType;
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
              "deviceId": this.state.deviceId
          })
      })
        .then(response => {
          console.log('Request successful', response);
          return response.json()
            .then(result => {
                console.log("result:", result.id);
                if(response.status === 200)
                  this.success("修改成功！");
                else
                  this.warning("修改失败！");
              fetch(userController.getUserByType(this.state.searchType), {
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
                              this.state.rows.push (createData(tmp.enterpriceId, tmp.id, tmp.name, tmp.password, tmp.phone,
                                  user_type[tmp.type], tmp.faceFile, tmp.featureFile, tmp.deviceId));
                            }
                          });
                          console.log(this.state.rows.length);
                          this.setState({
                            enterpriceId: "",
                            id: "",
                            name: "",
                            password: "",
                            phone: "",
                            modifyType:"",
                            faceFile:"",
                            featureFile:"",
                            deviceId:"",
                          });
                        });
                  })
            });
        });
      console.log(this.state.phone);
      console.log(this.state.modifyType);
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
        deviceId:""
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
        deviceId:"",
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
        const {classes} = this.props;
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={5}>
                        <Card style={{marginLeft:"4%"}}>
                            <CardBody>
                                <CardIcon color="info">
                                  {<Search style={{color:"#ffffff"}}/>}
                                </CardIcon>
                                <TextField
                                    select
                                    fullWidth
                                    name="type"
                                    label="职员类型"
                                    className={classes.textField}
                                    value={this.state.searchType}
                                    onChange={this.handleTypeChange}
                                    SelectProps={{
                                      MenuProps: {
                                        className: classes.menu,
                                      },
                                    }}
                                    margin="normal"
                                    variant="outlined"
                                    style={{width:"30%", marginLeft:"30%"}}
                                >
                                    <MenuItem key={"ORDINARY"} value={"ORDINARY"}>
                                        普通职员
                                    </MenuItem>
                                    <MenuItem key={"SUPERIORY"} value={"SUPERIORY"}>
                                        高级职员
                                    </MenuItem>
                                </TextField>
                                <Button style={{ marginLeft: "3%", background:"#303f9f", fontSize:"16px", color:"white", width:"18%"}}
                                        onClick={this.handleSearch}>
                                    搜索
                                </Button>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
                <br/>

                <GridContainer xs={12} sm={12} md={12}>
                    <GridItem xs={12} sm={12} md={10}>
                        <Table className="room page" style={{marginLeft:"8%"}}>
                            <TableHead>
                                <TableRow >
                                    <CustomTableCell style={{width:"20%", fontSize:"18px", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>公司</CustomTableCell>
                                    <CustomTableCell style={{width:"17%", fontSize:"20px", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>姓名</CustomTableCell>
                                    <CustomTableCell style={{width:"22%", fontSize:"20px", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>联系电话</CustomTableCell>
                                    <CustomTableCell style={{width:"17%", fontSize:"20px", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>职员类型</CustomTableCell>
                                    <CustomTableCell style={{width:"22%", fontSize:"20px", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>操作</CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.rows.map((row,key) => {
                                    if(this.state.toModify === -1)
                                        return (
                                            <TableRow  key={row.id}>
                                                <CustomTableCell style={{width:"20%", fontSize:"18px", textAlign:"center"}}>{row.enterpriceId}</CustomTableCell>
                                                <CustomTableCell style={{width:"17%", fontSize:"18px", textAlign:"center"}}>{row.name}</CustomTableCell>
                                                <CustomTableCell style={{width:"22%", fontSize:"18px", textAlign:"center"}}>{row.phone}</CustomTableCell>
                                                <CustomTableCell style={{width:"17%", fontSize:"18px", textAlign:"center"}}>{row.type}</CustomTableCell>
                                                <CustomTableCell style={{textAlign:"center"}}>
                                                    <Button style={{width:"50%", fontSize:"18px", background:"#f36c60", color:"white"}}
                                                            onClick={()=>this.handleClickModify(key)}
                                                            className={classes.button}>
                                                      修改
                                                    </Button>

                                                </CustomTableCell>
                                            </TableRow>
                                        );
                                    else {
                                        if(key !== this.state.toModify)
                                            return (
                                                <TableRow key={row.id}>
                                                    <CustomTableCell style={{width:"20%", fontSize:"18px", textAlign:"center"}}>{row.enterpriceId}</CustomTableCell>
                                                    <CustomTableCell style={{width:"17%", fontSize:"18px", textAlign:"center"}}>{row.name}</CustomTableCell>
                                                    <CustomTableCell style={{width:"22%", fontSize:"18px", textAlign:"center"}}>{row.phone}</CustomTableCell>
                                                    <CustomTableCell style={{width:"17%", fontSize:"18px", textAlign:"center"}}>{row.type}</CustomTableCell>
                                                    <CustomTableCell style={{textAlign:"center"}}>
                                                        <Button style={{width: "50%", fontSize: "18px", background:"#f36c60", color:"white"}}>修改</Button>
                                                    </CustomTableCell>
                                                </TableRow>
                                            )
                                        else
                                            return (
                                                <TableRow key={row.id}>
                                                    <CustomTableCell style={{width:"20%", fontSize:"18px", textAlign:"center"}}>{row.enterpriceId}</CustomTableCell>
                                                    <CustomTableCell style={{width:"17%", fontSize:"18px", textAlign:"center"}}>{row.name}</CustomTableCell>
                                                    <CustomTableCell style={{width:"22%", fontSize:"18px", textAlign:"center"}}>
                                                        <TextField
                                                            value={this.state.phone}
                                                            onChange={this.handlePhoneChange}
                                                            style={{width:"80%", fontSize:"18px"}}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </CustomTableCell>
                                                    <CustomTableCell style={{width:"17%", fontSize:"18px", textAlign:"center"}}>
                                                        <Select
                                                            value={this.state.modifyType}
                                                            onChange={this.handleTypeChange}
                                                            style={{fontSize:"18px", width:"100%"}}
                                                        >
                                                            <MenuItem value={"普通职员"} style={{fontSize:"20px"}}>普通职员</MenuItem>
                                                            <MenuItem value={"高级职员"} style={{fontSize:"20px"}}>高级职员</MenuItem>
                                                        </Select>
                                                    </CustomTableCell>
                                                    <CustomTableCell style={{textAlign:"center"}}>
                                                        <Button style={{width: "40%", fontSize: "18px", background:"#f36c60", color:"white"}} onClick={()=>this.handleConfirmModify(key)}>确认</Button>
                                                        &nbsp;&nbsp;&nbsp;
                                                        <Button style={{width: "40%", fontSize: "18px", background: "#b0bec5", color:"white"}} onClick={this.handleCancelModify}>取消</Button>
                                                    </CustomTableCell>
                                                </TableRow>
                                            )
                                    }
                                })}
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

export default withStyles(styles)(ModifyUser);