import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

import Button from "components/CustomButtons/Button.jsx";
import Update from "@material-ui/icons/Update";
import SentimentVeryDissatisfied from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfied from "@material-ui/icons/SentimentDissatisfied";
import SentimentVerySatisfied from "@material-ui/icons/SentimentVerySatisfied";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Assignment from "@material-ui/icons/Assignment";
import Search from "@material-ui/icons/Search";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import PanTool from "@material-ui/icons/PanTool";
import { Link } from "react-router-dom";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Table from "components/Table/Table.jsx";
import CardBody from "components/Card/CardBody.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import AddRoom from "../../components/Room/AddRoom";

let rooms = [
  { location: "410", capacity: 10, status: 2, device: "是", others: "无" },
  { location: "411", capacity: 15, status: 1, device: "是", others: "投影设备已坏"},
  { location: "412", capacity: 5, status: 0, device: "否", others: "无" },
  { location: "501", capacity: 5, status: 2, device: "是", others: "无" }
];

function JSONToArray(jsonArray, type) {
  let re = [];
  for (let i in jsonArray) {
    let ele = jsonArray[i];
    let temp_ele = [];
    let tmp = "";
    temp_ele.push(ele.location);
    temp_ele.push(ele.capacity);
    if (ele.status == 2) tmp = "使用中";
    else tmp = "空闲";
    temp_ele.push(tmp);
    temp_ele.push(ele.device);
    temp_ele.push(ele.others);
    re.push(temp_ele);
  }
  return re;
}

function roomCategory(capacity) {
  if (capacity <= 5) return "小会议室";
  else if (capacity > 10) return "大会议室";
  return "中会议室";
}

function roomStatus(status) {
  if (status === 0) return "空闲";
  else if (status === 1) return "已预定";
  else if (status === 2) return "开会中";
}

function roomCardColor(status) {
  if (status === 0) return "success";
  else if (status === 1) return "warning";
  else if (status === 2) return "danger";
}

function roomCardIcon(status) {
  if (status === 0) return <SentimentVerySatisfied />;
  else if (status === 1) return <SentimentDissatisfied />;
  else if (status === 2) return <SentimentVeryDissatisfied />;
}

class Dashboard extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={15}>
            <CustomTabs
              title=""
              headerColor="success"
              tabs={[
                {
                  tabName: "当前使用情况",
                  tabIcon: Assignment,
                  tabContent: rooms.map(room => {
                    if (room.status == 2)
                      //只显示正在开会的会议室
                      return (
                        <GridContainer>
                          <GridItem xs={12} sm={8} md={11}>
                            <Card>
                              <CardHeader
                                color={roomCardColor(room.status)}
                                stats
                                icon
                              >
                                <CardIcon color={roomCardColor(room.status)}>
                                  {roomCardIcon(room.status)}
                                </CardIcon>
                                <p className={classes.cardCategory}>
                                  {roomStatus(room.status)}
                                </p>
                                <h3 className={classes.cardTitle}>
                                  <Link
                                    to={"/room/" + room.location + "/schedule"}
                                  >
                                    {roomCategory(room.capacity) +
                                      " " +
                                      room.location}
                                  </Link>{" "}
                                  <br />{" "}
                                  <small>{"容量:" + room.capacity}</small>
                                </h3>
                              </CardHeader>
                              <CardFooter stats>
                                <div className={classes.stats}>
                                  <Update />
                                  Just Updated
                                </div>
                              </CardFooter>
                            </Card>
                          </GridItem>
                        </GridContainer>
                      );
                  })
                },
                {
                  tabName: "查询会议室",
                  tabIcon: Search,
                  tabContent: (
                    <GridContainer xs={12} sm={12} md={12}>
                      <GridItem xs={12} sm={12} md={4}>
                        <Button color="black">显示所有会议室</Button>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={8}>
                        <CustomInput
                          formControlProps={{
                            className: classes.margin + " " + classes.search
                          }}
                          inputProps={{
                            placeholder: "输入与会议室相关信息",
                            inputProps: {
                              "aria-label": "Search"
                            }
                          }}
                          style={{ width: "40%" }}
                        />
                        <Button color="white" aria-label="edit" justIcon round>
                          <Search />
                        </Button>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <Card>
                          <CardBody>
                            <Table
                              tableHeaderColor="primary"
                              tableHead={[
                                "房间号",
                                "可容纳人数",
                                "状态",
                                "有无投影设备",
                                "备注"
                              ]}
                              tableData={JSONToArray(rooms, "rooms")}
                            />
                          </CardBody>
                        </Card>
                      </GridItem>
                    </GridContainer>
                  )
                },
                {
                  tabName: "添加会议室",
                  tabIcon: AddCircleOutline,
                  tabContent: <AddRoom />
                },
                {
                  tabName: "删除会议室",
                  tabIcon: DeleteOutline,
                    tabContent:<Button>Stupid</Button>
                },
                {
                  tabName: "修改会议室",
                  tabIcon: PanTool
                }
              ]}
            />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
