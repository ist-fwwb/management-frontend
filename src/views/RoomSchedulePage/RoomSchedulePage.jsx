import React from "react";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";

import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Done from "@material-ui/icons/Done";
import Paper from '@material-ui/core/Paper';

import RoomSchedule from "components/RoomSchedule/RoomSchedule.jsx";
import { ScheduleDataToRows, timeSliceController, meetingController, idToTime } from "variables/general.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import {Link} from "react-router-dom";


class RoomSchedulePage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      scheduleData: null,

      br: false,
      notificationMessage: "null",
      notificationType: null,

      firstChosen: null,
      secondChosen: null
    };
  }

  componentDidMount() {
    let timeApi = timeSliceController.getTimeSilceByRoomId(this.props.match.params.roomId);
    fetch(timeApi, {
      credentials: 'include',
      method: 'get',
    })
    .then(res => res.json())
    .then((data2) => {
      if (data2.error){
        let state = {
          notificationType: "danger",
          notificationMessage: data2.error
        };
        this.setState(state);
      }
      else{
        this.setState({scheduleData: data2})
      }
    })
  }

  showNotification = (place) => {
    let x = [];
    x[place] = true;
    this.setState(x);
    this.alertTimeout = setTimeout(
      function() {
        x[place] = false;
        this.setState(x);
      }.bind(this),
      6000
    );
  }

  componentWillUnmount() {
    let id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }

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

  success = (msg) => {
    this.setState({
      notificationType: "success",
      notificationMessage: msg
    });
    this.showNotification("br");
  };


  render(){
    let { roomId, roomLocation} = this.props.match.params;
    return(
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader style={{background:"#795548"}}>
              </CardHeader>
              <CardBody>
                <h2>
                    {roomLocation}
                  <Link to={"/room/"} >
                    <Button style={{marginLeft:"80%", background:"#795548", fontSize:"16px"}}>返回</Button>
                  </Link>
                </h2>


                <Paper>
                  {
                    ! this.state.scheduleData ? null :
                    <RoomSchedule 
                      data={ScheduleDataToRows(this.state.scheduleData)}
                      roomId={roomId} 
                      handleChange={this.handleChange}
                    />

                  }
                  <Snackbar
                    place="br"
                    color={this.state.notificationType}
                    icon={this.typeToIcon(this.state.notificationType)}
                    message={this.state.notificationMessage}
                    open={this.state.br}
                    closeNotification={() => this.setState({ br: false })}
                    close
                  />
                </Paper>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

export default RoomSchedulePage;