/**
 * Created by 励颖 on 2019/1/24.
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
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import Slide from "@material-ui/core/Slide";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Search from "@material-ui/icons/Search";
import { withStyles } from '@material-ui/core/styles';
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Done from "@material-ui/icons/Done";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { userController, user_type, face_path } from "variables/general.jsx";


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
  upload:{
    width: "20px",
    height: "10%",
    color: "#999",
  }
});

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
                        if(response.status === 200)
                          this.success("搜索成功，共有"+result.length+"名"+user_type[this.state.type]);

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
      const {type} = this.state;
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
                            value={this.state.type}
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
                        <Button style={{ marginLeft: "3%", background:"#303f9f", fontSize:"16px", width:"18%"}}
                                onClick={this.handleSearch}>
                          搜索
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem>
                </GridContainer>
              <br />
              <GridContainer>
                    <GridItem xs={12} sm={12} md={10}>
                        <Table className="ActivateUser" style={{marginLeft:"8%"}}>
                            <TableHead>
                                <TableRow >
                                    <CustomTableCell style={{width:"20%", fontSize:"18px", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>公司</CustomTableCell>
                                    <CustomTableCell style={{width:"15%", fontSize:"20px", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>姓名</CustomTableCell>
                                    <CustomTableCell style={{width:"15%", fontSize:"20px", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>联系电话</CustomTableCell>
                                    <CustomTableCell style={{width:"15%", fontSize:"20px", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>职员类型</CustomTableCell>
                                    <CustomTableCell style={{width:"35%", fontSize:"20px", fontWeight:"700", color:"#ba68c8", textAlign:"center"}}>人脸图像</CustomTableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.rows.map((row,key) => {
                                    return (
                                        <TableRow  key={row.id}>
                                            <CustomTableCell style={{width:"25%", fontSize:"18px", textAlign:"center"}}>{row.enterpriceId}</CustomTableCell>
                                            <CustomTableCell style={{width:"15%", fontSize:"18px", textAlign:"center"}}>{row.name}</CustomTableCell>
                                            <CustomTableCell style={{width:"15%", fontSize:"18px", textAlign:"center"}}>{row.phone}</CustomTableCell>
                                            <CustomTableCell style={{width:"15%", fontSize:"18px", textAlign:"center"}}>{user_type[type]}</CustomTableCell>
                                            <CustomTableCell style={{width:"25%", fontSize:"18px", textAlign:"center"}}>
                                                <img style={{width:"35%", height:"100px"}} src={face_path + row.faceFile}/>
                                            </CustomTableCell>

                                        </TableRow>
                                    )})}
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

export default withStyles(styles)(SearchUser);