import React from "react";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Assignment from "@material-ui/icons/Assignment";
import Alarm from "@material-ui/icons/Alarm";
import History from "@material-ui/icons/History";
import HistoryMeeting from "../../components/Meeting/HistoryMeeting";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import TodayMeeting from "../../components/Meeting/TodayMeeting";
import ConditionSearch from "../../components/Meeting/ConditionSearch";


const historyMeetings = [{
  id: 0,
  leader: "Sth else",
  location: "501",
  date: "2019-01-01",
  start: "10:00",
  end: "12:00"
},{
  id: 1,
  leader: "Whoever",
  location: "501",
  date: "2019-01-02",
  start: "13:00",
  end: "14:00"
},];
const attendMeetings = [{
  id: 4,
  leader: "Wha",
  location: "501",
  date: "2019-02-02",
  start: "10:00",
  end: "12:00"
},{
  id: 5,
  leader: "Som",
  location: "502",
  date: "2019-02-03",
  start: "13:00",
  end: "14:00"
},];
const meetings = [{
  id: 2,
  leader: "Whatever",
  location: "501",
  date: "2019-02-01",
  start: "10:00",
  end: "12:00"
},{
  id: 3,
  leader: "Somebody",
  location: "501",
  date: "2019-02-02",
  start: "13:00",
  end: "14:00"
},];

/*const exitButton = (id) => {
  return <Button color="danger" size="sm">退出会议 {id}</Button>;
} 

const manageButton = (id) => {
  return <Button color="success" size="sm">管理会议 {id}</Button>
}

const deleteButton = (id) => {
    return <Button color = "dangerous" size="sm">删除会议 {id}</Button>
}*/

const checkButtons = (id) => {
  return <Button color="info" size="sm">查看详情 </Button>
};


function JSONToArray(jsonArray, type){
  let re = [];
  for (let i in jsonArray){
    let ele = jsonArray[i];
    let temp_ele = [];
    temp_ele.push(ele.id);
    temp_ele.push(ele.leader);
    temp_ele.push(<Link to={"/room/"+ele.location+"/profile"}>{ele.location}</Link>);
    temp_ele.push(ele.date);
    temp_ele.push(ele.start + "~" + ele.end);
    /*if (type === "meeting")
      temp_ele.push([manageButton(ele.id), "\t", exitButton(ele.id)]);
    else if (type === "history")
      temp_ele.push([checkButtons(ele.id)])*/
    temp_ele.push([checkButtons()]);

    re.push(temp_ele);
  }
  return re;
}

class MeetingPage extends React.Component {
  constructor(props){
    super(props);
    this.state={
      first:"会议管理",
      second: "今日会议",
    }
  }

  handleSecondNavbar=(value)=>{
    console.log(value);
    this.setState({
      second: value
    })
  };

  handleExit=()=>{
    this.setState({
      second:"当前状态"
    });
    window.location.reload();
  };

  render() {
    const{first, second} = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={10} >
            <Button style={{fontSize:"20px", color:"#878787", marginLeft:"3%"}} onClick={this.handleExit}>{first}</Button>
            <span style={{fontSize:"20px", color:"#878787"}}>></span>
            <Button style={{fontSize:"20px", color:"#878787"}}>{second}</Button>
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <CustomTabs
              style={{ background: "#6d4c41"}}
              headerColor="rose"
              handleSecondNavbar={this.handleSecondNavbar.bind(this)}
              tabs={[
                {
                  tabName: "今日会议",
                  tabIcon: Assignment,
                  tabContent: <TodayMeeting/>
                },
                {
                  tabName: "历史会议",
                  tabIcon: History,
                  tabContent: (
                    <HistoryMeeting />
                  )
                },
                  {
                      tabName: "待办会议",
                      tabIcon: Alarm,
                      tabContent: <ConditionSearch/>
                  }
              ]}
            />
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

export default MeetingPage;