import React from "react";

import TextField from "@material-ui/core/TextField";
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
import Slider from "react-slick";
import Block from "@material-ui/icons/Block";
import Undo from "@material-ui/icons/Undo";

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

const slidesSettings = {
  dots: true,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1
};

class RoomProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      room: null,
      br: false,
      notificationMessage: "null",
      notificationType: null,
      updating: false,
      modifying: false,
      capacity: 10,
      tmp_capacity: 10,
      images:[],
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
      console.log(data);
      const devices = data.utils;
      this.setState({
        images: data.images,
        room: data,
        airConditioned: devices.includes("AIRCONDITIONER"),
        blackBoard: devices.includes("BLACKBOARD"),
        desk: devices.includes("TABLE"),
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

  handleClickModify=()=>{
    this.setState({
      modifying: true,
    })
  };

  handleCapacityChange = (e) => {
    this.setState({
      tmp_capacity:e.target.value
    });
    console.log(e.target.value)
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

  handleCancelModify=()=>{
    this.setState({
      modifying: false,
      tmp_capacity: this.state.capacity
    })
  };

  handleConfirmUpdate=()=>{
    this.setState({
      updating: false
    });
    //-----------------------------------------------------------------fetch
  };

  handleConfirmModify=()=>{
    this.setState({
      modifying: false,
      capacity: this.state.tmp_capacity
    });
    //-----------------------------------------------------------------fetch
  };

  render(){
    if (this.state.error){
      return <h2>404 Not Found</h2>
    }
    const { classes } = this.props;
    //const roomId = this.props.match.params.roomId
    const {room, updating, modifying} = this.state;
    const {airConditioned, blackBoard, desk, projector, power, wifi, wireNetwork, tv} = this.state;
    let meetingRoomImages = [];
    if(this.state.images === null)
      this.setState({
        images:[]
      });

    else
      for(let i=0; i<this.state.images.length; i++)
        meetingRoomImages.push(
          <div
            style={{
              maxWidth: "100%",
              height: "30%",
              paddingBottom: "40%",
              overflow: "hidden"
            }}
          >
            <img
                width="100%"
                style={{height:"350px"}}
                alt="img"
                src={"http://face-file.oss-cn-shanghai.aliyuncs.com/meetingroom-file/" + this.state.images[i]}
            />
          </div>
      )
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

                      <GridContainer>
                        <GridItem xs={12} sm={12} md={9}>
                          <div style={{fontSize:"42px", margin:"normal"}}>
                            {room.location}
                          </div>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                          <Button  style={{marginRight:"2%", margin:"normal", background:"#b0120a", fontSize:"16px", color:"white", height:"50px", width:"8%"}}>
                            禁用
                          </Button>
                          &nbsp;&nbsp;
                          <Link to={"/room/"} >
                            <Button style={{ marginRight:"5%", background:"#795548", fontSize:"16px", color:"white", height:"50px", width:"7%"}}>
                              返回
                            </Button>
                          </Link>
                        </GridItem>
                      </GridContainer>
                    <br/>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={9}>
                      <Link to={"/room/"+this.props.match.params.roomId+"/"+room.location+"/schedule"}>
                        <div style={{fontSize:"20px", marginLeft:"1%"}}>
                          会议日程
                        </div>
                      </Link>
                      </GridItem>

                    </GridContainer>
                    </div>

                    : <h3>{this.props.match.params.roomId}</h3>
                }
                <br/>
              
              <GridContainer>
                <GridItem xs={12} sm={6} md={5}>
                  <Card>
                    <CardHeader color="warning" stats icon>
                      <CardIcon color="warning">
                        <Icon>devices</Icon>
                      </CardIcon>
                      <br/>
                      <h2 className={classes.cardCategory} style={{color: "black", fontWeight:"300"}}>设备情况</h2>
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
                            <div style={{marginLeft:"36%"}}>
                              空调
                            </div>
                          </td>
                          <td>
                            <div style={{marginLeft:"36%"}}>
                              黑板
                            </div>
                          </td>
                          <td>
                            <div style={{marginLeft:"36%"}}>
                              桌子
                            </div>
                          </td>
                          <td>
                            <div style={{marginLeft:"40%"}}>
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
                            <div style={{marginLeft:"36%"}}>
                              电源
                            </div>
                          </td>
                          <td>
                            <div style={{marginLeft:"36%"}}>
                              WiFi
                            </div>
                          </td>
                          <td>
                            <div style={{marginLeft:"38%"}}>
                              网线
                            </div>
                          </td>
                          <td>
                            <div style={{marginLeft:"43%"}}>
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
                      <h2 className={classes.cardCategory} style={{color: "black", fontWeight:"300"}}>容量</h2>
                    </CardHeader>
                    <CardBody>
                      {
                        !modifying ?
                            <h3 style={{fontWeight:"300"}}>{this.state.capacity} 人</h3>
                            :
                            <div>
                              <TextField
                                  type="number"
                                  value={this.state.tmp_capacity}
                                  onChange={this.handleCapacityChange}
                                  style={{width: "25%"}}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                              />
                              &nbsp;
                              <span style={{fontSize:"24px", fontWeight:"300"}}>人</span>
                            </div>
                      }
                    </CardBody>
                    <CardFooter stats>
                      {
                        !modifying ?
                            <div className={classes.stats} style={{marginLeft:"75%"}}>
                              <Button size="small" onClick={this.handleClickModify}
                                      style={{background:"#8bc34a", color:"white", fontSize:"16px"}}>
                                修改
                              </Button>
                            </div>
                            :
                            <div style={{marginLeft:"50%"}}>
                              <Button size="small" onClick={this.handleConfirmModify}
                                      style={{background:"#8bc34a", color:"white", fontSize:"16px"}}>
                                确认
                              </Button>
                              &nbsp;&nbsp;
                              <Button size="small" onClick={this.handleCancelModify}
                                      style={{background:"#9e9e9e", color:"white", fontSize:"16px"}}>
                                取消
                              </Button>
                            </div>
                      }

                    </CardFooter>
                  </Card>
                </GridItem>

                <GridItem xs={12} sm={6} md={4}>
                  <br/>
                  <div>
                    {
                      (meetingRoomImages.length > 0) ?
                        <Slider {...slidesSettings} style={{width: "50%"}}>
                          {meetingRoomImages}
                        </Slider>
                        :
                        <img src={meetingRoomImage} width={"100%"} alt="meetingroom"/>
                    }
                  </div>

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