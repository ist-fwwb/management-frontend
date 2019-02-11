import React from "react";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import meetingRoomImage from "assets/img/meetingroom.jpeg";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";

import Update from "@material-ui/icons/Update";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Done from "@material-ui/icons/Done";

import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import airConditionerIcon from "assets/icon/airConditioner.svg";
import airConditionerIcon0 from "assets/icon/airConditioner0.svg";
import blackBoardIcon from "assets/icon/blackboard.png";
import blackBoardIcon0 from "assets/icon/blackboard0.png";
import deskIcon from "assets/icon/desk.svg";
import deskIcon0 from "assets/icon/desk0.svg";
import projectorIcon from "assets/icon/projector.svg";
import projectorIcon0 from "assets/icon/projector0.svg";
import powerIcon from "assets/icon/power.svg";
import powerIcon0 from "assets/icon/power0.svg";
import wifiIcon from "assets/icon/wifi.png";
import wifiIcon0 from "assets/icon/wifi0.png";
import wireNetworkIcon from "assets/icon/wireNetwork.svg";
import wireNetworkIcon0 from "assets/icon/wireNetwork0.svg";
import tvIcon from "assets/icon/tv.svg";
import tvIcon0 from "assets/icon/tv0.svg";
import { roomController } from "variables/general.jsx";
import { Link } from "react-router-dom";


function roomCategory(eng){
  if (eng === "SMALL")
    return "小会议室";
  else if (eng === "BIG")
    return "大会议室";
  return "中会议室";
}

class RoomProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room: null,
      br: false,
      notificationMessage: "null",
      notificationType: null,
      updating: false,


      airConditioned: false,
      blackBoard: false,
      desk: false,
      projector: false,
      power: false,
      wifi: false,
      wireNetwork: false,
      tv: false,

      tmp_airConditioned: false,
      tmp_blackBoard: false,
      tmp_desk: false,
      tmp_projector: false,
      tmp_power: false,
      tmp_wifi: false,
      tmp_wireNetwork: false,
      tmp_tv: false,
    };
  }


  componentDidMount(){
    let roomId = this.props.match.params.roomId;
    fetch(roomController.getRoomByRoomId(roomId), {
      credentials: 'include',
      method:'get'
    })
    .then(res => res.json())
    .then((data) => {
      //console.log(data);
      const devices = data.utils;
      this.setState({
        room: data,
        airConditioned: devices.includes("AIRCONDITIONER"),
        blackBoard: devices.includes("BLACKBOARD"),
        desk: devices.includes("DESK"),
        projector: devices.includes("PROJECTOR"),
        power: devices.includes("POWER"),
        wifi: devices.includes("WIFI"),
        wireNetwork: devices.includes("WIRENETWORK"),
        tv: devices.includes("TV"),
      });
    })
    .catch(error => {
      console.log(error);
      this.setState({error: true});
    })
  }

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

  typeToIcon = (type) => {
    if (type === "success")
      return Done;
    if (type === "danger")
      return ErrorOutline;
    return null;
  };

  warning = (msg) => {
    this.setState({
      notificationType: "danger",
      notificationMessage: msg
    });
    this.showNotification("br");
  };

  handleChangeDevice=(value)=>{
    console.log(value);
    if(value === "airconditioner")
      this.setState({
        airConditioned: !this.state.airConditioned
      });
    else if(value === "blackboard")
      this.setState({
        blackBoard: !this.state.blackBoard
      });
    else if(value === "desk")
      this.setState({
        desk: !this.state.desk
      });
    else if(value === "projector")
      this.setState({
        projector: !this.state.projector
      });
    else if(value === "power")
      this.setState({
        power: !this.state.power
      });
    else if(value === "wifi")
      this.setState({
        wifi: !this.state.wifi
      });
    else if(value === "wirenetwork")
      this.setState({
        wireNetwork: !this.state.wireNetwork
      });
    else if(value === "tv")
      this.setState({
        tv: !this.state.tv
      });
  };

  handleClickUpdate=()=>{
    this.setState({
      updating: true,
      tmp_airConditioned: this.state.airConditioned,
      tmp_blackBoard: this.state.blackBoard,
      tmp_desk: this.state.desk,
      tmp_projector: this.state.projector,
      tmp_power: this.state.power,
      tmp_wifi: this.state.wifi,
      tmp_wireNetwork: this.state.wireNetwork,
      tmp_tv: this.state.tv,
    })
  };

  handleCancelUpdate=()=>{
    this.setState({
      updating: false,
      ariConditioned: this.state.tmp_airConditioned,
      blackBoard: this.state.tmp_blackBoard,
      desk: this.state.tmp_desk,
      projector: this.state.tmp_projector,
      power: this.state.tmp_power,
      wifi: this.state.tmp_wifi,
      wireNetwork: this.state.tmp_wireNetwork,
      tv: this.state.tmp_tv,
    })
  };

  handleConfirmUpdate=()=>{
    this.setState({
      updating: false
    });
    //-----------------------------------------------------------------fetch
  };

  render(){
    if (this.state.error){
      return <h2>404 Not Found</h2>
    }
    const { classes } = this.props;
    //const roomId = this.props.match.params.roomId
    const {room, updating} = this.state;
    const {airConditioned, blackBoard, desk, projector, power, wifi, wireNetwork, tv} = this.state;

    return (
      <div>
        <GridContainer >
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader style={{background:"#795548"}}>
              </CardHeader>
              <CardBody>
                {
                  room ? <div>
                    <div>
                      <h2>
                        {room.location}
                        <Button  style={{marginLeft:"72%", background:"#b0120a", fontSize:"16px", color:"white", height:"50px"}}>删除会议室</Button>
                        &nbsp;&nbsp;
                        <Link to={"/room/"} >
                          <Button style={{ background:"#795548", fontSize:"16px", color:"white", height:"50px"}}>返回</Button>
                        </Link>
                      </h2>
                    </div>
                    <div>
                      <Link to={"/room/"+this.props.match.params.roomId+"/"+room.location+"/schedule"}>
                        <div style={{fontSize:"20px"}}>
                          会议日程
                        </div>
                      </Link>
                    </div>
                    </div>
                    : <h3>{this.props.match.params.roomId}</h3>
                }
                <br/>
              
              <GridContainer>
                <GridItem xs={12} sm={6} md={4}>
                  <Card>
                    <CardHeader color="warning" stats icon>
                      <CardIcon color="warning">
                        <Icon>devices</Icon>
                      </CardIcon>
                      <br/>
                      <h2 className={classes.cardCategory} style={{color: "black"}}>设备情况</h2>
                    </CardHeader>
                    <CardBody>
                      <table>
                        <tbody>
                        <tr>
                          <td width="25%">
                            {
                              <IconButton
                                  onClick={()=>this.handleChangeDevice("airconditioner")}
                                  style={{background:"#ffffff"}}
                                  disableRipple={true}
                                  disabled={!updating}
                              >
                                <img width="70%" src={airConditioned?airConditionerIcon:airConditionerIcon0} alt="icon"/>
                              </IconButton>
                            }
                          </td>
                          <td width="25%">
                          {
                            <IconButton
                                onClick={()=>this.handleChangeDevice("blackboard")}
                                style={{background:"#ffffff"}}
                                disableRipple={true}
                                disabled={!updating}
                            >
                              <img width="70%" src={blackBoard?blackBoardIcon:blackBoardIcon0} alt="icon"/>
                            </IconButton>
                          }
                          </td>
                          <td width="25%">
                          {
                            <IconButton
                                onClick={()=>this.handleChangeDevice("desk")}
                                style={{background:"#ffffff"}}
                                disableRipple={true}
                                disabled={!updating}
                            >
                              <img width="70%" src={desk?deskIcon:deskIcon0} alt="icon"/>
                            </IconButton>
                          }
                          </td>
                          <td width="25%">
                          {
                            <IconButton
                                onClick={()=>this.handleChangeDevice("projector")}
                                style={{background:"#ffffff", marginLeft:"20%"}}
                                disableRipple={true}
                                disabled={!updating}
                            >
                              <img width="100%" src={projector?projectorIcon:projectorIcon0} alt="icon"/>
                            </IconButton>
                          }
                          </td>
                        </tr>
                        <tr style={{fontSize:"16px"}}>
                          <td >
                            <div style={{marginLeft:"32%"}}>
                              空调
                            </div>
                          </td>
                          <td>
                            <div style={{marginLeft:"32%"}}>
                              黑板
                            </div>
                          </td>
                          <td>
                            <div style={{marginLeft:"32%"}}>
                              桌子
                            </div>
                          </td>
                          <td>
                            <div style={{marginLeft:"32%"}}>
                              投影仪
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td width="25%">
                          {
                            <IconButton
                                onClick={()=>this.handleChangeDevice("power")}
                                style={{background:"#ffffff", marginLeft:"10%"}}
                                disableRipple={true}
                                disabled={!updating}
                            >
                              <img width="80%" src={power?powerIcon:powerIcon0} alt="icon"/>
                            </IconButton>
                          }
                          </td>
                          <td width="25%">
                            {
                              <IconButton
                                  onClick={() => this.handleChangeDevice("wifi")}
                                  style={{background: "#ffffff", }}
                                  disableRipple={true}
                                  disabled={!updating}
                              >
                                <img width="60%" src={wifi ? wifiIcon : wifiIcon0} alt="icon"/>
                              </IconButton>
                            }
                          </td>
                          <td width="25%">
                          {
                            <IconButton
                                onClick={() => this.handleChangeDevice("wirenetwork")}
                                style={{background: "#ffffff", marginLeft: "5%"}}
                                disableRipple={true}
                                disabled={!updating}
                            >
                              <img width="70%" src={wireNetwork ? wireNetworkIcon : wireNetworkIcon0} alt="icon"/>
                            </IconButton>
                          }
                          </td>
                          <td width="25%">
                          {
                            <IconButton
                                onClick={() => this.handleChangeDevice("tv")}
                                style={{background: "#ffffff", marginLeft: "15%"}}
                                disableRipple={true}
                                disabled={!updating}
                            >
                              <img width="75%" src={tv ? tvIcon : tvIcon0} alt="icon"/>
                            </IconButton>
                          }
                          </td>
                        </tr>
                        <tr style={{fontSize:"16px"}}>
                          <td>
                            <div style={{marginLeft:"32%"}}>
                              电源
                            </div>
                          </td>
                          <td>
                            <div style={{marginLeft:"32%"}}>
                              WiFi
                            </div>
                          </td>
                          <td>
                            <div style={{marginLeft:"32%"}}>
                              网线
                            </div>
                          </td>
                          <td>
                            <div style={{marginLeft:"40%"}}>
                              电视
                            </div>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </CardBody>
                    <CardFooter stats>
                      {
                        !updating ?
                          <div className={classes.stats} style={{marginLeft:"80%"}}>
                            <Button size="small"
                                    style={{background:"#8bc34a", color:"white", fontSize:"16px", }}
                                    onClick={this.handleClickUpdate}
                            >
                              更新
                            </Button>
                          </div>
                          :
                          <div style={{marginLeft:"65%"}}>
                            <Button size="small" onClick={this.handleConfirmUpdate}
                                    style={{background:"#8bc34a", color:"white", fontSize:"16px" }}>
                              确认
                            </Button>
                            &nbsp;&nbsp;
                            <Button size="small" onClick={this.handleCancelUpdate}
                                    style={{background:"#9e9e9e", color:"white", fontSize:"16px" }}>
                              取消
                            </Button>
                          </div>
                      }
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                  <Card>
                    <CardHeader color="info" stats icon>
                      <CardIcon color="info">
                        <Icon>content_copy</Icon>
                      </CardIcon>
                      <br/>
                      <h2 className={classes.cardCategory} style={{color: "black"}}>容量</h2>
                    </CardHeader>
                    <CardBody>
                      <h3>10 人</h3>
                    </CardBody>
                    <CardFooter stats>
                        <div className={classes.stats} style={{marginLeft:"75%"}}>
                          <Button size="small" style={{background:"#8bc34a", color:"white", fontSize:"16px"}}>
                            修改
                          </Button>
                        </div>
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <br/>
                  <img src={meetingRoomImage} width={"110%"} alt="meetingroom"/>
                </GridItem>
              </GridContainer>
              </CardBody>
            </Card>
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
    )
  }
}
export default withStyles(dashboardStyle)(RoomProfile);